import {inject} from 'aurelia-dependency-injection';
import {FilterBase} from './filter-base';

export class FilterProperties extends FilterBase {
    
    properties = {};
    
    configure(params) {
        $.each(params, $.proxy(function(key, value) {
            if (this.properties.hasOwnProperty(key)) {
                this.properties[key] = value;
            }
        }, this));
    }
    
    set(name, value) {
        if (value) {
            this.properties[name] = value;
        }
    }
    
    get(name) {
        return this.properties[name];
    }
    
    get filter() {
        return this.isEnabled() ? this.properties : {};
    }
    
}