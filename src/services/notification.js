import {Aurelia, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Aurelia, Router)
export class Notification {

    imageApprovals = 0;
    flags = 0

    initialLoad = true;
    checkInterval = 10000;

    constructor(Aurelia, Router) {
        this.aurelia = Aurelia;
        this.router = Router;
        this.authentication = this.aurelia.container.get('RCMAuthentication');
        this.request = this.aurelia.container.get('RCMRequest');
        this.sound = new Audio('https://s3-eu-west-1.amazonaws.com/rightcasinomedia.com/cms/audio/notification.mp3');
        this.fetchNotifications();

        setInterval(() => {
            this.fetchNotifications();
        }, this.checkInterval);
    }
    
    poll() {
        if (this.authentication.isAuthenticated) {
            this.fetch();
        }
    }

    fetch() {
        this.request
            .useAuthToken()
            .get('notifications/count')
            .then(response => {
                this.process(response);
            });
    }
    
    process(response) {
        let imageApprovals = response.response.imageApprovals;
        let flags = response.response.flags;
        this.playSound(imageApprovals, flags);
        this.imageApprovals = imageApprovals;
        this.flags = flags;
    }
    
    playSound(imageApprovals, flags) {
        if (this.imageApprovals >= 0 && this.imageApprovals < imageApprovals &&
            this.flags >= 0 && this.flags < flags) {
            this.sound.play();
        }
    }

    get total() {
        return this.imageApprovals + this.flags;
    }
}
