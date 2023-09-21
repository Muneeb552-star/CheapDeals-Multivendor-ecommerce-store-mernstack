import { getNavList } from '../navigation/index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// Material UI Import.
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { useEffect, useState } from "react";


const Sidebar = () => {
  const { role } = useSelector(state => state.auth)
  const [navList, setNavList] = useState([])

  useEffect(() => {
    const filteredNavs = getNavList(role)
    setNavList(filteredNavs)
  }, [role])

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
        </List>
  )
}

export default Sidebar