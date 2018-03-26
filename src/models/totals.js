import {Aurelia, transient, inject} from 'aurelia-framework';
import {MathUtils} from './../utils/math';

@transient()
@inject(Aurelia, MathUtils)
export class Totals {
    
    /**
     * Information about how to compute the totals
     * for this model.
     */
    compute = {};
    
    records = {};
    
    constructor(Aurelia, MathUtils) {
        this.aurelia = Aurelia;
        this.math = MathUtils;
    }
    
    initialize(records) {
        this.records = records;
        return this;
    }
       
    calculate() {
        $.each(this.compute, (property, action) => {
            if (typeof action == 'function') {
                let execute = action.bind(this);
                execute(property);
            }
            if (typeof action == 'object') {
                let execute = action.shift();
                action.unshift(property);
                execute.apply(this, action);
            }
        });
    }
    
    aggregate(property) {
        let total = 0;
        $.each(this.records, (key, record) => {
            total = this.math.sum(record[property], total); 
        });
        this[property] = total;
        return total;
    }
    
    mean(property) {
        let total = this.aggregate(property);
        this[property] = this.average(total);
    }
    
    aggregateList(property) {
        let total = {};
        $.each(this.records, (key, record) => {
            $.each(record[property], (listKey, listValue) => {
                total[listKey] = (typeof total[listKey] === 'undefined') ? 0 : total[listKey];
                total[listKey] = this.math.sum(listValue, total[listKey]);                 
            });
        });
        this[property] = total;
        return total;
    }
    
    aggregateMixed(property, propertyKey) {
        let total = {};
        $.each(this.records, (key, record) => {
            let listValue = record[property];
            let listKey = record[propertyKey];
            total[listKey] = (typeof total[listKey] === 'undefined') ? 0 : total[listKey];
            total[listKey] = this.math.sum(listValue, total[listKey]);
        });
        this[property] = total;
        return total;
    }
    
    average(a) {
        let numRecords = this.records.length || 0;
        if (numRecords) {
            return this.math.divide(a, numRecords);
        }
        return a;
    }
}