import {moment} from 'moment';

export class DateFormatValueConverter {
    
    toView(value, format) {
        if(typeof(value) == "undefined" || value === '') {
            return 'Never';
        }
        return this.getFormatted(value, format);
    }
    
    getFormatted(value, format) {
        value = parseInt(value * 1000);
        return moment(value).format(format);
        return moment(value).fromNow();        
    }
}
