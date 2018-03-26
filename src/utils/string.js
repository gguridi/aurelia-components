import {Aurelia,inject} from 'aurelia-framework';

@inject(Aurelia)
export class StringUtils {

    constructor(Aurelia) {
        this.aurelia = Aurelia;
    }

    createRandomString(length) {
        var string   = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++){
            string += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return string;
    }

    createSlug(string){
      return string.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }
    
}
