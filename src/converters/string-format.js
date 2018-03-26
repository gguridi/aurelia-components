export class ImplodeValueConverter {
    toView(value, delimitter) {
        if(typeof(value) == "undefined"){
            return '';
        }
        if(value.constructor === Array){
            return value.join("\n");
        }
        return value;
    }
}

export class UcWordsValueConverter {
    
    toView(value) {
        return (value + '')
            .replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function ($1) {
                return $1.toUpperCase()
            }
        );
    }
}
