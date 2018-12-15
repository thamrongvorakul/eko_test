angular.module('GlobalFilterModule', [])

    .filter("DateRangeFilter", function () {
        return function (items, column, from, to) {

            if (column && from && to) {

                var df = parseInt(from.split('-').join(''));
                var dt = parseInt(to.split('-').join(''));
                var result = [];
                var data;
                var splitcol = column.split('.');
                var length = items.length;
                for (var index = 0; index < length; index++) {
                    var element = items[index];

                    if (splitcol.length > 1) {
                        if (element[splitcol[0]][splitcol[1]] != undefined) {
                            var temp = element[splitcol[0]][splitcol[1]].split(' ');
                            data = temp[0];
                        }
                    } else {
                        data = element[splitcol[0]];
                    }
                    data = new Date(new Date(data).getTime() + (60 * 7 * 60000)).toISOString();
                    if (data != undefined) {
                        var dateval = parseInt(data.split('-').join(''));
                        if (dateval >= df && dateval <= dt) {
                            result.push(element);
                        }
                    }
                }
                return result;
            } else {
                return items;
            }
        };
    })

    .filter("RealDateRangeFilter", function () {
        return function (items, column, from, to) {
            if (column && from && to) {
                if (from instanceof Date && to instanceof Date) {
                    var df = new Date(from).getTime();
                    var dt = new Date(to);
                    dt.setHours(23, 59, 59, 999);
                    dt = new Date(dt).getTime();

                    var result = [];
                    var data;
                    var splitcol = column.split('.');
                    var length = items.length;
                    for (var index = 0; index < length; index++) {
                        var element = items[index];

                        if (splitcol.length > 1) {
                            var tempval = element;
                            for (var index = 0; index < splitcol.length; index++) {
                                var key = splitcol[index];
                                if (tempval[key]) {
                                    tempval = tempval[key];
                                }
                            }
                        } else {
                            data = element[splitcol[0]];
                        }
                        //get gmt+7 time
                        data = new Date(data).getTime() + (60 * 7 * 60000);
                        if (data != undefined) {
                            var dateval = parseInt(data);
                            if (dateval >= df && dateval <= dt) {
                                result.push(element);
                            }
                        }
                    }
                    return result;
                } else {
                    return items;
                }
            } else {
                return items;
            }
        };
    })

    .filter("DateFilter", function () {
        return function (items, column, date) {
            if (column && date instanceof Date) {


                date = new Date(new Date(date).getTime() + (60 * 7 * 60000)).toISOString();

                var dateint = parseInt(date.split('-').join(''));
                var result = [];
                var data;
                var splitcol = column.split('.');
                var length = items.length;

                for (var index = 0; index < length; index++) {
                    var element = items[index];

                    if (splitcol.length > 1) {
                        if (element[splitcol[0]][splitcol[1]] != undefined) {
                            var temp = element[splitcol[0]][splitcol[1]].split(' ');
                            data = temp[0];
                        }
                    } else {
                        data = element[splitcol[0]];
                    }

                    data = new Date(new Date(data).getTime() + (60 * 7 * 60000)).toISOString();

                    if (data != undefined) {
                        var dateval = parseInt(data.split('-').join(''));

                        if (dateval == dateint) {
                            result.push(element);
                        }
                    }
                }
                return result;
            } else {
                return items;
            }

        };
    })

    .filter('KeyFilter', function () {
        return function (input, column, filter) {
            if (column && filter) {
                var result = [];
                input.forEach(function (data) {
                    if (data[column].toString().indexOf(filter) > -1) {
                        result.push(data);
                    }
                });

                return result;
            } else {
                return input;
            }
        }
    })

    .filter('CustomFilter', function () {
        return function (input, statHash) {
            if (statHash) {
                if (!input) {
                    return '';
                } else {
                    return statHash[input];
                }
            }
        };
    })

    .filter('StatusFilter', function () {
        var statHash = {
            1: 'Waiting Response',
            2: 'Waiting for TG',
            3: 'Paid',
            4: 'Contact TG',
            5: 'Fail'
        };

        return function (input) {
            if (!input) {
                return '';
            } else {
                return statHash[input];
            }
        };
    })

    .filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    })
    .filter('unique', function () {

        return function (items, filterOn) {

            if (filterOn === false) {
                return items;
            }

            if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
                var hashCheck = {}, newItems = [];

                var extractValueToCompare = function (item) {
                    if (angular.isObject(item) && angular.isString(filterOn)) {
                        return item[filterOn];
                    } else {
                        return item;
                    }
                };

                angular.forEach(items, function (item) {
                    var valueToCheck, isDuplicate = false;

                    for (var i = 0; i < newItems.length; i++) {
                        if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        newItems.push(item);
                    }

                });
                items = newItems;
            }
            return items;
        };
    });
