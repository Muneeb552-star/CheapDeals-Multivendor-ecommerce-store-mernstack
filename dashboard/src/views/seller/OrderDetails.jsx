import {
    Box,
    Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
    Divider
  } from "@mui/material"
  import { useState } from "react";
  import { sellerImage } from "../../utils/images";
  
  //Material UI Imports
  import { styled } from "@mui/material/styles";
  import { makeStyles } from '@mui/styles';
  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  
  const OrderStatusBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  
    [theme.breakpoints.between('xs', 'md')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
    },
  }))
  
  const rows = [
    {
      id: 1,
      product: 'Red Bag for Kids',
      unitPrice: 10,
      quantity: 2,
      total: 20,
      imageUrl: sellerImage,
    },
    {
      id: 2,
      product: 'Green Bag for Kids',
      unitPrice: 15,
      quantity: 3,
      total: 45,
      imageUrl: sellerImage,
    },
    {
      id: 3,
      product: 'Blue Bag for Kids',
      unitPrice: 15,
      quantity: 3,
      total: 45,
      imageUrl: sellerImage,
    },
  ];

  /* Custom styles */
const useStyles = makeStyles({
  singleLineText: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: ".5rem 0 .5rem 0"
  }
})
  
  
  
  const OrderDetails = () => {

    const classes = useStyles()
    const [status, setStatus] = useState('');
  
    const handleChange = (e) => setStatus(e.target.value)
  
     // Function to handle Form submit
     const handleSubmit = (e) => {
      e.preventDefault();
      const obj = {status : status}
      console.log(obj)
    };
  
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={{ paddingY: ".5rem", paddingX: "1rem" }} elevation={2}>
              <Typography variant="h5">Order Details</Typography>
            </Paper>
          </Grid>
  
          {/* Change Order Status Top Grid */}
          <Grid item xs={12}>
            <Paper sx={{ paddingY: ".5rem", paddingX: "1rem" }} elevation={2}>
              <OrderStatusBox sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h6">Order Id : #26BC663E</Typography>
                  <Typography variant="body2">
                    Order created : Jan 26, 2023 10:30 AM
                  </Typography>
                </Box>
  
                <Box sx={{ mt: { xs: 2, sm: 2, md: 2 } }}>
                  <Box component="form" onSubmit={handleSubmit}>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                      <InputLabel id="select-helper-label">Status</InputLabel>
                      <Select labelId="select-helper-label" id="simple-select-helper" value={status} label="status" onChange={handleChange}>
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="processing">processing</MenuItem>
                        <MenuItem value="warehouse">warehouse</MenuItem>
                        <MenuItem value="placed">placed</MenuItem>
                        <MenuItem value="cancelled">cancelled</MenuItem>
                      </Select>
                      <FormHelperText>Change Order Status</FormHelperText>
                    </FormControl>
  
                    <Button type="submit" variant="contained" sx={{ borderRadius: "15px", mt: 1 }}>Save</Button>
                  </Box>
                </Box>
              </OrderStatusBox>
              {/* OrderStatusBox Ends Here */}
            </Paper>
          </Grid>
  
          {/* Order Summary Section */}
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Paper elevation={2} sx={{ padding: "1rem" }}>
              <Typography variant="subtitle2">Customer Details</Typography>

              <Box sx={{ marginY: "1rem" }}>
                <Box className={classes.singleLineText}>
                  <Typography variant="body2">Name</Typography>
                  <Typography variant="subtitle2">Muhammad Muneeb</Typography>
                </Box>
                <Divider />
  
                <Box className={classes.singleLineText}>
                  <Typography variant="body2">Email</Typography>
                  <Typography variant="body2">support@gmail.com</Typography>
                </Box>
                <Divider />
  
                <Box className={classes.singleLineText}>
                  <Typography variant="body2">Phone</Typography>
                  <Typography variant="body2">+92 30000000</Typography>
                </Box>
                <Divider />
              </Box>

            </Paper>
          </Grid>
  
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Paper elevation={2} sx={{ padding: "1rem" }}>
              <Typography variant="subtitle2">Order Summary</Typography>

              <Box sx={{ marginY: "1rem" }}>
                <Box className={classes.singleLineText}>
                  <Typography variant="body2">Order Date</Typography>
                  <Typography variant="body2">04/05/2023</Typography>
                </Box>
                <Divider />
  
                <Box className={classes.singleLineText}>
                  <Typography variant="body2">Payment Status</Typography>
                  <Typography variant="body2">Paid</Typography>
                </Box>
                <Divider />
  
                <Box className={classes.singleLineText}>
                  <Typography variant="body2">Payment Method</Typography>
                  <Typography variant="body2">Cash On delivery</Typography>
                </Box>
                <Divider />
                
              </Box>
            </Paper>
          </Grid>
  
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Paper elevation={2} sx={{ padding: "1rem" }}>
              <Typography variant="subtitle2">Deliver to</Typography>
              <Box sx={{ marginY: "1rem" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingY: ".5rem" }}>
                  <Typography variant="body2">Deliver To:</Typography>
                  <Typography variant="subtitle2">Warehouse</Typography>
                </Box>
                <Divider />
  
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingY: ".5rem" }}>
                  <Typography variant="body2">Street</Typography>
                  <Typography variant="body2"></Typography>
                </Box>
                <Divider />
  
                <Box className={classes.singleLineText}>
                  <Typography variant="body2">State</Typography>
                  <Typography variant="body2"></Typography>
                </Box>
                <Divider />
              </Box>
            </Paper>
          </Grid>
  
          <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>  
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>PRODUCT</TableCell>
                      <TableCell align="right">UNIT PRICE</TableCell>
                      <TableCell align="right">QUANTITY</TableCell>
                      <TableCell align="right">TOTAL</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row" sx={{ display: 'flex', alignItems: 'center'}}>
                          <img src={row.imageUrl} alt={row.product} style={{ width: '50px', height: '50px', borderRadius: '5px', marginRight: '.7rem' }} />
                            {row.product}
                        </TableCell>
                        <TableCell align="right">${row.unitPrice}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">${row.total}</TableCell>
                      </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
          </Grid>
  
          {/* Order Grand Total */}
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Paper elevation={2} sx={{ padding: "1rem" }}>
              <Typography variant="subtitle2">Order Price</Typography>
              <Box sx={{ marginY: "1rem" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingY: ".5rem" }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">$1237</Typography>
                </Box>
                <Divider />
  
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingY: ".5rem" }}>
                  <Typography variant="body2">Shipping cost:</Typography>
                  <Typography variant="body2">$49.99</Typography>
                </Box>
                <Divider />
  
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingY: ".5rem" }}>
                  <Typography variant="body2">Grand total:</Typography>
                  <Typography variant="subtitle2">$1310.55</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
  
        </Grid>
      </Container>
  
    );
  }
  
  export default OrderDetails