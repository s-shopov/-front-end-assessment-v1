import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ProductForm } from "../Update/ProductForm";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCategories } from "../../../store/features/selectors";
import { addProduct } from "../../../store/features/productsSlice";

const AddFormContainer: React.FC = () => {
  const categories = useAppSelector(getCategories);

  const history = useHistory();

  const dispatch = useAppDispatch();
  return (
    <>
      <Link to="/">Home</Link>
      <ProductForm
        onSave={(data) => {
          dispatch(addProduct(data));
          history.push("/");
        }}
        categories={categories}
      />
    </>
  );
};

export default AddFormContainer;
