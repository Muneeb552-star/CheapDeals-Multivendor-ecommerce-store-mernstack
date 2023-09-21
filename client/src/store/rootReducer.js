import homeReducer from "./reducers/homeReducer"
import authReducer from "./reducers/authReducer"
import cartReducer from "./reducers/cartReducer"
import orderReducer from "./reducers/orderReducer"
import dashboardReducer from "./reducers/dashboardReducer"

const rootReducers = {
    home : homeReducer,
    auth : authReducer,
    cart : cartReducer,
    order : orderReducer,
    dashboard : dashboardReducer,
}
export default rootReducers