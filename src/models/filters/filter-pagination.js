import {FilterBase} from './filter-base';

export class FilterPagination extends FilterBase {
    
    defaultPage = 1;
    defaultLimit = 20;
    
    configure(params) {
        this.page = params.page;
        this.limit = params.limit;
    }
    
    get page() {
        return this.filterPage || this.defaultPage;
    }
    
    set page(value) {
        if (value) {
            this.filterPage = value;
        }
    }
    
    get limit() {
        return this.filterLimit || this.defaultLimit;
    }
    
    set limit(value) {
        if (value) {
            this.filterLimit = value;
        }
    }
    
    get filter() {
        return {
            page: this.isEnabled() ? this.filterPage : 1,
            limit: this.isEnabled() ? this.filterLimit : 0
        };
    }
}
