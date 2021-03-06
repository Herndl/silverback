/**
 * An entity is composed from components. As such, it is essentially a collection object for components.
 * Sometimes, the entities in a game will mirror the actual characters and objects in the game, but this
 * is not necessary.
 *
 * <p>Components are simple value objects that contain data relevant to the entity. Entities
 * with similar functionality will have instances of the same components. So we might have
 * a position component</p>
 *
 * <p><code>export class PositionComponent
 * {
 *   public x :number;
 *   public y :number;
 * }</code></p>
 *
 * <p>All entities that have a position in the game world, will have an instance of the
 * position component. Systems operate on entities based on the components they have.</p>
 */

import { IComponent } from '../components/IComponent';
import { Scene } from './Scene';
// tslint:disable-next-line
const MiniSignal = require('mini-signals');

export class Entity {
    /**
     * Optional, give the entity a name. This can help with debugging and with serialising the entity.
     */
    private static nameCount = 0;
    private components: Map<string, IComponent>;
    private addedToScene: Scene;
    private _name: string;

    /**
     * This signal is dispatched when a component is added to the entity.
     */
    public componentAdded;

    /**
     * This signal is dispatched when a component is removed from the entity.
     */
    public componentRemoved;

    /**
     * Dispatched when the name of the entity changes.
     * Used internally by the engine to track entities based on their names.
     */
    public nameChanged;

    public previous: Entity;
    public next: Entity;

    constructor(name = '') {
        this.components = new Map();
        this.componentAdded = new MiniSignal();
        this.componentRemoved = new MiniSignal();
        this.nameChanged = new MiniSignal();

        this._name = name.length > 0 ? name : 'entity' + ++Entity.nameCount;
    }

    /**
     * All entities have a name. If no name is set, a default name is used. Names are used to
     * fetch specific entities from the engine, and can also help to identify an entity when debugging.
     */
    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        if (this._name !== value) {
            const previous: string = this._name;
            this._name = value;
            this.nameChanged.dispatch(this, previous);
        }
    }

    /**
     * Add a component to the entity.
     *
     * @param component The component object to add.
     * @param componentClass The class of the component. This is only necessary if the component
     * extends another component class and you want the framework to treat the component as of
     * the base class type. If not set, the class type is determined directly from the component.
     *
     * @return A reference to the entity. This enables the chaining of calls to add, to make
     * creating and configuring entities cleaner. e.g.
     *
     * <code>let entity : Entity = new Entity()
     *     .add(new Position(100, 200))
     *     .add(new Display(new PlayerClip());</code>
     */
    public addComponent(component: any, componentClass?): Entity {
        if (typeof componentClass === 'undefined') {
            componentClass = component.constructor.name;
        }
        if (this.components.has(componentClass)) {
            this.removeComponent(componentClass);
        }
        this.components.set(componentClass, component);
        this.componentAdded.dispatch(this, componentClass);
        return this;
    }

    /**
     * Remove a component from the entity.
     *
     * @param componentClass The class of the component to be removed.
     * @return the component, or null if the component doesn't exist in the entity
     */
    public removeComponent(componentClass): any {
        const component: any = this.components.get(componentClass);
        if (component) {
            this.components.delete(componentClass);
            this.componentRemoved.dispatch(this, componentClass);
            return component;
        }
        return null;
    }

    /**
     * Get a component from the entity.
     *
     * @param componentClass The class of the component requested.
     * @return The component, or null if none was found.
     */
    public getComponent(componentClass: string): any {
        return this.components.get(componentClass);
    }

    /**
     * Does the entity have a component of a particular type.
     *
     * @param componentClass The class of the component sought.
     * @return true if the entity has a component of the type, false if not.
     */
    public hasComponent(componentClass: string): boolean {
        return this.components.has(componentClass);
    }

    /**
     * Get all components from the entity.
     *
     * @return An array containing all the components that are on the entity.
     */
    public getAll(): any[] {
        return [...this.components.keys()];
    }

    /**
     *  Set the scene for the current entity
     *
     * @param {Scene} scene
     */
    public set scene(scene: Scene) {
        this.addedToScene = scene;
    }

    public toString() {
        const seen = [];
        return JSON.stringify(
            this,
            function(key, val) {
                if (typeof val === 'object') {
                    if (seen.indexOf(val) >= 0) {
                        return;
                    }
                    seen.push(val);
                }
                return val;
            },
            4
        );
    }
}
