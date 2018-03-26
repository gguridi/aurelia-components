/* 
 * @file
 * converters around image properties.
 */
import {inject} from 'aurelia-framework';
import {ImageUtils} from './../utils/image';

@inject(ImageUtils)
export class ImageWidthValueConverter {
    
    constructor(ImageUtils) {
        this.utils = ImageUtils;
    }    
    
    toView(value, max) {
        let image = this.utils.base64ToImage(value, function() {});
        let width = this.utils.getWidthFixedHeight(image, max);
        let height = this.utils.getHeightFixedWidth(image, max);
        return (height > this.utils.parseMaxHeight(max)) ? this.utils.parseMaxWidth(max) : width;
    }

}

@inject(ImageUtils)
export class ImageHeightValueConverter {
    
    constructor(ImageUtils) {
        this.utils = ImageUtils;
    }        
    
    toView(value, max) {
        let image = this.utils.base64ToImage(value, function() {});
        let width = this.utils.getWidthFixedHeight(image, max);
        let height = this.utils.getHeightFixedWidth(image, max);
        return (width > this.utils.parseMaxWidth(max)) ? this.utils.parseMaxHeight(max) : height;
    }

}


