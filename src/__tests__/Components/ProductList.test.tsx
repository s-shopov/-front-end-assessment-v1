import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "../../components/Products/ProductsList";
import Product, { ProductType } from "../../components/Products/Product";

// Mock the Product component
jest.mock("../../components/Products/Product", () => ({
  __esModule: true,
  default: jest.fn(() => null), // Mocking Product component with a null component
}));

describe("ProductList", () => {
  it("renders products correctly", () => {
    // Define mock products data
    const products: ProductType[] = [
      {
        id: 1,
        name: "Product 1",
        brand: "",
        categories: [],
        createdAt: "",
        expirationDate: null,
        featured: false,
        itemsInStock: 0,
        rating: 0,
        receiptDate: null,
      },
      {
        id: 2,
        name: "Product 2",
        brand: "",
        categories: [],
        createdAt: "",
        expirationDate: null,
        featured: false,
        itemsInStock: 0,
        rating: 0,
        receiptDate: null,
      },
      {
        id: 3,
        name: "Product 3",
        brand: "",
        categories: [],
        createdAt: "",
        expirationDate: null,
        featured: false,
        itemsInStock: 0,
        rating: 0,
        receiptDate: null,
      },
    ];

    // Render ProductList component
    render(<ProductList products={products} onDelete={() => {}} />);

    // Access the mock implementation of the Product component
    const MockProduct = jest.requireMock(
      "../../components/Products/Product"
    ).default;
    expect(MockProduct).toHaveBeenCalledTimes(products.length);

    products.forEach((product) => {
      expect(MockProduct).toHaveBeenCalledWith(
        { product, onDelete: expect.any(Function) },
        {}
      );
    });
  });
});
