module myApp {

  export interface IProductDataService {
    GetAllProducts(): Product[];
    GetProduct(id: number): Product;
    AddProduct(product: Product): void;
    DeleteProduct(id: number): void;
    UpdateProduct(product: Product): void;
  }

}