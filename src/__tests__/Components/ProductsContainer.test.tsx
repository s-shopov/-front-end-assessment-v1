import { render } from "@testing-library/react";
import ProductsContainer from "../../components/Products/ProductsContainer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { RootState } from "../../store/store";
import * as selectors from "../../store/features/selectors";
import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureStore<RootState>();

describe("ProductsContainer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders products and header correctly", () => {
    jest.spyOn(selectors, "getProductsWithCategories").mockReturnValueOnce([
      {
        id: 1,
        name: "Product 1",
        categories: [],
        rating: 0,
        featured: false,
        itemsInStock: 0,
        receiptDate: null,
        brand: "",
        expirationDate: null,
        createdAt: "",
      },
      {
        id: 2,
        name: "Product 2",
        categories: [],
        rating: 0,
        featured: false,
        itemsInStock: 0,
        receiptDate: null,
        brand: "",
        expirationDate: null,
        createdAt: "",
      },
    ]);
    jest
      .spyOn(selectors, "isLoading")
      .mockReturnValueOnce({ loading: "loading" });

    const store = mockStore({
      products: {
        products: [],
        state: "loading",
      },
      categories: {
        categories: [],
        state: "loading",
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <ProductsContainer />
        </Router>
      </Provider>
    );
  });
});
