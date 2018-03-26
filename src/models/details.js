import {Page} from './page';

export class Details extends Page {
    
    id = '';
    
    activate(params, routeConfig) {
        this.id = params.id;
        super.activate(params, routeConfig);
    }
}