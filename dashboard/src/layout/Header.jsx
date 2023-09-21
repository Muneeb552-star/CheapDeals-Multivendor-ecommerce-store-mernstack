import { 
  AppBar, 
  Toolbar, 
  Typography, 
  styled, 
  InputBase, 
  Badge, 
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider
} from "@mui/material"
import ChatIcon from '@mui/icons-material/Message';
import MenuIcon from '@mui/icons-material/Menu';
import ProfileIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";


const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
})


const Search = styled("div")(({theme}) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  outline: '1px solid whitesmoke',
  width: "40%",
}))

const Icons = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '20px'
}))

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}))

const TextContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  textAlign: 'right'
});

const Header = ({ setSidebarVisible, sidebarVisible }) => {
  const [open, setOpen] = useState(false)


  return (
    <AppBar position="fixed" sx={{ color: '#ffffff', background: '#ed6c02' }}>
      <StyledToolbar>

        <MenuIcon sx={{ display: 'block', cursor: 'pointer'}} onClick={() => setSidebarVisible(!sidebarVisible)}/>
        {/* <Search><InputBase placeholder="Search..." sx={{ width: '100%' }} /></Search> */}

        <Icons>
          <Badge badgeContent={4} color="error"> <ChatIcon/> </Badge>

          <UserBox onClick={e => setOpen(true)}>
            <TextContainer sx={{cursor: 'pointer' }}>
              <Typography variant="subtitle2"> Muhammad</Typography>
              <Typography variant="span"> Seller </Typography>
            </TextContainer>
          
            <Avatar 
              alt="Remy Sharp" 
              sx={{ width: '30', height: '30', cursor: 'pointer' }} 
              src="https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
              onClick={e => setOpen(true)} 
            />
        </UserBox>

        </Icons>
      </StyledToolbar>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          minWidth = '180'
          onClose={e => setOpen(false)}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{ marginTop: '2.5rem' }}
        >
          <MenuItem sx={{ gap: '8px' }}>
            <ProfileIcon sx={{ width: 32, height: 32 }} />Profile
          </MenuItem>
          <MenuItem sx={{ gap: '10px' }}>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>My Account
          </MenuItem>

          <Divider />
          <MenuItem sx={{ gap: '10px' }}>
            <SettingsIcon sx={{ width: 32, height: 32 }} />Settings
          </MenuItem>
          <MenuItem sx={{ gap: '10px' }}>
            <LogoutIcon sx={{ width: 32, height: 32 }} />Logout
          </MenuItem>
        </Menu>
    </AppBar>
  )
}

export default Header