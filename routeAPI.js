module.exports = {


    startRouting: function (lib) {

        lib.app.post('/' + lib.config.APPPATH + '/service/:service/:action', function (req, res, err) {
            let serviceApi = './services/' + req.params.service + '/' + req.params.action;
            try {
                let service = require(serviceApi);
                service.startAPI(req, res);
            }
            catch (e) {
                console.log(e.stack);
                res.json(lib.returnmessage.json_error_msg(e.message));
            }

        });
    }
}
