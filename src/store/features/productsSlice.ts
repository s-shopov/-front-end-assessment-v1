import {
  PayloadAction,
  Slice,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { IProduct } from "../../mocks/products";
import { productApi } from "../../gateways/ProductApi";
import path from "path";
import { generateId } from "../../utils";

export type Loading = "loading" | "succeeded" | "failed";
interface SliceState {
  state: Loading;
  products: IProduct[];
}
const initialState: SliceState = {
  state: "loading",
  products: [],
};

const fetchProducts = createAsyncThunk(
  "products/getAll",
  async (args, thunkAPI) => {
    return await productApi.getProducts();
  }
);
export const isFeatured = ({
  rating,
  featured,
}: {
  rating: number;
  featured: boolean;
}) => rating > 8 || featured;

const productsSlice = createSlice({
  name: "productsSlice",
  initialState: initialState,
  reducers: {
    deleteProduct(state, { payload }: PayloadAction<number>) {
      return {
        ...state,
        products: state.products.filter((item) => item.id !== payload),
      };
    },
    updateProduct(state, { payload }: PayloadAction<IProduct>) {
      const index = state.products.findIndex((item) => item.id === payload.id);
      if (index === -1) {
        // Product not found, return the original state
        return state;
      }

      const updatedProduct = {
        ...state.products[index],
        ...payload,
        featured: isFeatured({
          featured: payload.featured ?? false,
          rating: payload.rating ?? 0,
        }),
      };

      const updatedProducts = [...state.products];
      updatedProducts[index] = updatedProduct;

      return {
        ...state,
        products: updatedProducts,
      };
    },
    addProduct(state, { payload }: PayloadAction<IProduct>) {
      return {
        ...state,
        products: state.products.concat([
          {
            ...payload,
            id: generateId(1000),
            featured: isFeatured({
              featured: payload.featured ?? false,
              rating: payload.rating ?? 0,
            }),
            createdAt: new Date().toDateString(), // TODO check this and unify
          },
        ]),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = [...action.payload];
      state.state = "succeeded";
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.state = "loading";
    });
  },
});

export { fetchProducts };
// Other exports from the slice
export const {
  /* other sync actions */
} = productsSlice.actions;
export default productsSlice.reducer;
export const { deleteProduct, updateProduct, addProduct } =
  productsSlice.actions;
