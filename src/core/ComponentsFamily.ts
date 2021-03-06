/**
 * The default class for managing a NodeList. This class creates the NodeList and adds and removes
 * nodes to/from the list as the entities and the components in the engine change.
 *
 * It uses the basic entity matching pattern of an entity system - entities are added to the list if
 * they contain components matching all the public properties of the node class.
 */
import { Engine } from './Engine';
import { Entity } from './Entity';
import { IFamily } from './IFamily';
import { NodePool } from './NodePool';

export class ComponentsFamily implements IFamily {
    private nodes: Set<any>;
    private entities: Map<any, any>;
    private nodeClass;
    private components: Map<any, any>;
    private nodePool: NodePool;
    private engine: Engine;

    /**
     * The constructor. Creates a ComponentsFamily to provide a NodeList for the
     * given node class.
     *
     * @param nodeClass The type of node to create and manage a NodeList for.
     * @param engine The engine that this family is managing teh NodeList for.
     */
    constructor(nodeClass: any, engine: Engine) {
        this.nodeClass = nodeClass;
        this.engine = engine;

        this._init();
    }

    /**
     * The node ist managed by this family. This is a reference that remains valid always
     * since it is retained and reused by Systems that use the list. i.e. we never recreate the list,
     * we always modify it in place.
     */
    public get nodeList(): Set<any> {
        return this.nodes;
    }

    /**
     * Called by the engine when an entity has been added to it. We check if the entity should be in
     * this family's NodeList and add it if appropriate.
     */
    public newEntity(entity: Entity) {
        this.addIfMatch(entity);
    }

    /**
     * Called by the engine when a component has been added to an entity. We check if the entity is not in
     * this family's NodeList and should be, and add it if appropriate.
     */
    public componentAddedToEntity(entity: Entity, componentClass: () => any) {
        this.addIfMatch(entity);
    }

    /**
     * Called by the engine when a component has been removed from an entity. We check if the removed component
     * is required by this family's NodeList and if so, we check if the entity is in this this NodeList and
     * remove it if so.
     */
    public componentRemovedFromEntity(entity: Entity, componentClass: () => any) {
        this.removeIfMatch(entity);
    }

    /**
     * Called by the engine when an entity has been removed from it. We check if the entity is in
     * this family's NodeList and remove it if so.
     */
    public removeEntity(entity: Entity) {
        this.removeIfMatch(entity);
    }

    /**
     * If the entity is not in this family's NodeList, tests the components of the entity to see
     * if it should be in this NodeList and adds it if so.
     */
    public addIfMatch(entity: Entity) {
        if (!this.entities.has(entity)) {
            this.components.forEach(componentClass => {
                if (!entity.hasComponent(componentClass)) {
                    return;
                }
            });
            // If the entity has not components, don't add it.
            if (entity.getAll().length > 0) {
                const node = this.nodePool.get();
                const schema = node.schema;

                for (const prop in schema) {
                    if (schema.hasOwnProperty(prop)) {
                        if (!entity.hasComponent(schema[prop].name)) {
                            // Node prop was not found in the entity
                            return;
                        } else {
                            // Add entity value to node
                            node[prop] = entity.getComponent(schema[prop].name);
                        }
                    }
                }
                node.entity = entity;

                this.entities.set(entity, node);
                this.nodes.add(node);
            }
        }
    }

    /**
     * Removes the entity if it is in this family's NodeList.
     */
    public removeIfMatch(entity: Entity) {
        if (this.entities.get(entity)) {
            const entityNode = this.entities.get(entity);
            this.entities.delete(entity);

            this.nodes.forEach(node => {
                if (node === entityNode) {
                    this.nodes.delete(node);
                }
            });

            if (this.engine.updating) {
                this.nodePool.cache(entityNode);
                this.engine.updateComplete.add(this._releaseNodePoolCache, this);
            } else {
                this.nodePool.dispose(entityNode);
            }
        }
    }

    /**
     * Removes all nodes from the NodeList.
     */
    public cleanUp() {
        this.nodes.clear();
    }

    /**
     * Releases the nodes that were added to the node pool during this engine update, so they can
     * be reused.
     */
    private _releaseNodePoolCache() {
        this.engine.updateComplete.detachAll();
        this.nodePool.releaseCache();
    }

    /**
     * Initialises the class. Creates the nodelist and other tools. Analyses the node to determine
     * what component schema the node requires.
     */
    private _init() {
        this.nodes = new Set();
        this.entities = new Map(); // <Entity, Node>
        this.components = new Map(); // <Type, string>

        const schema = this.nodeClass['schema'];

        for (const prop in schema) {
            if (schema.hasOwnProperty(prop)) {
                this.components.set(prop, schema[prop]);
            }
        }
        this.nodePool = new NodePool(this.nodeClass, this.components);
        this.nodePool.dispose(this.nodePool.get());
    }
}
