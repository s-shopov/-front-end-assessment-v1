import React, { useEffect } from "react";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { getMultiSelected, repeat } from "../../../utils";
import { isCategoriesValid, isNameValid } from "./validators";
import { IProduct } from "mocks/products";
import { ICategory } from "mocks/categories";
import { RATING_THRESHOLD } from "@/store/features/productsSlice";

type Props = {
  onSave: (product: IProduct) => void;
  product?: IProduct;
  categories: ICategory[];
};

export const ProductForm: React.FC<Props> = ({
  onSave,
  product = {},
  categories,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IProduct>({
    defaultValues: {
      id: product.id || 0,
      name: product.name || "",
      brand: product.brand || "",
      rating: product.rating || 0,
      categories: product.categories || [],
      itemsInStock: product.itemsInStock || 0,
      receiptDate: product.receiptDate || "",
      expirationDate: product.expirationDate || "",
      featured: product.featured || false,
    },
  });

  useEffect(() => {
    if (product) {
      setValue("id", product.id || 0);
      setValue("name", product.name || "");
      setValue("brand", product.brand || "");
      setValue("rating", product.rating || 0);
      setValue("categories", product.categories || []);
      setValue("itemsInStock", product.itemsInStock || 0);
      setValue("receiptDate", product.receiptDate || "");
      setValue("expirationDate", product.expirationDate || "");
      setValue("featured", !!product.featured || false);
    }
  }, [product, setValue]);

  const onSubmit = (data: IProduct) => {
    onSave(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...register("name", { validate: isNameValid })}
              type="text"
              {...field}
              name="name"
              id="name"
              placeholder="Name"
              invalid={!!errors.name}
            />
          )}
        />
        {errors.name && (
          <FormFeedback>
            Name is required, the length must not be greater than 200
          </FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="brand">Brand</Label>
        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <Input
              {...register("brand")}
              type="text"
              {...field}
              name="brand"
              id="brand"
              placeholder="Brand"
            />
          )}
        />
      </FormGroup>
      <FormGroup>
        <Label for="rating">Rating</Label>
        <Controller
          name="rating"
          control={control}
          render={({ field }) => (
            <Input
              type="select"
              {...field}
              onChange={(e) => {
                setValue("rating", +e.target.value);
                setValue(
                  "featured",
                  +e.target.value > RATING_THRESHOLD ? true : false
                );
              }}
            >
              {repeat(11).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Input>
          )}
        />
      </FormGroup>
      <FormGroup>
        <Label for="categories">Categories</Label>
        <Controller
          name="categories"
          control={control}
          render={({ field }) => (
            <Input
              type="select"
              multiple
              {...field}
              value={field.value.map(String)}
              onChange={(e) => {
                const selectedValues = getMultiSelected(
                  e.target as unknown as HTMLSelectElement
                );
                field.onChange(selectedValues);
              }}
              invalid={!isCategoriesValid(field.value)}
            >
              {categories.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </Input>
          )}
        />
        {errors.categories && (
          <FormFeedback>
            A product must have from 1 to 5 categories
          </FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="itemsInStock">Items In Stock</Label>
        <Controller
          name="itemsInStock"
          control={control}
          render={({ field }) => (
            <Input
              {...register("itemsInStock", { valueAsNumber: true })}
              type="number"
              {...field}
              name="itemsInStock"
              id="itemsInStock"
            />
          )}
        />
      </FormGroup>
      <FormGroup>
        <Label for="expirationDate">Expiration date</Label>
        <Controller
          name="expirationDate"
          control={control}
          render={({ field }) => (
            <Input
              {...register("expirationDate")}
              type="date"
              {...field}
              value={field.value?.toString()}
              name="expirationDate"
              id="expirationDate"
            />
          )}
        />
        {errors.expirationDate && (
          <FormFeedback>
            If a product has an expiration date it must expire not less than 30
            days since now
          </FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label for="receiptDate">Receipt date</Label>
        <Controller
          name="receiptDate"
          control={control}
          render={({ field }) => (
            <Input
              {...register("receiptDate")}
              {...field}
              value={field.value?.toString()}
              type="date"
              name="receiptDate"
              id="receiptDate"
            />
          )}
        />
      </FormGroup>
      <FormGroup check>
        <Label check>
          <Controller
            name="featured"
            control={control}
            render={({ field }) => (
              <Input
                {...register("featured")}
                {...field}
                value={field.value.toString()} // Convert boolean to string
                type="checkbox"
                disabled={getValues().rating < 9}
                checked={!!field.value}
                name="featured"
              />
            )}
          />{" "}
          Featured
        </Label>
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};
