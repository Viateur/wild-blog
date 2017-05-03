let navbar = {
    templateUrl: 'js/components/common/navbar.html',
    controller: ['UsersService', '$state','$interval', function(UsersService, $state, $interval) {
        'use strict'
        var moment = require('moment');

        angular.extend(this, {
            $onInit() {
                UsersService.getCurrent().then((user) => {
                    this.user = user;
                    this.actualHour = moment();
                    $interval(() => {this.actualHour = moment()}, 1000);
                }).catch((err) => {})
            },
            disconnect() {
                UsersService.disconnect().then(() => {
                    Materialize.toast('Disconnected', 4000, 'toast-warning')
                    this.user = null
                    $state.reload()
                })
            }

        })
    }]
}

export default navbar
