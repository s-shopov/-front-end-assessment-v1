import React from "react";
import Product, { ProductType } from "./Product";
import { Container, Row, Col } from "reactstrap";
import { chunk } from "lodash";

type ProductListProps = {
  products: ProductType[];
  onDelete: (id: number) => void;
};
const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  const productsGroups = chunk(products, 3);

  return (
    <Container>
      {productsGroups.map((productsGroup, index) => (
        <Row key={index} className="mb-5">
          {productsGroup.map((product) => (
            <Col sm="4" key={product.id}>
              <Product product={product} onDelete={onDelete} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default ProductList;
