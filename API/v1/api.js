
module.exports = {

    case1_function: function (input, example, callback) {
        start();
        function start() {
            let splitPayloadInput = input.split(',');
            let tempReponseObj = {};
            for (let i = 0; i < splitPayloadInput.length; i++) {

                let splitInput = splitPayloadInput[i].split('-');
                tempReponseObj[splitPayloadInput[i]] = 0;

                for (let j = 0; j < splitInput.length; j++) {

                    let route;
                    if (splitInput[j + 1]) {
                        route = splitInput[j] + splitInput[j + 1];
                    }

                    if (route) {
                        for (let key in example) {
                            if (validateCorrectRoute(route)) {
                                if (route === key) {
                                    tempReponseObj[splitPayloadInput[i]] += example[route];
                                }
                            } else {
                                tempReponseObj[splitPayloadInput[i]] = 0;
                            }
                        }
                    }
                }
            }
            packForResponse(tempReponseObj)
        }

        function packForResponse(tempReponseObj) {
            let returnArr = [];
            for (let key in tempReponseObj) {
                returnArr.push({ route: key, cost: tempReponseObj[key] });
            }
            callback(null, {
                dataSet: returnArr,
                totalItem: returnArr.length
            });
        }

        function validateCorrectRoute(route) {
            let arrayTempExampleKey = [];
            for (let key in example) {
                arrayTempExampleKey.push(key);
            }

            if (arrayTempExampleKey.indexOf(route) > -1) {
                return true;
            } else {
                return false;
            }
        }
    },
    case2_function: function (input, graphObject, callback) {

        start();
        function start() {
            let splitPayloadInput = input.split('-');
            let returnArr = [];
            let routesArray = [splitPayloadInput[0]];

            calculate(0, splitPayloadInput[0], graphObject, splitPayloadInput[1], routesArray, returnArr);
            packForResponse(returnArr);
        }

        function calculate(currentCost, startPoint, graphObject, endPoint, routesArray, returnArr) {

            if (startPoint === endPoint && routesArray.length > 1) {

                returnArr.push({
                    routes: routesArray,
                    cost: currentCost
                });
                return;
            }
            let allPointFromStartPoint = graphObject[startPoint];

            for (let key in allPointFromStartPoint) {

                let calCost = currentCost + allPointFromStartPoint[key];
                let duplicate = routesArray.indexOf(key);

                if (duplicate > -1 && key != endPoint) {
                    continue;
                }

                let tempRoutesArray = JSON.parse(JSON.stringify(routesArray));
                tempRoutesArray.push(key);
                calculate(calCost, key, graphObject, endPoint, tempRoutesArray, returnArr);
            }
        }

        function packForResponse(returnArr) {

            var results = {
                count: returnArr.length,
                routes: returnArr
            }
            callback(null, results);
        }
    },
    case3_function: function (input, graphObject, callback) {
        start();
        function start() {

            let splitPayloadInput = input.split('-');

            let returnArr = [];
            let routesArray = [splitPayloadInput[0]];

            calculate(0, splitPayloadInput[0], graphObject, splitPayloadInput[1], routesArray, returnArr);
            packForResponse(returnArr);
        }

        function calculate(currentCost, startPoint, graphObject, endPoint, routesArray, returnArr) {

            if (startPoint === endPoint && routesArray.length > 1) {
                returnArr.push({
                    routes: routesArray,
                    cost: currentCost
                });

                return;
            }
            let allPointFromStartPoint = graphObject[startPoint];

            for (let key in allPointFromStartPoint) {
                let calCost = currentCost + allPointFromStartPoint[key];
                let duplicate = routesArray.indexOf(key);

                if (duplicate > -1 && key != endPoint) {
                    continue;
                }

                let tempRoutesArray = JSON.parse(JSON.stringify(routesArray));
                tempRoutesArray.push(key);
                calculate(calCost, key, graphObject, endPoint, tempRoutesArray, returnArr)
            }
        }

        function packForResponse(returnArr) {

            returnArr.sort(function (a, b) {
                return a.cost - b.cost;
            });
            callback(null, returnArr[0]);
        }
    }
}