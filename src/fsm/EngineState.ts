import { System } from '../core/System';
import { ISystemProvider } from './ISystemProvider';
import { StateSystemMapping } from './StateSystemMapping';
import { SystemInstanceProvider } from './SystemInstanceProvider';
import { SystemSingletonProvider } from './SystemSingletonProvider';
import { DynamicSystemProvider } from './DynamicSystemProvider';

/**
 * Represents a state for a SystemStateMachine. The state contains any number of SystemProviders which
 * are used to add Systems to the Engine when this state is entered.
 */
export class EngineState {

    public providers: Array<ISystemProvider> = [];

    /**
     * Creates a mapping for the System type to a specific System instance. A
     * SystemInstanceProvider is used for the mapping.
     *
     * @param system The System instance to use for the mapping
     * @return This StateSystemMapping, so more modifications can be applied
     */
    public addInstance(system: System): StateSystemMapping {
        return this.addProvider(new SystemInstanceProvider(system));
    }

    /**
     * Creates a mapping for the System type to a single instance of the provided type.
     * The instance is not created until it is first requested. The type should be the same
     * as or extend the type for this mapping. A SystemSingletonProvider is used for
     * the mapping.
     *
     * @param type The type of the single instance to be created. If omitted, the type of the
     * mapping is used.
     * @return This StateSystemMapping, so more modifications can be applied
     */
    public addSingleton(type: any): StateSystemMapping {
        return this.addProvider(new SystemSingletonProvider(type));
    }

    /**
     * Creates a mapping for the System type to a method call.
     * The method should return a System instance. A DynamicSystemProvider is used for
     * the mapping.
     *
     * @param method The method to provide the System instance.
     * @return This StateSystemMapping, so more modifications can be applied.
     */
    public addMethod(method: Function): StateSystemMapping {
        return this.addProvider(new DynamicSystemProvider(method));
    }

    /**
     * Adds any SystemProvider.
     *
     * @param provider The component provider to use.
     * @return This StateSystemMapping, so more modifications can be applied.
     */
    public addProvider(provider: ISystemProvider): StateSystemMapping {
        let mapping: StateSystemMapping = new StateSystemMapping(this, provider);
        this.providers.push(provider);
        return mapping;
    }
}
