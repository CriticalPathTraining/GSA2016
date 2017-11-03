var myApp;
(function (myApp) {
    var MyProductDataService = (function () {
        function MyProductDataService() {
            this.products = [
                new myApp.Product(1, "Batman Action Figure", "Action Figures", 14.95),
                new myApp.Product(2, "Captain America Action Figure", "Action Figures", 12.95),
                new myApp.Product(3, "Easel with Supply Trays", "Arts and Crafts", 49.95),
                new myApp.Product(4, "Crate o' Crayons", "Arts and Crafts", 14.95),
                new myApp.Product(5, "Green Stomper Bully", "Remote Control", 24.95),
                new myApp.Product(6, "Indy Race Car", "Remote Control", 19.95),
                new myApp.Product(7, "Twitter Follower Action Figure", "Action Figures", 1.00),
                new myApp.Product(8, "Sandpiper Prop Plane", "Remote Control", 24.95),
                new myApp.Product(9, "Etch A Sketch", "Arts and Crafts", 12.95),
                new myApp.Product(10, "Flying Squirrel", "Remote Control", 69.95),
                new myApp.Product(11, "FOX News Chopper", "Remote Control", 29.95),
                new myApp.Product(12, "Godzilla Action Figure", "Action Figures", 19.95),
                new myApp.Product(13, "Perry the Platypus Action Figure", "Action Figures", 21.95),
                new myApp.Product(14, "Seal Team 6 Helicopter", "Remote Control", 59.95),
                new myApp.Product(15, "Crayloa Crayon Set", "Arts and Crafts", 2.45)
            ];
        }
        MyProductDataService.prototype.GetAllProducts = function () {
            return this.products;
        };
        ;
        MyProductDataService.prototype.GetProduct = function (id) {
            var products = this.products.filter(function (product) { return product.Id === id; });
            var product = products[0];
            return product;
        };
        ;
        MyProductDataService.prototype.AddProduct = function (product) {
            var Ids = this.products.map(function (p) { return p.Id; });
            var newId = Math.max.apply(Math, Ids) + 1;
            product.Id = newId;
            this.products.push(product);
        };
        ;
        MyProductDataService.prototype.DeleteProduct = function (id) {
            var index = this.products.map(function (product) { return product.Id; }).indexOf(id);
            this.products.splice(index, 1);
        };
        ;
        MyProductDataService.prototype.UpdateProduct = function (product) {
            var index = this.products.map(function (product) { return product.Id; }).indexOf(product.Id);
            this.products[index] = product;
        };
        ;
        return MyProductDataService;
    }());
    myApp.MyProductDataService = MyProductDataService;
})(myApp || (myApp = {}));
//# sourceMappingURL=MyProductDataService.js.map