const assert = require('assert'),
    chai = require('chai'),
    should = chai.should(),
    expect = chai.expect,
    api = require('../API/v1/api.js'),
    example = require('../storage/EXAMPLE.json'),
    graphObject = require('../storage/GRAPH_OBJECT.json');


describe('Case 1:  Calculate the delivery cost of the given delivery route. Follow the route as given; do not count any extra stops. In case given route is not exists, output ’No Such Route’', function () {

    it('should return array of delivery route and them cost for each route.', function () {
        api.case1_function('A-B-E', example, function (err, result) {
            expect(result).to.deep.equal({ dataSet: [{ route: 'A-B-E', cost: 4 }], totalItem: 1 });
        })
    });
});

describe('Case 2:  Calculate the number of possible delivery route that can be construct by the given conditions. ( Do not count the route that has 0 cost )', function () {

    it('should return count of possible route.', function () {
        api.case2_function('E-D', graphObject, function (err, result) {
            expect(result).to.deep.equal({ 'count': 3, 'routes': [{ 'routes': ['E', 'A', 'D'], 'cost': 12 }, { 'routes': ['E', 'A', 'C', 'F', 'D'], 'cost': 9 }, { 'routes': ['E', 'A', 'C', 'D'], 'cost': 10 }] });
        })
    });
});

describe('Case 3:  Calculate the cheapest delivery route between two town.', function () {

    it('should return the cheapest cost between two node.', function () {
        api.case3_function('E-E', graphObject, function (err, result) {
            expect(result).to.deep.equal({ 'routes': ['E', 'B', 'E'], 'cost': 6 });
        })
    });
});