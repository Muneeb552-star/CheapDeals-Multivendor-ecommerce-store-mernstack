// React imports
import { useState } from "react"

// MUI Imports
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  Grid, 
  styled,
  TextField ,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Fab
} from "@mui/material"
import { makeStyles } from '@mui/styles';
import SendIcon from '@mui/icons-material/Send'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const SendMessageBox = styled(Box)({
    position: 'absolute', 
    bottom: '0', 
    left: '0', 
    right: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    boxShadow:  1
})

const CloseIconBox = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    marginBottom: '1rem',
    [theme.breakpoints.between('lg', 'xl')]: {
        display: 'none',
    },
}));

/* Custom style for Chat Message Area */
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '85vh',
    position: 'relative',
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '60vh',
    overflowY: 'auto'
  }
});

const ChatSeller = () => {
  const [ show, setShow ] = useState(false)

  const sellerId = 20
  const classes = useStyles();

  return (
    <Box>
      <div>
        <Grid container sx={{ marginBottom: '1rem' }}>
            <Grid item xs={12}>
                <Paper sx={{ padding: ".5rem" }} elevation={2}>
                    <Typography variant="h5">Chat Sellers</Typography>
                </Paper>
            </Grid>
        </Grid>

        <Grid container component={Paper} className={classes.chatSection}>

            {/* Chat Section Starts Here */}
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3} 
                sx={{ display: { 
                    xs: show ? 'block' : 'none', 
                    sm: show ? 'block' : 'none', 
                    md: show ? 'block' : 'none', 
                    lg: 'block',
                    xl: 'block',
                }, }} 
                className={classes.borderRight500}>

                <CloseIconBox><CloseIcon fontSize="large" onClick = {() => setShow(!show)}/></CloseIconBox>
                
                <List sx={{ marginTop: '2rem' }}>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="John Wick"></ListItemText>
                    </ListItem>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Alice">Alice</ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
                    </ListItem>
                </List>
            </Grid>

            {/* Message Area Top Bar  */}
            <Grid item xs={12} sm={12} md={12} lg={9} xl={9} sx={{ 
                position: 'relative', 
                display: { 
                    xs: !show ? 'block' : 'none', 
                    sm: !show ? 'block' : 'none',
                    md: !show ? 'block' : 'none',
                }, }}
            >
                {
                    sellerId && <List sx={{ color: 'white', background: '#ed6c02', opacity: '0.9' }}>
                    <ListItem button key="RemySharp" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                       <Box sx={{ display: 'flex' }}>
                            <ListItemIcon>
                                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary="John Wick" secondary="online" ></ListItemText>
                       </Box>
                       <Box>
                            <MenuIcon sx={{ display: 'block', cursor: 'pointer'}} onClick = {() => setShow(!show)} />
                       </Box>
                    </ListItem>
                </List>
                }

                {/* Message Area Starts Here */}
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="09:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Hey, I am Good! What about you ?"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="4">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="5">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Cool. i am good, let's catch up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="6">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Cool. i am good, let's catch ooooo!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="7">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left" primary="Cool. i am good, let's catch ooooo!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>

                {/* Send Message Input */}
                <SendMessageBox component={Paper}>
                    <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    <Fab size="medium" color="primary" aria-label="add" sx={{ marginLeft: '10px' }}><SendIcon /></Fab>
                </SendMessageBox>         
            </Grid>
            
        </Grid>
      </div>
    </Box>
  )
}

export default ChatSeller
