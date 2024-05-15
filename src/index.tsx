import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { App } from "./App";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { store } from "./store/store";
import { fetchCategories } from "./store/features/categoriesSlice";
import { fetchProducts } from "./store/features/productsSlice";

const history = createBrowserHistory();

store.dispatch(fetchCategories());

store.dispatch(fetchProducts());
ReactDOM.render(
  <div className="content">
    <div className="container">
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    </div>
  </div>,
  document.getElementById("root")
);
