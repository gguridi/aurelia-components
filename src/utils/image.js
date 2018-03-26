/* 
 * @file
 * Helper to extract information from images.
 */

export class ImageUtils {
    
    /**
     * This function converts base64 strings into File objects.
     * @param string data
     *   base64 data.
     * @param string filename
     *   filename to use.
     * @returns File
     */
    base64ToFile(data, filename) {
        var arr = data.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    /**
     * This function converts base64 strings into Image objects.
     * @param string data
     *   base64 data.
     * @param callback onloadCallback
     *   callback for when the image loads
     * @returns File
     */
    base64ToImage(data, onloadCallback) {
        let image = new Image();
        image.onload = onloadCallback;
        image.src = data;
        return image;
    }

    /**
     * This function converts File objects into Image objects.
     * @param string data
     *   base64 data.
     * @param callback onloadCallback
     *   callback for when the image loads
     * @returns File
     */
    fileToImage(file, onloadCallback) {
        let _URL = window.URL || window.webkitURL;
        let image = new Image();
        image.onload = onloadCallback || function() {};
        image.src = _URL.createObjectURL(file);    
        return image;
    }    
    
    parseMaxWidth(max) {
        return max.split('x').shift();
    }
    
    parseMaxHeight(max) {
        return max.split('x').pop();
    }
    
    getHeightFixedWidth(image, max) {
        let width = image.naturalWidth;
        let height = image.naturalHeight;
        return this.parseMaxWidth(max) * height / width;
    }
    
    getWidthFixedHeight(image, max) {
        let width = image.naturalWidth;
        let height = image.naturalHeight;
        return this.parseMaxHeight(max) * width / height;
    }
}


