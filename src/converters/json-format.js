
export class JsonValueConverter {
    
    constructorName = '';
    
    toView(value) {
        return (typeof value !== 'object') ? value : this.process(value);
    }
    
    process(value) {
        this.constructorName = value.constructor.name;
        return JSON.stringify(value, this.removeInstances.bind(this));
    }
    
    removeInstances(key, value) {
        try {
            if (typeof value === 'object' && $.inArray(value.constructor.name, ['undefined', this.constructorName]) < 0) {
                return;
            }
            return value;
        } catch(exception) {
            // Ignore the errors.
        }
    }
}