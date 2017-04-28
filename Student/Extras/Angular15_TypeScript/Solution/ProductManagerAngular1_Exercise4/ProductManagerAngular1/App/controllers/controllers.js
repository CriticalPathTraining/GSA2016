var myApp;
(function (myApp) {
    var app = angular.module("myApp");
    var HomeController = (function () {
        function HomeController() {
            this.welcomeMessage = "Welcome to the Wingtip Product Manager";
            this.topic1Title = "Add a new product";
            this.topic1Copy = "Click the Add Product link on the navbar aboive to add a new product.";
            this.topic2Title = "See the Product Showcase";
            this.topic2Copy = "Click Product Showcase link in the navbar to see the full set of Wingtip products.";
        }
        return HomeController;
    }());
    HomeController.$inject = [];
    app.controller('homeController', HomeController);
    var ProductsController = (function () {
        function ProductsController($location, ProductDataService) {
            var _this = this;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            ProductDataService.GetAllProductsAsync()
                .then(function (result) {
                _this.products = result;
            });
            ProductDataService.GetProductCategoriesAsync()
                .then(function (result) {
                _this.productCategories = result;
            });
        }
        ProductsController.prototype.deleteProduct = function (id) {
            var _this = this;
            this.ProductDataService.DeleteProductAsync(id)
                .then(function () {
                _this.$location.path("/products");
            });
        };
        return ProductsController;
    }());
    ProductsController.$inject = ['$location', 'ProductDataService'];
    app.controller('productsController', ProductsController);
    var AddProductController = (function () {
        function AddProductController($location, ProductDataService) {
            var _this = this;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            this.product = new myApp.Product();
            ProductDataService.GetProductCategoriesAsync()
                .then(function (result) {
                _this.productCategories = result;
            });
        }
        AddProductController.prototype.addProduct = function () {
            var _this = this;
            this.ProductDataService.AddProductAsync(this.product)
                .then(function () {
                _this.$location.path("/products");
            });
        };
        return AddProductController;
    }());
    AddProductController.$inject = ['$location', 'ProductDataService'];
    app.controller('addProductController', AddProductController);
    var ViewProductController = (function () {
        function ViewProductController($routeParams, ProductDataService) {
            var _this = this;
            var id = parseInt($routeParams.id);
            ProductDataService.GetProductAsync(id)
                .then(function (result) {
                _this.product = result;
            });
        }
        return ViewProductController;
    }());
    ViewProductController.$inject = ['$routeParams', 'ProductDataService'];
    app.controller('viewProductController', ViewProductController);
    var EditProductController = (function () {
        function EditProductController($routeParams, $location, ProductDataService) {
            var _this = this;
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            var id = parseInt($routeParams.id);
            ProductDataService.GetProductAsync(id)
                .then(function (result) {
                _this.product = result;
            });
            ProductDataService.GetProductCategoriesAsync()
                .then(function (result) {
                _this.productCategories = result;
            });
        }
        EditProductController.prototype.updateProduct = function () {
            var _this = this;
            this.ProductDataService.UpdateProductAsync(this.product)
                .then(function () { _this.$location.path("/products"); });
        };
        return EditProductController;
    }());
    EditProductController.$inject = ['$routeParams', '$location', 'ProductDataService'];
    app.controller('editProductController', EditProductController);
    var ProductShowcaseController = (function () {
        function ProductShowcaseController() {
        }
        return ProductShowcaseController;
    }());
    ProductShowcaseController.$inject = [];
    app.controller('productShowcaseController', ProductShowcaseController);
})(myApp || (myApp = {}));
//# sourceMappingURL=controllers.js.map