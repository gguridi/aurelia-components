import {DialogCRUD} from './crud';

export class DialogImage extends DialogCRUD {
    
    select() {
        let files = {};
        this.flushErrors();
        $.each($('[data-file]'), (i, value) => {
            try {
                let element = $(value);
                let file = element[0].files[0];

                this.validate(file);
                this.attachFile(element.attr('data-file'), file);
            } catch (e) {
                this.addError(e.message);
            }
        });
    }
    
    validate(file) {
        this.validateName(file);
        this.validateType(file);
        this.validateSize(file);
    }
    
    validateName(file) {
        this.validationController.removeError(this.nameError);
        if (file && !file.name.match(/^[A-Za-z0-9_\-\.]+$/)) {
            this.nameError = this.validationController.addError('The file name is not valid.');
            throw new Error('Invalid file name. Please use only [A-Za-z0-9_-.] characters.');
        }
    }
    
    validateType(file) {
        let imageType = /image.*/;
        this.validationController.removeError(this.typeError);
        if (!file.type.match(imageType)) {
            this.typeError = this.validationController.addError('The file type is not valid.');
            throw new Error('Invalid file type');
        }
    }
    
    validateSize(file) {
        let maxSize = this.config.get('maxImageSize') || 2097152;
        this.validationController.removeError(this.sizeError);
        if (file && file.size > maxSize) {
            this.sizeError = this.validationController.addError('The file uploaded exceeds the maximum of 2MB');
            throw new Error('Invalid size');
        }
    }
    
    attachFile(name, file) {
        let reader = new FileReader();
        reader.onload = (readerEvt) => {
            var binaryString = readerEvt.target.result;
            var base64 = btoa(binaryString);
            base64 = 'data:' + file.type + ';base64,' + base64;
            this.properties[name] = base64;
            this.properties.fileName = file.name;
            this.properties.fileSize = file.size;
        };
        reader.readAsBinaryString(file);
    }
}
