
export class Loader {

    show() {
        this.get().css('display', 'block');
    }
    
    hide() {
        this.get().fadeOut();
    }
    
    get() {
        return $('img[id="loader"]');
    }
}