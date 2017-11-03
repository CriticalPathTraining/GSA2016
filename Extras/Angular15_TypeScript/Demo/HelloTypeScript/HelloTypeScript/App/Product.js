var myApp;
(function (myApp) {
    var Product = (function () {
        function Product(Id, Name, Category, ListPrice) {
            this.Id = Id;
            this.Name = Name;
            this.Category = Category;
            this.ListPrice = ListPrice;
            // no need to do anything here
        }
        return Product;
    }());
    myApp.Product = Product;
})(myApp || (myApp = {}));
//# sourceMappingURL=Product.js.map