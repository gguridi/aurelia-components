import {NumberFormatValueConverter} from './number-format';

export class CurrencyFormatValueConverter {
    
    toView(value, currency) {
        return currency + value;
    }
}

export class CurrencyListValueConverter {
    
    toView(values) {
        let format = '';
        for (let currency in values) {
            format += currency + NumberFormatValueConverter.prototype.formatMoney(values[currency]) + '<br/>';
        }
        return format;
    }
}
