import {Aurelia, inject} from 'aurelia-framework';

@inject(Aurelia)
export class FilterBase {
    
    enabled = true;
    
    constructor(Aurelia) {
        this.aurelia = Aurelia;
        this.config = this.aurelia.container.get('Config');
    }
    
    configure(params) {
        throw new Error('The configuration of the filter must be overriden by the child.');
    }
    
    isEnabled() {
        return this.enabled;
    }
    
    enable() {
        this.enabled = true;
    }
    
    disable() {
        this.enabled = false;
    }
}