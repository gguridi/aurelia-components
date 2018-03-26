
export class Notifier {
    
    defaults = {
        'type': 'danger',
        'message': 'Why is this error here?!',
        'delay': 3000
    };
    
    get() {
        return $('notifier');
    }
    
    getIcon(options) {
        var icon = 'info';
        switch (options.type) {
            case 'danger' :
                icon = 'error_outline';
                break;
            case 'warning':
                icon = 'warning';
                break;
            case 'info'   :
                icon = 'info_outline';
                break;
            case 'success':
                icon = 'check';
                break;
        }
        return icon;
    }
    
    show(options) {
        options = $.extend({}, this.defaults, options);
        let target = this.get();
        let icon = this.getIcon(options);

        let flash = '<div class="alert alert-' + options.type + '">';
        flash += '<i class="material-icons ' + icon + '"></i>';
        flash += options.message;
        flash += '</div>';
        target.addClass('animated');
        target.prepend(flash).removeClass('hidden slideOutUp').addClass('slideInRight').show();

        if (options.delay !== false) {
            setTimeout($.proxy(function () {
                this.get().removeClass('slideInRight').addClass('slideOutUp').fadeOut('slow');
                setTimeout(function () {
                    $('notifier .alert').remove();
                }, 500);
            }, this), options.delay);
        }
        return true;
    }
}

