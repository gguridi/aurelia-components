import {Aurelia, inject, bindable, customAttribute} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Aurelia, EventAggregator, Element) 
@customAttribute('sortable')
export class Sortable {
    
    SORT_ASC = 1;
    SORT_DESC = -1;
    
    constructor(Aurelia, EventAggregator, Element) {
        this.aurelia = Aurelia;
        this.ea = EventAggregator;
        this.element = Element;
        this.initialize();
    }
    
    valueChanged(newValue) {
        this.value = newValue;
    }
    
    initialize() {
        this.element.addEventListener('click', e => {
            this.sort($(this.element));
        });
    }
    
    sort(element) {
        let field = element.attr('sortable.bind');
        let sort = element.attr('sortable.order') || this.SORT_ASC;
        this.ea.publish('sorting', { "field": field, "order": sort});
        this.update(element, sort);
    }
    
    update(element, sort) {
        (sort == this.SORT_ASC) ? this.up(element) : this.down(element);
    }
    
    clear() {
        $('.sorting').removeClass('sorting up down');
    }
    
    up(element) {
        this.clear();
        element.attr('sortable.order', this.SORT_DESC);
        element.removeClass('sorting down').addClass('sorting up');
    }
    
    down(element) {
        this.clear();
        element.attr('sortable.order', this.SORT_ASC);
        element.removeClass('sorting up').addClass('sorting down');    
    }
    
}
