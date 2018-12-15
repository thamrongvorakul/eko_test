const api = require('../../API/v1/api.js'),
    graphObject = require('../../storage/GRAPH_OBJECT.json');

exports.startAPI = async function (req, res) {

    let payload = req.body;
    if (!payload.input) {
        res.json({
            'status': 'ERROR', 'code': 500, 'message': 'Please input the route for calculate.', 'data': null
        });
    } else {
        api.case2_function(payload.input, graphObject, function (err, result) {
            res.json({
                'status': 'OK', 'code': 200, 'message': 'success', 'data': result
            });
        });
    }
}