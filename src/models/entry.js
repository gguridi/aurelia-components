import {Aurelia, transient, inject} from 'aurelia-framework';

@transient()
@inject(Aurelia)
export class Entry {
    
    constructor(Aurelia) {
        this.aurelia = Aurelia;
    }
    
    initialize(data) {
        $.extend(this, data);        
    }
    
    configure() {
        
    }
    
}