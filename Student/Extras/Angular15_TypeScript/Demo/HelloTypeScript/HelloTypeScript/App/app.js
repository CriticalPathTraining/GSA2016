var myApp;
(function (myApp) {
    $(function () {
        $("#cmd1").click(function () {
            var contentBox = $("#content-box");
            contentBox
                .empty()
                .append($("<h1>").text("Welcome to TypeScript"))
                .append($("<p>").text("We've been waiting fro you to join us. It's time to get started."));
        });
        $("#cmd2").click(function () {
            // define strongly-typed function
            var myFunction = function (param1) {
                return "You passed " + param1;
            };
            // define strongly-typed variables
            var myNumber = 2017;
            var myMessage = myFunction(myNumber);
            var myContent = $("<p>").text(myMessage);
            var contentBox = $("#content-box");
            contentBox.empty().append(myContent);
        });
        $("#cmd3").click(function () {
            var x = 2016;
            var y = 2016;
            {
                var x = 2017;
                var y_1 = 2017;
            }
            var message = "x=" + x + " and " + "y=" + y;
            var contentBox = $("#content-box");
            contentBox.empty()
                .append($("<h2>").text("Page 3"))
                .append($("<p>").text(message));
        });
        $("#cmd4").click(function () {
            // define function with a parameter array using (...) syntax
            function createOrderedList() {
                var names = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    names[_i] = arguments[_i];
                }
                var html = "<ol>";
                for (var index = 0; index < names.length; index++) {
                    html += "<li>" + names[index] + "</li>";
                }
                return html += "</ol>";
            }
            ;
            // create a string array
            var stooges = ["Moe", "Curly", "Larry"];
            // call function with a parameter array
            var stoogesList = createOrderedList.apply(void 0, stooges);
            var contentBox = $("#content-box");
            contentBox.empty()
                .append($("<h2>").text("Page 4"))
                .append($("<div>").html(stoogesList));
        });
        $("#cmd5").click(function () {
            // create anonymous function using function arrow sytax
            var myFunction = function () {
                console.log("Hello world");
            };
            // use function arrow sytax with typed parameters
            var myOtherFunction = function (param1, param2) {
                return param1 + " - " + param2;
            };
            // create function to assign to DOM event
            window.onresize = function (event) {
                var window = event.target;
                console.log("Window width: " + window.outerWidth);
                console.log("Window height: " + window.outerHeight);
            };
            var contentBox = $("#content-box");
            contentBox.empty()
                .append($("<h2>").text("Page 5"))
                .append($("<p>").text(myOtherFunction(2017, "What a great year this is going to be...")));
        });
        $("#cmd6").click(function () {
            // create new Product instance
            var product1 = new myApp.Product(1, "Batman Action Figure", "Action Figure", 14.95);
            // access public properties
            var product1Name = product1.Name;
            var product1Category = product1.Category;
            var contentBox = $("#content-box");
            contentBox.empty()
                .append($("<h2>").text("Page 6"))
                .append($("<p>").text("Product: " + product1.Name));
        });
        $("#cmd7").click(function () {
            // program against variables based on interface type
            var productService = new myApp.MyProductDataService();
            // clioent code is decoupled from underlying data access class implementations
            var products = productService.GetAllProducts();
            var product1 = productService.GetProduct(1);
            var contentBox = $("#content-box");
            contentBox.empty()
                .append($("<h2>").text("Page 7"))
                .append($("<p>").text("This is where you want to be."));
        });
        $("#cmd8").click(function () {
            var contentBox = $("#content-box");
            contentBox.empty()
                .append($("<h2>").text("Page 8"))
                .append($("<p>").text("This is where you want to be."));
        });
    });
})(myApp || (myApp = {}));
//# sourceMappingURL=app.js.map