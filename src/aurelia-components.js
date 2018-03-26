import {Config} from './config';

import {Request, Response} from './api/index';
import {DialogLoader, Loader, Notifier} from './loaders/index';
import {FilterDates, FilterPagination, FilterProperties, FilterSorting} from './models/filters/index';
import {Authentication, Notification} from './services/index';

export function configure(config) {
    
    config
        .standardConfiguration()
        .developmentLogging()
        .eventAggregator()
        .plugin('aurelia-dialog', config => {
            config.useDefaults();
            config.settings.lock = true;
            config.settings.centerHorizontalOnly = true;
            config.settings.startingZIndex = 100000;
        })
        .plugin('aurelia-validation')
        .plugin('aurelia-validatejs');
    
    config
        .transient('RCMFilterDates', FilterDates)
        .transient('RCMFilterPagination', FilterPagination)
        .transient('RCMFilterProperties', FilterProperties)
        .transient('RCMFilterSorting', FilterSorting);        

    config
        .transient('RCMRequest', Request)
        .transient('RCMResponse', Response);

    config
        .singleton('RCMDialogLoader', DialogLoader)
        .singleton('RCMLoader', Loader)
        .singleton('RCMNotifier', Notifier);

    config
        .singleton('RCMAuthentication', Authentication)
        .singleton('RCMNotification', Notification);        
    
    config
        .globalResources([
            './converters/boolean-format', 
            './converters/byte-format', 
            './converters/json-format', 
            './converters/coalesce-format',
            './converters/currency-format',
            './converters/date-format',
            './converters/image-format',
            './converters/number-format',
            './converters/string-format'
        ]);
}

export * from './api/index';
export * from './utils/index';
export * from './dialogs/index';
export * from './forms/index';
export * from './loaders/index';
export * from './models/index';
export * from './models/filters/index';
export * from './services/index';

export {
  Config
};