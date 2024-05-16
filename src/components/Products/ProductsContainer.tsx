import React, { Fragment } from "react";
import ProductsList from "./ProductsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProductsWithCategories } from "@/store/features/selectors";
import { deleteProduct } from "@/store/features/productsSlice";
import Header from "../Header/Header";

const ProductsContainer: React.FC = () => {
  const products = useAppSelector(getProductsWithCategories);
  const dispatch = useAppDispatch();
  return (
    <Fragment>
      <Header name="Products" />
      <ProductsList
        products={products}
        onDelete={(id) => dispatch(deleteProduct(id))}
      />
    </Fragment>
  );
};
export default ProductsContainer;
