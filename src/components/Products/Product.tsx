import React from "react";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { IProduct } from "mocks/products";
import { ICategory } from "mocks/categories";
import { longDateFormat, shortDateFormat } from "../../utils";
export type ProductType = Omit<IProduct, "categories"> & {
  categories: ICategory[];
};
type Props = {
  product: ProductType;
  onDelete: (id: number) => void;
};
const Product: React.FC<Props> = ({ product, onDelete }) => {
  const receiptDate = product.receiptDate
    ? dayjs(product.receiptDate).format(shortDateFormat)
    : "-";
  const expirationDate = product.expirationDate
    ? dayjs(product.expirationDate).format(shortDateFormat)
    : "-";
  const createdAt = product.createdAt
    ? dayjs(product.createdAt).format(longDateFormat)
    : "-";

  return (
    <Card>
      <CardBody>
        <CardTitle>
          <Link to={`/edit/${product.id}`}>{product.name}</Link>
          <Button close onClick={() => onDelete(product.id)} />
        </CardTitle>
        <CardText tag="div">
          <ListGroup>
            <ListGroupItem data-testid={"brand"}>
              Brand: {product.brand}
            </ListGroupItem>
            <ListGroupItem data-testid={"rating"}>
              Rating: {product.rating}
            </ListGroupItem>
            <ListGroupItem>
              Featured: {product.featured ? "Yes" : "No"}
            </ListGroupItem>
            <ListGroupItem>
              Items In Stock: {product.itemsInStock}
            </ListGroupItem>
            <ListGroupItem>
              Categories:
              <ul>
                {product.categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </ListGroupItem>
            <ListGroupItem data-testid={"receiptDate"}>
              Receipt Date: {receiptDate}
            </ListGroupItem>
            <ListGroupItem data-testid={"expDate"}>
              Expiration Date: {expirationDate}
            </ListGroupItem>
            <ListGroupItem data-testid={"createdAt"}>
              Created At: {createdAt}
            </ListGroupItem>
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
  );
};

// Product.propTypes = {
//     product: PropTypes.object.isRequired,
//     onDelete: PropTypes.func.isRequired,
// };

export default Product;
