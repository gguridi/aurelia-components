export class ByteValueConverter {
    
    toView(value) {
        return (value == 0) ? '0B' : this.getString(value);
    }
    
    getString(value) {
        var k = 1024; // or 1024 for binary
        var dm = 2;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(value) / Math.log(k));
        return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + sizes[i];        
    }
}
