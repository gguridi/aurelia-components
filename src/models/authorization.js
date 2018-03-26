import {Aurelia, inject} from 'aurelia-framework';

/**
 * Implements an authorization mechanism to work with aurelia.
 * 
 * This class, through the canActivate event, chooses if the user is allowed in
 * this model or not.
 */
@inject(Aurelia)
export class Authorization {
    
    constructor(Aurelia) {
        this.aurelia = Aurelia;
    }
    
    canActivate(params, routeConfig) {
        let authentication = this.aurelia.container.get('RCMAuthentication');        
        return authentication.check(routeConfig);
    }
}