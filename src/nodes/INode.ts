/**
 * The base class for a node.
 *
 * A node is a set of different components that are required by a system.
 * A system can request a collection of nodes from the engine. Subsequently the Engine object creates
 * a node for every entity that has all of the components in the node class and adds these nodes
 * to the list obtained by the system. The engine keeps the list up to date as entities are added
 * to and removed from the engine and as the components on entities change.
 */
import { Entity } from '../core';

export interface INode {
    /**
     * The entity whose components are included in the node.
     */
    entity: Entity;

    /**
     * Used by the componentFamily class to filter out the right components
     */
    schema: object;
}
