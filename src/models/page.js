import {ImplException} from '../exceptions';
import {CRUD} from './crud';

export class Page extends CRUD  {
    
    /**
     * Returns the heading of this page.
     * 
     * @returns {String} 
     */
    get heading() {
        throw new ImplException('heading');
    }
    
    /**
     * Returns the route to this model for different purposes.
     * 
     * @returns {String}
     */
    get route() {
        throw new ImplException('route');
    }
    
    /**
     * Returns the breadcrumb of this page.
     * 
     * @example [
     *      {'route': 'affiliates', 'routeTitle': 'Affiliates'}
     *  ];
     * 
     * @returns {Array}
     */
    get breadcrumbs() {
        return [
            {'route': this.route, 'routeTitle': this.heading}
        ];
    }
}