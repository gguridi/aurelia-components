/**
 * Base configuration.
 */
export class Config {
    
    id = 'dummyconfigid';
        
    website = {
        credentials: '',
        headers : {},
        urls : {
            base : '',
            login : ''
        }
    };
    
    notifications = {
        enabled: true,
        options: {
            pushState: true
        } 
    };
    
    get token() {
        return this.get('token');
    }
    
    set token(value) {
        this.set('token', value);
    }
        
    get(name) {
        return localStorage[this.id + '.' + name];
    }
    
    set(name, value) {
        (value === null) ? this.remove(name) : localStorage[this.id + '.' + name] = value;
    }
    
    remove(name) {
        localStorage.removeItem(this.id + '.' + name);
    }
    
};
