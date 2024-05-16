import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsSlice from "./features/productsSlice";
import categoriesSlice from "./features/categoriesSlice";
// ...

const reducers = {
  products: productsSlice,
  categories: categoriesSlice,
};
const reducer = combineReducers(reducers);

export const store = configureStore({
  devTools: true,
  reducer,
});
//     reducer,
//     // middleware: () => console.log(1),
//   });
// };

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
