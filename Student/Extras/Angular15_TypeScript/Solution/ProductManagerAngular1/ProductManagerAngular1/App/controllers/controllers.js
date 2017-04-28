var myApp;
(function (myApp) {
    let app = angular.module("myApp");
    class HomeController {
        constructor() {
            this.welcomeMessage = "Welcome to the Wingtip Product Manager";
            this.topic1Title = "Add a new product";
            this.topic1Copy = "Click the Add Product link on the navbar aboive to add a new product.";
            this.topic2Title = "See the Product Showcase";
            this.topic2Copy = "Click Product Showcase link in the navbar to see the full set of Wingtip products.";
        }
    }
    HomeController.$inject = [];
    app.controller('homeController', HomeController);
    class ProductsController {
        constructor($location, ProductDataService) {
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            ProductDataService.GetAllProductsAsync()
                .then((result) => {
                this.products = result;
            });
            ProductDataService.GetProductCategoriesAsync()
                .then((result) => {
                this.productCategories = result;
            });
        }
        deleteProduct(id) {
            this.ProductDataService.DeleteProductAsync(id)
                .then(() => {
                this.$location.path("/products");
            });
        }
    }
    ProductsController.$inject = ['$location', 'ProductDataService'];
    app.controller('productsController', ProductsController);
    class AddProductController {
        constructor($location, ProductDataService) {
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            this.product = new myApp.Product();
            ProductDataService.GetProductCategoriesAsync()
                .then((result) => {
                this.productCategories = result;
            });
        }
        addProduct() {
            this.ProductDataService.AddProductAsync(this.product)
                .then(() => {
                this.$location.path("/products");
            });
        }
    }
    AddProductController.$inject = ['$location', 'ProductDataService'];
    app.controller('addProductController', AddProductController);
    class ViewProductController {
        constructor($routeParams, ProductDataService) {
            var id = parseInt($routeParams.id);
            ProductDataService.GetProductAsync(id)
                .then((result) => {
                this.product = result;
            });
        }
    }
    ViewProductController.$inject = ['$routeParams', 'ProductDataService'];
    app.controller('viewProductController', ViewProductController);
    class EditProductController {
        constructor($routeParams, $location, ProductDataService) {
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            var id = parseInt($routeParams.id);
            ProductDataService.GetProductAsync(id)
                .then((result) => {
                this.product = result;
            });
            ProductDataService.GetProductCategoriesAsync()
                .then((result) => {
                this.productCategories = result;
            });
        }
        updateProduct() {
            this.ProductDataService.UpdateProductAsync(this.product)
                .then(() => { this.$location.path("/products"); });
        }
    }
    EditProductController.$inject = ['$routeParams', '$location', 'ProductDataService'];
    app.controller('editProductController', EditProductController);
    class ProductShowcaseController {
        constructor($location, ProductDataService) {
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            let categoryFilter = $location.search().category;
            if (categoryFilter === undefined) {
                ProductDataService.GetAllProductsAsync()
                    .then((result) => {
                    this.products = result;
                });
            }
            else {
                ProductDataService.GetProductsByCategoryAsync(categoryFilter)
                    .then((result) => {
                    this.products = result;
                });
            }
        }
    }
    ProductShowcaseController.$inject = ['$location', 'ProductDataService'];
    app.controller('productShowcaseController', ProductShowcaseController);
})(myApp || (myApp = {}));
