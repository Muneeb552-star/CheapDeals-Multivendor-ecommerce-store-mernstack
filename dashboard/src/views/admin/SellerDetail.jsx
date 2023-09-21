import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { get_seller, seller_status_update, clearMessage } from "../../store/Slices/sellerSlice"
import { toast } from 'react-hot-toast'

// MUI Imports
import { Container, Box, Paper, Typography, Grid, Button, InputLabel, MenuItem, FormHelperText, FormControl  } from "@mui/material"
import Select from '@mui/material/Select'
import { unknownImage } from "../../utils/images"


const SellerDetail = () => {

  const dispatch = useDispatch()
  const { seller, successMessage } = useSelector(state => state.seller)
  const { sellerId } = useParams()

  const [status, setStatus] = useState('')

  useEffect(() => {
    dispatch(get_seller(sellerId))
  }, [sellerId, dispatch])


   // Function to handle Form submit
   const status_update = (e) => {
    e.preventDefault();
      dispatch(seller_status_update({ sellerId, status }))
    };

  /* 
    This useEffect hook will handle the success message toast. 
  */
    useEffect(() => {  
      if(successMessage) {
        toast.success(successMessage)
        dispatch(clearMessage())
      }
    }, [successMessage, dispatch])

  /* 
    This useEffect hook will set status. 
  */
    useEffect(() => {
      if (seller) {
        setStatus(seller.status)
      }
    }, [seller])

  return (
    <Container sx={{ marginY: "6rem"}}>
      <Grid container spacing={2} >

        <Grid item xs={12}>
          <Paper sx={{ padding: ".5rem" }} elevation={2}>
              <Typography variant="h4">Seller Detail</Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12}>  
          <Paper elevation={2}>
            {/* Two Wrapper Division Box */}
            <Box sx={{ height: '15vh', background: '#28c76f' }}></Box>  {/* 1st Wrap Box */}
              <Box> {/* 2nd Wrap Box */}

              <Box sx={{ display:"flex", justifyContent:"center" }}>
                      {
                        seller?.image ? <img 
                          src={seller.image} 
                          alt="seller" 
                          style={{ 
                            display: 'block', 
                            margin: '-1rem auto .5rem auto', 
                            width: '120px', 
                            height: '120px', 
                            borderRadius: '8%',
                            border: '5px solid white',
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
                          }} 
                        /> : <img 
                              src={unknownImage} 
                              alt="seller" 
                              style={{ 
                                display: 'block', 
                                margin: '-1rem auto .5rem auto', 
                                width: '120px', 
                                height: '120px', 
                                borderRadius: '8%',
                                border: '5px solid white',
                                boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
                              }} 
                            />
                      }
              </Box>

              <Box  pb={1} sx={{ display:"flex", flexDirection:'column', textAlign:'center'}}>
                      <Typography variant="subtitle2">{seller?.name}</Typography>
                      <Typography variant="caption">{seller?.email}</Typography>

                      {/* Form Wrapper starts here */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Box component="form" onSubmit={status_update}>
                          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="select-helper-label">Select Status</InputLabel>
                            <Select labelId="select-helper-label" id="simple-select-helper" value={status} label="Select Status" onChange={(e)=> setStatus(e.target.value)} name='status' required>
                              <MenuItem value='Active'>Active</MenuItem>
                              <MenuItem value='Deactive'>Deactive</MenuItem>
                            </Select>
                            <FormHelperText>Change Seller Status</FormHelperText>
                          </FormControl>
                        
                          <Button type="submit" variant="contained" sx={{ borderRadius: '15px', mt: 1 }}>Submit</Button>
                        </Box>
                      </Box>

              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper elevation={2} sx={{ padding: "1rem", minHeight: '220px' }}>
            <Box><Typography variant="h6">Basic Info</Typography></Box>
            <Box mt={2}>
              <Typography variant="subtitle2" lineHeight={2}>Name : {seller?.name}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Email : {seller?.email}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Role : {seller?.role}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Status : {seller?.status}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Payment Account : {seller?.payment}</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Paper elevation={2} sx={{ padding: "1rem", minHeight: '220px' }}>
            <Box><Typography variant="h6">Address</Typography></Box>
            <Box mt={2}>
              <Typography variant="subtitle2" lineHeight={2}>Shop name : {seller?.shopInfo?.shopName}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Address : {seller?.shopInfo?.address}</Typography>
              <Typography variant="subtitle2" lineHeight={2}>Phone: {seller?.shopInfo?.phone}</Typography>
            </Box>
          </Paper>
        </Grid>
        

      </Grid>
    </Container>

  )
}

export default SellerDetail