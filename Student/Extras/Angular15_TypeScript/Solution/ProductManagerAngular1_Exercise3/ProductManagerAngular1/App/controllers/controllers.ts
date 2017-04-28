module myApp {

  let app = angular.module("myApp");

  class HomeController {
    static $inject: Array<string> = [];
    welcomeMessage = "Welcome to the Wingtip Product Manager";
    topic1Title = "Add a new product";
    topic1Copy = "Click the Add Product link on the navbar aboive to add a new product.";
    topic2Title = "See the Product Showcase";
    topic2Copy = "Click Product Showcase link in the navbar to see the full set of Wingtip products.";
    constructor() { }
  }

  app.controller('homeController', HomeController);

  class ProductsController {
    static $inject: Array<string> = ['$location', 'ProductDataService'];
    products: Product[];
    productCategories: string[];
    // add constructor
    constructor(private $location: ng.ILocationService, private ProductDataService: IProductDataService) {
      this.products = ProductDataService.GetAllProducts();
      this.productCategories = ProductDataService.GetProductCategories();
    }
    // add delete user action
    deleteProduct(id: number) {
      this.ProductDataService.DeleteProduct(id);
      this.$location.path("/products");
    }
  }

  app.controller('productsController', ProductsController);

  class AddProductController {
    static $inject: Array<string> = ['$location', 'ProductDataService'];
    product: Product = new Product();
    productCategories: string[];
    constructor(private $location: ng.ILocationService, private ProductDataService: IProductDataService) {
      this.productCategories = ProductDataService.GetProductCategories();
    }
    addProduct() {
      this.ProductDataService.AddProduct(this.product);
      this.$location.path("/products");
    }
  }

  app.controller('addProductController', AddProductController);

  interface IProductRouteParams extends ng.route.IRouteParamsService {
    id: string;
  }

  class ViewProductController {
    static $inject: Array<string> = ['$routeParams', 'ProductDataService'];
    product: Product;
    constructor($routeParams: IProductRouteParams, ProductDataService: IProductDataService) {
      var id: number = parseInt($routeParams.id);
      this.product = ProductDataService.GetProduct(id);
    }
  }

  app.controller('viewProductController', ViewProductController);

  class EditProductController {
    static $inject: Array<string> = ['$routeParams', '$location', 'ProductDataService'];
    product: Product;
    productCategories: string[];
    constructor(private $routeParams: IProductRouteParams,
                private $location: ng.ILocationService,
                private ProductDataService: IProductDataService) {
      let id: number = parseInt($routeParams.id);
      this.product = ProductDataService.GetProduct(id);
      this.productCategories = ProductDataService.GetProductCategories();
    }
    updateProduct() {
      this.ProductDataService.UpdateProduct(this.product);
      this.$location.path("/products");
    }
  }

  app.controller('editProductController', EditProductController);

  class ProductShowcaseController {
    static $inject: Array<string> = [];
    constructor() { }
  }

  app.controller('productShowcaseController', ProductShowcaseController);
}
