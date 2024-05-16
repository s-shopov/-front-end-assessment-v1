import React from "react";
import Product, { ProductType } from "./Product";
import { Container, Row, Col } from "reactstrap";

type ProductListProps = {
  products: ProductType[];
  onDelete: (id: number) => void;
};
const ProductList: React.FC<ProductListProps> = ({ products, onDelete }) => {
  return (
    <Container>
      <Row className="mb-5">
        {products.map((product) => (
          <Col sm="4" key={product.id} className="mb-4">
            <Product product={product} onDelete={onDelete} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
