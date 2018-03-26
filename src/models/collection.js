import {Aurelia, Lazy, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {activationStrategy} from 'aurelia-router';
import {DialogService} from 'aurelia-dialog';
import {Router} from 'aurelia-router';
import {Authorization} from './authorization';
import {Entry} from './entry';
import {Totals} from './totals';
import {DialogCRUD} from '../dialogs/crud';
import {DialogDelete} from '../dialogs/dialog-delete';

@inject(Aurelia, Router, DialogService, EventAggregator)
export class Collection extends Authorization {
    
    constructor(Aurelia, Router, DialogService, EventAggregator){
        super(Aurelia);
        this.router = Router;
        this.dialogService = DialogService;
        this.ea = EventAggregator;
        this.initialize();
    }
    
    initialize() {
        this.setFilters();
        this.setModel();
        this.setEvents();
    }
    
    get entryModel() {
        return this.constructor.name + '_entry';
    }

    get dialogCRUD() {
        return this.constructor.name + '_dialog_crud';
    }

    get dialogDelete() {
        return this.constructor.name + '_dialog_delete';
    }

    get totalsModel() {
        return this.constructor.name + '_totals';
    }
    
    setFromEvent(property, event) {
        this[property] = event.detail.event.target.value;
    }
    
    /**
     * Returns the activation strategy.
     * 
     * - activationStrategy.replace; //replace the viewmodel with a new instance
     * - activationStrategy.invokeLifecycle; // to invoke router lifecycle methods on the existing VM
     * - activationStrategy.noChange //to explicitly use the default behavior
     * 
     * @returns {activationStrategy.invokeLifecycle}
     */
    determineActivationStrategy() {
        return activationStrategy.invokeLifecycle;
    }
    
    totals = {};
    
    activate(params, routeConfig) {
        this.hideLoader();        
        this.configure(params);
        this.fetch();
    }
    
    deactivate() {
        this.showLoader();
    }
    
    configure(params) {
        this.dates.configure(params);
        this.pagination.configure(params);
        this.sorting.configure(params);
        this.properties.configure(params);
    }
    
    fetch() {
        throw new Exception('Method fetch must be implemented by the child collection.');
    }
    
    showLoader() {
        this.aurelia.container.get('RCMLoader').show();
    }
    
    hideLoader() {
        this.aurelia.container.get('RCMLoader').hide();    
    }
    
    showNotifier(options) {
        this.aurelia.container.get('RCMNotifier').show(options);
    }
    
    hideNotifier(options) {
        this.aurelia.container.get('RCMNotifier').hide();
    }
    
    setFilters() {
        this.dates = this.aurelia.container.get('RCMFilterDates');
        this.pagination = this.aurelia.container.get('RCMFilterPagination');
        this.sorting = this.aurelia.container.get('RCMFilterSorting');
        this.properties = this.aurelia.container.get('RCMFilterProperties');
    }
    
    setModel() {
        this.aurelia.container.registerHandler(this.entryModel, c => c.get(Entry));
        this.aurelia.container.registerHandler(this.totalsModel, c => c.get(Totals));
        this.aurelia.container.registerHandler(this.dialogCRUD, c => c.get(DialogCRUD));
        this.aurelia.container.registerHandler(this.dialogDelete, c => c.get(DialogDelete));
    }
    
    setEvents() {
        this.setEventSorting();
    }
    
    setEventSorting() {
        this.ea.subscribe('sorting', response => {
            this.sorting.sortBy = response.field;
            this.sorting.sortOrder = response.order;
            this.fetch();
        });
    }
    
    getFilters() {
        return $.extend({},
            this.dates.filter,
            this.pagination.filter,
            this.sorting.filter,
            this.properties.filter
        );
    }
    
    getQuery(parameters) {
        parameters = parameters || {};
        return $.extend(this.getFilters(), parameters);
    }
}