import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Product, { ProductType } from "../../components/Products/Product";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import dayjs from "dayjs";
import { longDateFormat, shortDateFormat } from "../../utils";

const mockProduct: ProductType = {
  id: 1,
  name: "Product 1",
  brand: "Brand 1",
  categories: [{ id: 1, name: "Category 1" }],
  createdAt: "2021-01-01T00:00:00.000Z",
  expirationDate: "2022-01-01T00:00:00.000Z",
  featured: true,
  itemsInStock: 10,
  rating: 5,
  receiptDate: "2021-01-02T00:00:00.000Z",
};

const mockOnDelete = jest.fn();

describe("Product Component", () => {
  it("renders product details correctly", () => {
    render(
      <Router>
        <Product product={mockProduct} onDelete={mockOnDelete} />
      </Router>
    );

    // Check if product name is displayed
    expect(screen.getByText("Product 1")).toBeInTheDocument();

    // Check if product brand is displayed
    expect(screen.getByTestId("brand")).toBeInTheDocument();
    expect(screen.getByTestId("brand")).toHaveTextContent(
      `Brand: ${mockProduct.brand}`
    );

    // Check if product rating is displayed
    expect(screen.getByTestId("rating")).toBeInTheDocument();
    expect(screen.getByTestId("rating")).toHaveTextContent(
      `Rating: ${mockProduct.rating}`
    );

    // Check if product featured status is displayed
    expect(screen.getByText("Featured: Yes")).toBeInTheDocument();

    // Check if product items in stock is displayed
    expect(screen.getByText("Items In Stock: 10")).toBeInTheDocument();

    // Check if product categories are displayed
    expect(screen.getByText("Categories:")).toBeInTheDocument();
    expect(screen.getByText("Category 1")).toBeInTheDocument();

    // Check if product receipt date is displayed
    expect(screen.getByTestId("receiptDate")).toBeInTheDocument();
    expect(screen.getByTestId("receiptDate")).toHaveTextContent(
      `Receipt Date: ${dayjs(mockProduct.receiptDate).format(shortDateFormat)}`
    );

    // Check if product expiration date is displayed
    expect(screen.getByTestId("expDate")).toBeInTheDocument();
    expect(screen.getByTestId("expDate")).toHaveTextContent(
      `Expiration Date: ${dayjs(mockProduct.expirationDate).format(
        shortDateFormat
      )}`
    );

    // Check if product created at date is displayed
    expect(screen.getByTestId("createdAt")).toBeInTheDocument();
    expect(screen.getByTestId("createdAt")).toHaveTextContent(
      `Created At: ${dayjs(mockProduct.createdAt).format(longDateFormat)}`
    );
  });

  it("handles delete button click", () => {
    render(
      <Router>
        <Product product={mockProduct} onDelete={mockOnDelete} />
      </Router>
    );

    // Click the delete button
    fireEvent.click(screen.getByRole("button", { name: /close/i }));

    // Check if onDelete function was called with the correct id
    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });
});
