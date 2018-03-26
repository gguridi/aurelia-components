import numeral from 'numeral';

export class CoalesceValueConverter {
    
    toView(value, ...values) {
        return value || this.getFirstNotNull(values);
    }
    
    getFirstNotNull(values) {
        for (let value of values) {
            if (value) {
                return value;
            }
        }
    }
}
