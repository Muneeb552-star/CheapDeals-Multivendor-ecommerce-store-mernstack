import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SettingsIcon from '@mui/icons-material/SettingsInputSvideoOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
// Seller Dashboard Icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ChatIcon from '@mui/icons-material/Chat';
import HeadsetIcon from '@mui/icons-material/Headset';
import PersonIcon from '@mui/icons-material/Person';


export const navList = [
    {
        id : 1,
        title : 'Dashboard',
        icon : <HomeIcon/>,
        role : 'admin',
        path : '/admin/dashboard'
    },
    {
        id : 2,
        title : 'Orders',
        icon : <ShoppingCartOutlinedIcon/>,
        role : 'admin',
        path : '/admin/dashboard/orders'
    },
    {
        id : 3,
        title : 'Category',
        icon : <DashboardIcon/>,
        role : 'admin',
        path : '/admin/dashboard/category'
    },
    {
        id : 4,
        title : 'Sellers',
        icon : <PeopleAltOutlinedIcon/>,
        role : 'admin',
        path : '/admin/dashboard/sellers'
    },
    {
        id : 5,
        title : 'Payment Request',
        icon : <MonetizationOnOutlinedIcon/>,
        role : 'admin',
        path : '/admin/dashboard/payment-request'
    },
    {
        id : 6,
        title : 'Deactive Sellers',
        icon : <PeopleAltOutlinedIcon/>,
        role : 'admin',
        path : '/admin/dashboard/deactive-sellers'
    },
    {
        id : 7,
        title : 'Sellers Request',
        icon : <SettingsIcon/>,
        role : 'admin',
        path : '/admin/dashboard/sellers-request'
    },
    {
        id : 8,
        title : 'Chat Seller',
        icon : <ChatOutlinedIcon/>,
        role : 'admin',
        path : '/admin/dashboard/chat-seller'
    },

    // Seller Navigation Starts here
    {
        id : 9,
        title : 'Dashboard',
        icon : <DashboardIcon/>,
        role : 'seller',
        path : '/seller/dashboard'
    },
    {
        id : 10,
        title : 'Add Product',
        icon : <AddShoppingCartIcon/>,
        role : 'seller',
        path : '/seller/dashboard/add-product'
    },
    {
        id : 11,
        title : 'All Products',
        icon : <ViewModuleIcon />,
        role : 'seller',
        path : '/seller/dashboard/products'
    },
    {
        id : 12,
        title : 'Discount Product',
        icon : <LocalOfferIcon />,
        role : 'seller',
        path : '/seller/dashboard/discount-products'
    },
    {
        id : 13,
        title : 'Orders',
        icon : <ShoppingBasketIcon />,
        role : 'seller',
        path : '/seller/dashboard/orders'
    },
    {
        id : 14,
        title : 'Payments',
        icon : <CreditCardIcon />,
        role : 'seller',
        path : '/seller/dashboard/payments'
    },
    {
        id : 15,
        title : 'Chat Customer',
        icon : <ChatIcon />,
        role : 'seller',
        path : '/seller/dashboard/chat-customer'
    },
    {
        id : 16,
        title : 'Chat Support',
        icon : <HeadsetIcon />,
        role : 'seller',
        path : '/seller/dashboard/chat-support'
    },
    {
        id : 17,
        title : 'Profile',
        icon : <PersonIcon />,
        role : 'seller',
        path : '/seller/dashboard/profile'
    }
]