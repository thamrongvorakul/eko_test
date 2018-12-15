angular.module('MainApp').controller('Subject2Controller', function (
    GlobalFunction,
    Notification,
    NgTableParams,
    $q
) {

    let THIS = this;

    THIS.calculate = function () {
        GlobalFunction.sendLoadData('service/route/CASE2', { input: THIS.input }, function (err, result) {
            if (err) {
                Notification.error({
                    message: err
                });
            } else {
                if (result.length == 0) {
                    Notification.warning({
                        message: 'ไม่พบข้อมูล'
                    });
                }
                THIS.data = result.data.data;
            };
        });
    };

})
