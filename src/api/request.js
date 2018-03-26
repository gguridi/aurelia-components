import {Aurelia, inject, transient} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {HttpClient, json} from 'aurelia-fetch-client';

@transient()
@inject(Aurelia, Router, HttpClient)
export class Request {
    
    headers = {};
    
    constructor(Aurelia, Router, HttpClient) {
        this.aurelia = Aurelia;
        this.router = Router;
        this.http = HttpClient;
        this.config = this.aurelia.container.get('Config');
        this.configure();
    }
    
    configure() {
        this.http.configure(http => {
            http.withBaseUrl(this.config.website.urls.base);
            http.withDefaults({
                credentials: this.config.website.credentials,
                headers: this.config.website.headers
            });
        });
    }
    
    useAuthToken() {
        $.extend(this.headers, {
            "Authorization": "Bearer " + this.config.token
        });
        return this;
    }
    
    getHeaders(options) {
        if (typeof(options.headers) !== "undefined") {
            $.extend(this.headers, options.headers);
        }
        return this.headers;
    }
    
    getBody(options) {
        if (typeof(options.body) !== "undefined") {
            return json(options.body);
        }
        return null;
    }
    
    getUrl(endpoint, options) {
        if (typeof(options.params) !== 'undefined') {
            return endpoint + '?' + $.param(options.params);
        }
        return endpoint;
    }
    
    getConfiguration(options) {
        let configuration = {};
        let headers = this.getHeaders(options)
        if (headers) {
            configuration['headers'] = headers;
        }
        let body = this.getBody(options);
        if (body) {
            configuration['body'] = body;
        }
        return configuration;
    }
    
    request(method, endpoint, options) {
        let url = this.getUrl(endpoint, options || {});
        let configuration = $.extend({
            method : method
        }, this.getConfiguration(options || {}));

        return this.http
            .fetch(url, configuration)
            .then(response => {
                return this.parseResponse(response);
            })
            .then(response => {
                return this.processResponse(response);
            })
            .catch(error => {
                return this.processError(error);
            });
    }
    
    synchronous(method, endpoint, options) {
        let configuration = this.getConfiguration(options || {});
        let result = {};
        $.ajax({
            url: this.config.website.urls.base + endpoint,
            data: configuration['body'] || {},
            dataType: "json",
            async: false,
            type: method,
            beforeSend: (xhr) => {
                xhr.setRequestHeader('Authorization', "Bearer " + this.config.token);
            },
            success: (data) => { 
                console.log('success');
                console.log(data);
                result = data;
            },
            done: (data) => {
                console.log('done');
                console.log(data);
            }
        });
        return result;
    }
    
    parseResponse(response) {
        return response.json()
            .then(response => response);
    }
    
    processResponse(data) {
        let response = this.aurelia.container.get('RCMResponse');
        response.process(data);
        return response;
    }
    
    processError(error) {
        let response = this.aurelia.container.get('RCMResponse');
        if (response.isServerError(error.message)) {
            let authentication = this.aurelia.container.get('RCMAuthentication');
            response.notify('API not available, logging user out.');
            authentication.logout();            
        }
    }
    
    get(endpoint, options) {
        return this.request('get', endpoint, options);
    }
    
    post(endpoint, options) {
        return this.request('post', endpoint, options);
    }
    
    put(endpoint, options) {
        return this.request('put', endpoint, options);
    }
    
    delete(endpoint, options) {
        return this.request('delete', endpoint, options);
    }
}
