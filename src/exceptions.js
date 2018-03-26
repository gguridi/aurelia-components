
export class ErrorException extends Error {
    
    constructor(message) {
        super(message);
        this.name = 'ErrorException';
    }
};

export class ImplException extends Error {
    
    constructor(message) {
        super('The method ' + message + ' should be overriden by its children.');
        this.name = 'ImplException';
    }
}