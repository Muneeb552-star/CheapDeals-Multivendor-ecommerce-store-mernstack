import { personImage } from "../../utils/images";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { profile_image_upload, update_profile, clearMessage } from '../../store/Slices/authSlice'
import { toast } from 'react-hot-toast';

// MUI Imports
import { Container, Box, Paper, Typography, Grid, Button, Modal, TextField, CircularProgress  } from "@mui/material"
import { makeStyles } from '@mui/styles';
import { styled } from "@mui/material/styles";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CloseIcon from '@mui/icons-material/Close';

const TextFieldWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.between('xs', 'md')]: {
    display: 'block'
  }
  
}))

/* Custom styles */
const useStyles = makeStyles({
  uploadImage: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '120px', 
    height: '120px', 
    margin: '-1rem 0 .5rem 1rem',
    cursor: 'pointer',
    border: '1px dashed #C0C0C0',
    borderRadius: '5px',
    background: '#F5F5F5',
  },
  imageLabel: {
    position: 'relative', 
    width: '120px', 
    height: '120px', 
    margin: '-1rem 0 .5rem 1rem'
  },
  personImage: {
    display: 'block',  
    width: '100%', 
    height: '100%',
    borderRadius: '8%',
    border: '5px solid white',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    zIndex: '1'
  },
  styledLoader: {
    background: 'grey', 
    position: 'absolute', 
    left: '0', 
    top: '0', 
    width: '100%',
    height: '100%',
    opacity: '.6',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '20',
  },
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    background: '#ffffff',
    borderRadius: '8px',
    boxShadow: 24,
    padding: '2rem',
  },
  closeModalIcon: {
    position: 'absolute', 
    top: '10px', 
    right: '10px', 
    cursor: 'pointer'
  }

});

const Profile = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { userInfo, successMessage, errorMessage, loader } = useSelector(state => state.auth)

  const image = true

  const [open, setOpen] = useState(false)
  const [state, setState] = useState({ shopName: '', address: '', phone: '' })

  /*
    This Function will set the form input values in state variable.
  */
  const handleInput = (e) => { setState({ ...state, [e.target.name]: e.target.value }) }

  /*
    This Function will set the MUI modal state 'open' to true and false.
  */
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /*
    This Function will add and update the seler image.
  */
  const add_image = (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      dispatch(profile_image_upload(formData))
    }
  }

  /*
    This Function is used to handle form submission.
  */
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(update_profile(state))
  }

  /* 
    This useEffect hook will handle the error and success message toast. 
  */
    useEffect(() => {
      if(errorMessage) {
        toast.error(errorMessage)
        dispatch(clearMessage());
      }
  
      if(successMessage) {
        toast.success(successMessage)
        dispatch(clearMessage());
        setState({ 
            shopName: '', 
            address: '', 
            phone: '' 
          })
        setOpen(false) // Close the modal here
      }
    }, [errorMessage, successMessage, dispatch])

  return (
    <Container>
      <Grid container spacing={2} sx={{ position: 'relative' }}>

        <Grid item xs={12}>
          <Paper sx={{ padding: ".5rem" }} elevation={2}>
              <Typography variant="h5">Seller Detail</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>  
          <Paper elevation={2}>
            {/* Two Wrapper Division Box. 1st Wrap Box */}
            <Box sx={{ height: '15vh', background: '#28c76f1f'}}></Box>  {/* 1st Wrap Box */}
              {/* 2nd Wrap Box */}
              <Box sx={{ display:"flex", flexDirection:'row', background: '#28c76f1f'}}>
                {
                  image ? <label htmlFor="img" className={classes.imageLabel}>
                            <img src={personImage} alt="seller" className={classes.personImage}/>
                            { loader && <Box className={classes.styledLoader}>
                                <CircularProgress color="inherit" size="1.5em"/>
                              </Box> }
                           </label> 

                         :  <Box component='label' htmlFor="img" className={classes.uploadImage}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <span><ImageOutlinedIcon/></span>
                              <Typography variant='subtitle2' color='primary'>Browse Images</Typography>
                              { loader && <Box className={classes.styledLoader}><span>Loading...</span></Box> }
                            </Box>
                          </Box> 
                }
                  <Box  pb={1} sx={{ display:"flex", flexDirection:'column', margin: '1rem'}}>
                    <Typography variant="h6">Muhammad Muneeb</Typography>
                    <Typography variant="subtitle2">Shop:<span style={{ color: '#ed6c02' }}> Adidas</span></Typography>
                  </Box>
                  <input onChange={add_image} type="file" id="img" style={{  opacity: '1', width: '0' }} required />
              </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper elevation={2} sx={{ padding: "1rem", minHeight: '220px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Basic Info</Typography>
              <Button variant="contained" color="warning" onClick={handleOpen}> Edit </Button>
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2" lineHeight={2}>Name : {userInfo.name}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Email : {userInfo.email}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Role : {userInfo.role}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Status : {userInfo.status}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Payment Account : {userInfo.payment}</Typography>
              
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper elevation={2} sx={{ padding: "1rem", minHeight: '220px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h6">Address</Typography>
              <Button variant="contained" color="warning" onClick={handleOpen}> Edit </Button>
            </Box>
            <Box mt={2}>
              <Typography variant="subtitle2" lineHeight={2}>Shop name : {userInfo.shopInfo?.shopName}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Address : {userInfo.shopInfo?.address}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Phone: {userInfo.shopInfo?.phone}</Typography>
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper elevation={2} sx={{ padding: "1rem", minHeight: '220px' }}>
          <Typography variant="h6">Change Password</Typography>
          <Box mt={2}>
                <TextField
                  margin="normal"
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  sx={{ marginRight: '8px' }}
                />
                <TextField
                  margin="normal"
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="address"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                />
                <TextField
                  margin="normal"
                  id="new_password"
                  label="New Password"
                  name="new_password"
                  type="password"
                  autoComplete="password"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                />
                <Button type="submit" className="btn-success" variant="contained" sx={{ mt: 3, mb: 2 }}>Update</Button>
          </Box>
          </Paper>
        </Grid>

      </Grid>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box className={classes.modal} component="form" onSubmit={handleSubmit}>
          {/* Close Modal Icon */}
          <Box className={classes.closeModalIcon} onClick={handleClose}><CloseIcon/></Box>
            <Typography id="modal-modal-title" variant="h6" textAlign="center"> Edit Details </Typography>

            {/* <Box>
              <Typography variant="h6">Basic Info</Typography>
              <TextFieldWrap sx={{ marginBottom: '1rem' }}>
                <TextField
                  margin="normal"
                  id="name"
                  label="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  sx={{ marginRight: '8px' }}
                />
                <TextField
                  margin="normal"
                  id="email"
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  sx={{ marginRight: '8px' }}
                />
              </TextFieldWrap>

              <TextFieldWrap sx={{ marginBottom: '1rem' }}>
                <FormControl sx={{ mb: '.5rem', width: '100%', marginRight: '8px'}} size="small">
                  <InputLabel id="select-small-label">Role</InputLabel>
                  <Select labelId="select-small-label" id="select-small" label="role" value='seller'>
                    <MenuItem key={1} value='' selected>Select</MenuItem>
                    <MenuItem key={1} value='seller'>Seller</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ mb: '.5rem', width: '100%', marginRight: '8px'}} size="small">
                  <InputLabel id="select-small-label">Status</InputLabel>
                  <Select labelId="select-small-label" id="select-small" label="status" value='active'>
                    <MenuItem key={1} value='active'>active</MenuItem>
                    <MenuItem key={2} value='deactive'>Deactive</MenuItem>
                  </Select>
                </FormControl>
              </TextFieldWrap>

              <TextFieldWrap sx={{ width: '100%' }}>
                <FormControl sx={{ width: '100%', marginRight: '8px'}} size="small">
                  <InputLabel id="select-small-label">Payment Account</InputLabel>
                  <Select labelId="select-small-label" id="select-small" label="payment account" value='active'>
                    <MenuItem key={1} value='active'>active</MenuItem>
                    <MenuItem key={1} value='pending'>pending</MenuItem>
                  </Select>
                </FormControl>
              </TextFieldWrap>
            </Box> */}

            <Box mt={2}>
              <Typography variant="h6">Address</Typography>
              <TextFieldWrap>
                <TextField
                  margin="normal"
                  id="shop_name"
                  label="Shop Name"
                  name="shopName"
                  type="text"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.shopName}
                  onChange={handleInput}
                  sx={{ marginRight: '8px' }}
                />
                <TextField
                  margin="normal"
                  id="address"
                  label="Address"
                  name="address"
                  type="text"
                  autoComplete="address"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.address}
                  onChange={handleInput}
                />
              </TextFieldWrap>

              <TextFieldWrap>
                <TextField
                  margin="normal"
                  id="phone_no"
                  label="Phone"
                  name="phone"
                  type="text"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.phone}
                  onChange={handleInput}
                />
              </TextFieldWrap>
            </Box>

            <Button 
              type="submit" 
              className="btn-success" 
              fullWidth 
              variant="contained" 
              sx={{ mt: 3, mb: 2, borderRadius: "15px" }}
              disabled={loader ? true : false}
            >
              { loader ? <CircularProgress color="inherit" size="1.5em"/> : 'Update' }
            </Button>

          </Box>    
      </Modal>

    </Container>
  )
}

export default Profile