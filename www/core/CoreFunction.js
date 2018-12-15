angular.module('GlobalFunction', [])
    .factory('GlobalFunction', function (

        $http,
        $q
    ) {

        var factory = {};
        var canceler = $q.defer();

        factory.httpPost = function (url, data, option, header, callback) {
            var handler = setTimeout(function () {
                canceler.resolve();
                canceler = $q.defer();
                console.info("Timeout");
            }, 60000);

            var _option = {
                method: 'POST',
                url: url,
                data: data,
                timeout: canceler.promise,
                headers: {
                    'uid': sessionStorage.getItem("UID"),
                    'ucode': sessionStorage.getItem("UCODE")
                }

            };
            console.info(_option);
            if (option) {
                for (var key in option) {
                    if (option.hasOwnProperty(key)) {
                        _option[key] = option[key];
                    }
                }
            }
            if (header) {
                for (var key in header) {
                    if (header.hasOwnProperty(key)) {
                        _option.headers[key] = header[key];
                    }
                }
            }
            $http(_option)
                .then(function (result) {
                    console.info(result);
                    if (result.data.status == "ERROR") {
                        callback(JSON.stringify(result.data.message, null, 4), null)
                    } else {
                        callback(null, result);

                    }
                }).catch(function (e) {
                    console.error(e);
                    clearTimeout(handler);
                    callback(e, "Connection timeout");
                });
        };
        factory.sendLoadData = function (url, data, callback) {
            var url = url;
            var option = {};
            var header = {};
            factory.httpPost(url, data, option, header, function (err, result) {
                if (err) {
                    callback(err, result);
                } else {
                    callback(null, result)
                }
            });
        }

        return factory;


    });
