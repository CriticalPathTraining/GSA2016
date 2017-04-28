var myApp;
(function (myApp) {
    let app = angular.module("myApp");
    class ProductNavigationController {
        constructor(ProductDataService) {
            this.ProductDataService = ProductDataService;
            // initialize view model inside $onInit not in constructor
        }
        ;
        $onInit() {
            this.ProductDataService.GetProductCategoriesAsync()
                .then((result) => {
                this.productCategories = result;
            });
        }
    }
    ProductNavigationController.$inject = ['ProductDataService'];
    class ProductNavigation {
        constructor() {
            this.bindings = {};
            this.controller = ProductNavigationController;
            this.templateUrl = '/App/components/productNavigation.html';
        }
    }
    app.component("productNavigation", new ProductNavigation());
})(myApp || (myApp = {}));
