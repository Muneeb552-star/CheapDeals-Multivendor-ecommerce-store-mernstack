import authReducer from "./Slices/authSlice";
import categoryReducer from "./Slices/categorySlice";
import productReducer from "./Slices/productSlice";
import sellerReducer from "./Slices/sellerSlice";

const rootReducer = {
    auth : authReducer,
    category : categoryReducer,
    product : productReducer,
    seller : sellerReducer
}

export default rootReducer