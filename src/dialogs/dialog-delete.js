import {customElement} from 'aurelia-framework';
import {Dialog} from './dialog';

@customElement('dialog-delete')
export class DialogDelete extends Dialog {
    
    heading = "Delete Record";
    
    configure(data) {
        super.configure(data);
        this.clean();
    }
    
    /**
     * This method cleans the properties too long that would make
     * the delete dialog unreadable.
     */
    clean() {
        $.each(this.properties || {}, (key, value) => {
            if ($.type(value) === 'string' && value.length > 32) {
                this.properties[key] = '<!trimmed>';
            } 
        });
    }
    
}
