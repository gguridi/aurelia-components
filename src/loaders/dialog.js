
export class DialogLoader {
    
    show(dialog) {
        this.get(dialog).show();
        this.buttons(dialog).attr('disabled', 'disabled');
    }
    
    hide(dialog) {
        this.get(dialog).fadeOut();
        this.buttons(dialog).removeAttr('disabled');
    }
    
    get(dialog) {
        let id = (dialog) ? dialog : '';
        return $(id + ' .dialog-loader');
    }
    
    buttons(dialog) {
        let id = (dialog) ? dialog : '';
        return $(id + ' .ai-dialog-footer .btn');
    }
}
