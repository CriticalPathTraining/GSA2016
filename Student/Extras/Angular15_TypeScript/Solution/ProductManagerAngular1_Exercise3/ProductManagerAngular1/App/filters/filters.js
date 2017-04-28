var myApp;
(function (myApp) {
    class AppFilters {
        static listPriceFilter($filter) {
            return (price) => {
                return "$" + $filter('number')(price, 2) + " USD";
            };
        }
    }
    AppFilters.$inject = ['$filter'];
    angular.module("myApp").filter("listPrice", AppFilters.listPriceFilter);
})(myApp || (myApp = {}));
