import {FilterBase} from './filter-base';
import moment from 'moment';

export class FilterDates extends FilterBase {
    
    formatMoment = 'YYYY/M/D';
    formatBootstrap = 'yyyy/mm/dd';    
    
    keyStart = 'startDate';
    keyEnd = 'endDate';
    
    configure(params) {
        this.start = params.startDate;
        this.end = params.endDate;
    }
    
    setFromEvent(property, event) {
        this[property] = event.detail.event.target.value;
    }    
    
    get start() {
        let defaultValue = moment().subtract(7, 'days').format(this.formatMoment);
        return this.config.get(this.keyStart) || defaultValue;
    }
    
    set start(value) {
        if (value) {
            this.config.set(this.keyStart, value);
        }
    }
    
    get end() {
        let defaultValue = moment().format(this.formatMoment);
        return this.config.get(this.keyEnd) || defaultValue;    
    }
    
    set end(value) {
        if (value) {
            this.config.set(this.keyEnd, value);    
        }
    }
    
    get options() {
        return {
            format: this.formatBootstrap,
            endDate: '+0d'
        };
    }
    
    get optionsFuture() {
        return $.extend({}, this.options, {
           endDate: '+120d' 
        });
    }
    
    get filter() {
        return this.isEnabled() ? {
            startDate: this.start,
            endDate: this.end
        } : {};
    }
}
