import React from "react";
import { connect } from "react-redux";
import { ProductForm } from "./ProductForm";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCategories, getProductById } from "@/store/features/selectors";
import { updateProduct } from "@/store/features/productsSlice";

type Props = {
  productId: number;
};
const UpdateFormContainer: React.FC<Props> = ({ productId }) => {
  const product = useAppSelector((state) => getProductById(state, productId));
  const categories = useAppSelector(getCategories);
  const history = useHistory();
  if (!product) {
    history.push("/404"); // will redirect to * notFound
    return null;
  }

  const dispatch = useAppDispatch();
  return (
    <>
      <Link to="/">Home</Link>
      <ProductForm
        onSave={(data) => {
          dispatch(updateProduct(data));
          history.push("/");
        }}
        product={product}
        categories={categories}
      />
    </>
  );
};

// UpdateFormContainer.propTypes = {
//     product: PropTypes.object,
//     categories: PropTypes.array,
//     history: PropTypes.object,
// };

// const mapStateToProps = (state, { productId }) => ({
//   product: getProductById(state, productId),
//   categories: state.categories,
// });

export default UpdateFormContainer;
