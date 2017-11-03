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
        // add constructor
        constructor($location, ProductDataService) {
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            this.products = ProductDataService.GetAllProducts();
            this.productCategories = ProductDataService.GetProductCategories();
        }
        // add delete user action
        deleteProduct(id) {
            this.ProductDataService.DeleteProduct(id);
            this.$location.path("/products");
        }
    }
    ProductsController.$inject = ['$location', 'ProductDataService'];
    app.controller('productsController', ProductsController);
    class AddProductController {
        constructor($location, ProductDataService) {
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            this.product = new myApp.Product();
            this.productCategories = ProductDataService.GetProductCategories();
        }
        addProduct() {
            this.ProductDataService.AddProduct(this.product);
            this.$location.path("/products");
        }
    }
    AddProductController.$inject = ['$location', 'ProductDataService'];
    app.controller('addProductController', AddProductController);
    class ViewProductController {
        constructor($routeParams, ProductDataService) {
            var id = parseInt($routeParams.id);
            this.product = ProductDataService.GetProduct(id);
        }
    }
    ViewProductController.$inject = ['$routeParams', 'ProductDataService'];
    app.controller('viewProductController', ViewProductController);
    class EditProductController {
        constructor($routeParams, $location, ProductDataService) {
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.ProductDataService = ProductDataService;
            let id = parseInt($routeParams.id);
            this.product = ProductDataService.GetProduct(id);
            this.productCategories = ProductDataService.GetProductCategories();
        }
        updateProduct() {
            this.ProductDataService.UpdateProduct(this.product);
            this.$location.path("/products");
        }
    }
    EditProductController.$inject = ['$routeParams', '$location', 'ProductDataService'];
    app.controller('editProductController', EditProductController);
    class ProductShowcaseController {
        constructor() { }
    }
    ProductShowcaseController.$inject = [];
    app.controller('productShowcaseController', ProductShowcaseController);
})(myApp || (myApp = {}));
