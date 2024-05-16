import React, { Fragment } from "react";
import ProductsList from "./ProductsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  getProductsWithCategories,
  isLoading,
} from "@/store/features/selectors";
import { deleteProduct } from "@/store/features/productsSlice";
import Header from "../Header/Header";
import { Spinner } from "reactstrap";

const ProductsContainer: React.FC = () => {
  const products = useAppSelector(getProductsWithCategories);
  const { loading } = useAppSelector(isLoading);
  const dispatch = useAppDispatch();
  return (
    <Fragment>
      <Header name="Products" />
      {loading === "loading" && (
        <div className="loading-overlay">
          <Spinner />
        </div>
      )}
      <ProductsList
        products={products}
        onDelete={(id) => dispatch(deleteProduct(id))}
      />
    </Fragment>
  );
};
export default ProductsContainer;
