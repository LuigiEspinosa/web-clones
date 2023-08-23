import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import userReducer from './features/userSlide';

const storeOptions: ConfigureStoreOptions = {
  reducer: {
    user: userReducer,
  },
};

export default configureStore(storeOptions);
