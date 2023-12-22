import { getNavList } from '../navigation/index'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/Slices/authSlice'; 

// Material UI Import.
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';



const Sidebar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { role } = useSelector(state => state.auth)
  const [navList, setNavList] = useState([])

  useEffect(() => {
    const filteredNavs = getNavList(role)
    setNavList(filteredNavs)
  }, [role])


  const handleLogout = () => {
    if (navigate) {
      dispatch(logout({ navigate, role }));
    } else {
      console.error("Navigate function is not available.");
    }
  };

  // console.log(navList)

  return (

        <List>
          {
            navList.map((list, i) => (
              <ListItem disablePadding key={i}>
                <ListItemButton component = {Link} to={list.path}>
                  <ListItemIcon style={{ color: 'white' }}>
                    {list.icon}
                  </ListItemIcon>
                <ListItemText primary={list.title} />
                </ListItemButton>
              </ListItem>
            ))    
          }

          <ListItem disablePadding onClick={handleLogout}>
            <ListItemButton component = {Link}>
              <ListItemIcon style={{ color: 'white' }}>
                    < ExitToAppIcon />
                </ListItemIcon>
              <ListItemText primary="logout" />
            </ListItemButton>
          </ListItem>
        </List>
  )
}

export default Sidebar