import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import categoriesSlice from "./categoriesSlice";
import { ICategory } from "../../mocks/categories";

export const categoriesSelector = (state: RootState) => state.categories;
export const productsSelector = (state: RootState) => state.products;

export const getProducts = createSelector(
  productsSelector,
  (state) => state.products
);

export const getCategories = createSelector(
  categoriesSelector,
  (state) => state.categories
);
export const getProductById = createSelector(
  [productsSelector, (state, productId) => productId],
  (products, productId) =>
    products.products.find((product) => product.id === productId)
);

export const getCategoriesById = createSelector(categoriesSelector, (state) =>
  state.categories.reduce(
    (acc, category) => ({
      ...acc,
      [category.id]: category,
    }),
    {}
  )
);
export const getProductsWithCategories = createSelector(
  [productsSelector, getCategoriesById],
  (products, categoriesById: { [key: number]: ICategory }) =>
    products.products.map((product) => ({
      ...product,
      categories: product.categories.map(
        (categoryId) => categoriesById[categoryId]
      ),
    }))
);
