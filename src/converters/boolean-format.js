export class BoolFormatValueConverter {
    
    toView(value, delimitter) {
        return (value) ? 'Yes' : 'No';
    }
}