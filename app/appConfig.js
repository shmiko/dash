/**
 * Created by pauljones on 1/05/15.
 */

angular.module('app').config(function ($provide) {
    $provide.decorator("$exceptionHandler", ["$delegate", function ($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);
            //alert(exception.message);
        };
    }]);
});