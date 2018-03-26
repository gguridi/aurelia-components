import {Aurelia, inject, noView} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Redirect} from 'aurelia-router';

@noView
@inject(Aurelia, Router, EventAggregator)
export class Authentication {

    constructor(Aurelia, Router, EventAggregator) {
        this.aurelia = Aurelia;
        this.router = Router;
        this.ea = EventAggregator;
        this.config = this.aurelia.container.get('Config');
        this.request = this.aurelia.container.get('RCMRequest');
    } 
    
    get user() {
        return JSON.parse(this.config.get('userData')) || {};
    }
    
    set user(value) {
        this.config.set('userData', JSON.stringify(value));
    }

    login(email, password) {
        var encodedCredentials = btoa(email + ':' + password);

        this.request
            .get(this.config.website.urls.login, {
                headers: {
                    "Authorization": "Basic " + encodedCredentials
                }
            })
            .then(response => {
                if (response.isSuccess()) {
                    this.config.token = response.payload.token;
                    this.user = response.payload.userData;
                    this.ea.publish('rcm-login', {user: this.user});
                    this.router.navigate('');
                    return true;
                }
                return this.logout();                    
            });
    }

    logout() {
        this.config.token = null;
        this.user = null;
        this.ea.publish('rcm-logout');
        this.router.navigateToRoute('login');
    }
    
    check(routeConfig) {
        if (routeConfig) {
            let settings = routeConfig.settings || {};
            let allowsAnonymous = (typeof settings.anonymous !== 'undefined') ? settings.anonymous : true;
            if (!allowsAnonymous && !this.isAuthenticated) {
                return new Redirect('login');
            }
            let allowsLoggedIn = (typeof settings.logged !== 'undefined') ? settings.logged : true;
            if (!allowsLoggedIn && this.isAuthenticated) {
                return new Redirect('');
            }
        }
        return true;
    }

    get isAuthenticated() {
        return (this.config.token) ? true : false;
    }
}
