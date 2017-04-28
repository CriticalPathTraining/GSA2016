module myApp {

  $(function () {

    $("#cmd1").click(() => {
      let contentBox: JQuery = $("#content-box");
      contentBox
        .empty()
        .append($("<h1>").text("Welcome to TypeScript"))
        .append($("<p>").text("We've been waiting fro you to join us. It's time to get started."));
    });

    $("#cmd2").click(() => {

      // define strongly-typed function
      var myFunction = function (param1: number): string {
        return "You passed " + param1;
      };

      // define strongly-typed variables
      var myNumber: number = 2017;
      var myMessage: string = myFunction(myNumber);
      var myContent: JQuery = $("<p>").text(myMessage);
      var contentBox: JQuery = $("#content-box");

      contentBox.empty().append(myContent);

    });

    $("#cmd3").click(() => {

      var x: number = 2016;
      let y: number = 2016;

      {
        var x: number = 2017;
        let y: number = 2017;
      }

      let message = "x=" + x + " and " + "y=" + y;

      let contentBox: JQuery = $("#content-box");
      contentBox.empty()
        .append($("<h2>").text("Page 3"))
        .append($("<p>").text(message));
    });

    $("#cmd4").click(() => {

      // define function with a parameter array using (...) syntax
      function createOrderedList(...names: string[]): string{
        let html: string = "<ol>";
        for (let index: number = 0; index < names.length; index++) {
          html += "<li>" + names[index] + "</li>"
        }
        return html += "</ol>";
      };

      // create a string array
      let stooges: string[] = ["Moe", "Curly", "Larry"];

      // call function with a parameter array
      let stoogesList: string = createOrderedList(...stooges);

      let contentBox: JQuery = $("#content-box");
      contentBox.empty()
        .append($("<h2>").text("Page 4"))
        .append($("<div>").html(stoogesList));
    });

    $("#cmd5").click(() => {

      // create anonymous function using function arrow sytax
      let myFunction = () => {
        console.log("Hello world");
      };

      // use function arrow sytax with typed parameters
      let myOtherFunction = (param1: number, param2: string) : string => {
        return param1 + " - " + param2;
      };

      // create function to assign to DOM event
      window.onresize = (event: Event) => {
        let window: Window = event.target as Window;
        console.log("Window width: " + window.outerWidth);
        console.log("Window height: " + window.outerHeight);
      };



      let contentBox: JQuery = $("#content-box");
      contentBox.empty()
        .append($("<h2>").text("Page 5"))
        .append($("<p>").text(myOtherFunction(2017, "What a great year this is going to be...")));
    });

    $("#cmd6").click(() => {

      // create new Product instance
      let product1: Product = new Product(1, "Batman Action Figure", "Action Figure", 14.95);

      // access public properties
      let product1Name: string = product1.Name;
      let product1Category: string = product1.Category;
      
      let contentBox: JQuery = $("#content-box");
      contentBox.empty()
        .append($("<h2>").text("Page 6"))
        .append($("<p>").text("Product: " + product1.Name));
    });

    $("#cmd7").click(() => {

      // program against variables based on interface type
      let productService: IProductDataService = new MyProductDataService();

      // clioent code is decoupled from underlying data access class implementations
      let products: Product[] = productService.GetAllProducts();
      let product1: Product = productService.GetProduct(1);
      

      let contentBox: JQuery = $("#content-box");
      contentBox.empty()
        .append($("<h2>").text("Page 7"))
        .append($("<p>").text("This is where you want to be."));
    });
    $("#cmd8").click(() => {
      let contentBox: JQuery = $("#content-box");
      contentBox.empty()
        .append($("<h2>").text("Page 8"))
        .append($("<p>").text("This is where you want to be."));
    });

  });

}

