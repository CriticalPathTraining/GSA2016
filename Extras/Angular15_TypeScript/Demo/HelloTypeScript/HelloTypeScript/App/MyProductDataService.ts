module myApp {

  export class MyProductDataService implements IProductDataService {

    private products: Product[] = [
      new Product(1, "Batman Action Figure", "Action Figures", 14.95),
      new Product(2, "Captain America Action Figure", "Action Figures", 12.95),
      new Product(3, "Easel with Supply Trays", "Arts and Crafts", 49.95),
      new Product(4, "Crate o' Crayons", "Arts and Crafts", 14.95),
      new Product(5, "Green Stomper Bully", "Remote Control", 24.95),
      new Product(6, "Indy Race Car", "Remote Control", 19.95),
      new Product(7, "Twitter Follower Action Figure", "Action Figures", 1.00),
      new Product(8, "Sandpiper Prop Plane", "Remote Control", 24.95),
      new Product(9, "Etch A Sketch", "Arts and Crafts", 12.95),
      new Product(10, "Flying Squirrel", "Remote Control", 69.95),
      new Product(11, "FOX News Chopper", "Remote Control", 29.95),
      new Product(12, "Godzilla Action Figure", "Action Figures", 19.95),
      new Product(13, "Perry the Platypus Action Figure", "Action Figures", 21.95),
      new Product(14, "Seal Team 6 Helicopter", "Remote Control", 59.95),
      new Product(15, "Crayloa Crayon Set", "Arts and Crafts", 2.45)
    ];
    
    GetAllProducts(): Product[] {
      return this.products;
    };

    GetProduct(id: number): Product {
      let products: Product[] = this.products.filter(product => product.Id === id);
      let product: Product = products[0];
      return product;
    };

    AddProduct(product: Product): void {
      let Ids: number[] = this.products.map(p => p.Id);
      let newId = Math.max(...Ids) + 1;
      product.Id = newId;
      this.products.push(product);
    };

    DeleteProduct(id: number): void {
      let index = this.products.map(product => product.Id).indexOf(id);
      this.products.splice(index, 1);
    };

    UpdateProduct(product: Product): void {
      let index = this.products.map(product => product.Id).indexOf(product.Id);
      this.products[index] = product;
    };
  }
}




