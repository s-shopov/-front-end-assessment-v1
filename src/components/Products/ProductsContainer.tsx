import React, { Fragment } from "react";
import Header from "../Header/Header";
import ProductsList from "./ProductsList";
import { getProductsWithCategories } from "../../store/features/selectors";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteProduct } from "../../store/features/productsSlice";

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
