import {inject} from 'aurelia-framework';
import {MathUtils} from './../utils/math';
import numeral from 'numeral';

export class NumberFormatValueConverter {
    
    toView(value, type) {
        switch (type) {
            case 'money': 
                return this.formatMoney(value);
                
            case 'percentage':
                return this.formatPercentage(value);
        }
        return value;
    }
    
    formatMoney(value) {
        return numeral(value).format('0,0.00');
    }
    
    formatPercentage(value) {
        return numeral(value).format('0.00%');
    }
}

@inject(MathUtils)
export class SumValueConverter {
    
    constructor(MathUtils) {
        this.math = MathUtils;
    }
    
    toView(value, addition) {
        return this.math.sum(value, addition);
    }
}

@inject(MathUtils)
export class MultiplyValueConverter {
    
    constructor(MathUtils) {
        this.math = MathUtils;
    }    
    
    toView(value, factor) {
        return this.math.multiply(value, factor);
    }
}

@inject(MathUtils)
export class DivideValueConverter {
    
    constructor(MathUtils) {
        this.math = MathUtils;
    }    
    
    toView(nominator, denominator) {
        return this.math.divide(nominator, denominator); 
    }
}