import products from "../mocks/products";

class ProductApi {
  getProducts() {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(products);
      }, 2000); // Simulate 2 second delay
    });
  }
}

export const productApi = new ProductApi();
