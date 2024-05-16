import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateId } from "../../utils";
import { ICategory } from "../../mocks/categories";
import { categoryApi } from "../../gateways/CategoryApi";

interface SliceState {
  state: "loading" | "succeeded" | "failed";
  categories: ICategory[];
}
const initialState: SliceState = {
  state: "loading",
  categories: [],
};

const fetchCategories = createAsyncThunk(
  "categories/getAll",
  async (args, thunkAPI) => {
    return await categoryApi.getCategories();
  }
);

const categoriesSlice = createSlice({
  name: "productsSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.state = "succeeded";
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.pending, (state, action) => {
      state.state = "loading";
    });
  },
});

export { fetchCategories };
// Other exports from the slice
export const {
  /* other sync actions */
} = categoriesSlice.actions;
export default categoriesSlice.reducer;
