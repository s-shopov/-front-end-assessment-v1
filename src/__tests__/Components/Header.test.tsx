import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Header from "../../components/Header/Header";
describe("Header", () => {
  it("renders the header with the given name", () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header name="Test Product" />
      </MemoryRouter>
    );

    // Check if the header name is rendered correctly
    expect(getByText("Test Product")).toBeInTheDocument();
  });

  it('renders the "Add product" link', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Header name="Test Product" />
      </MemoryRouter>
    );

    // Check if the "Add product" link is rendered correctly
    const addProductLink = getByText("Add product");
    expect(addProductLink).toBeInTheDocument();
    expect(addProductLink).toHaveAttribute("href", "/add");
  });
});
