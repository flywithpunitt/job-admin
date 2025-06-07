import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/users';
import { baseApi } from 'src/services/base';
import userDetails from './slices/userDetails';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

// const productPersistConfig = {
//   key: 'product',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['sortBy', 'checkout'],
// };

const rootReducer = combineReducers({
  // kanban: kanbanReducer,
  // product: persistReducer(productPersistConfig, productReducer),
  user: userReducer,
  userDetailsSlice: userDetails,
  [baseApi.reducerPath]: baseApi.reducer,
});

export { rootPersistConfig, rootReducer };
