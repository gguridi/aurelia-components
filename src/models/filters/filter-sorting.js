import {inject} from 'aurelia-dependency-injection';
import {FilterBase} from './filter-base';
import {Sortable} from './sortable';

export class FilterSorting extends FilterBase {
    
    configure(params) {
        this.sortBy = params.sortBy;
        this.sortOrder = params.sortOrder;
    }
    
    setCollection(collection) {
        this.collection = collection;        
        if (typeof collection == 'object') {
            this.collection = collection.constructor.name;
        }
    }
    
    get sortBy() {
        return this.config.get(this.keyBy) || 'name';
    }
    
    set sortBy(value) {
        if (value) {
            this.config.set(this.keyBy, value);
        }
    }
    
    get sortOrder() {
        return this.config.get(this.keyOrder) || 1;
    }
    
    set sortOrder(value) {
        if (value) {
            this.config.set(this.keyOrder, value);
        }
    }
    
    get keyBy() {
        return this.collection + '.sortBy';
    }
    
    get keyOrder() {
        return this.collection + '.sortOrder';
    }
    
    get filter() {
        return this.isEnabled() ? {
            sortBy: this.sortBy,
            sortOrder: this.sortOrder
        } : {};
    }
}
