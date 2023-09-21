import { Link } from 'react-router-dom'
// Material UI Imports
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Paper, Typography, Grid, styled} from "@mui/material"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

 /* Icon Box Wrapper Styling */
const IconBoxWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: '100%',
}))

 /* Icon Box container Styling */
const IconBox = styled(Box)(({ theme }) => ({
  color: '#28c76f',
  transition: '0.3s ease',
  width: '35px',
  height: '35px',
  textAlign: 'center',
  padding: '3px',
  cursor: 'pointer',
  '&:hover' : {
    opacity: '0.7',
  }
}))

 /* MUI DataGrid Columns */
const columns = [
    { field: 'no',    headerName: 'NO',    flex: 1},
    {
      field: 'image',
      headerName: 'IMAGE',
      flex: 1,
      renderCell: (params) => <img 
        src={params.value} alt="Product" 
        style={{ 
          width: "45px", 
          height: '45px', 
          borderRadius: '5px' 
        }} 
      />,
    },
    { field: 'name',          headerName: 'NAME' ,           flex: 1},
    { field: 'shopName',      headerName: 'SHOP NAME' ,      flex: 1},
    { field: 'paymentStatus', headerName: 'PAYMENT STATUS' , flex: 1},
    { field: 'email',         headerName: 'EMAIL' ,          flex: 1},
    { field: 'division',      headerName: 'DIVISION' ,       flex: 1},
    { field: 'district',      headerName: 'DISTRICT' ,       flex: 1},
    {
      field: 'actions',
      headerName: 'ACTION',
      description: 'This column is not sortable.',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconBoxWrap>
          <Link to='/admin/dashboard/seller/details/1'><IconBox><RemoveRedEyeIcon/></IconBox></Link>
      </IconBoxWrap>
      ),
    },
];

// MUI DataGrid rows
const rows = [
    {  
      id: 1, 
      no: '1', 
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
      name: 'Muneeb',
      shopName: 'Smart Deals',
      paymentStatus: 'pending',
      email: 'ali@gmail.com',
      division: 'Daska',
      district: 'Sialkot'
    },
    {  
      id: 2, 
      no: '2', 
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
      name: 'Muneeb',
      shopName: 'Smart Deals',
      paymentStatus: 'pending',
      email: 'ali@gmail.com',
      division: 'Daska',
      district: 'Sialkot'
    },
    {  
      id: 3, 
      no: '3', 
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
      name: 'Muneeb',
      shopName: 'Smart Deals',
      paymentStatus: 'pending',
      email: 'ali@gmail.com',
      division: 'Daska',
      district: 'Sialkot'
    },
    {  
      id: 4, 
      no: '4', 
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
      name: 'Muneeb',
      shopName: 'Smart Deals',
      paymentStatus: 'pending',
      email: 'ali@gmail.com',
      division: 'Daska',
      district: 'Sialkot'
    },
    {  
      id: 5, 
      no: '5', 
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
      name: 'Muneeb',
      shopName: 'Smart Deals',
      paymentStatus: 'pending',
      email: 'ali@gmail.com',
      division: 'Daska',
      district: 'Sialkot'
    },
    {  
      id: 6, 
      no: '6', 
      image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
      name: 'Muneeb',
      shopName: 'Smart Deals',
      paymentStatus: 'pending',
      email: 'ali@gmail.com',
      division: 'Daska',
      district: 'Sialkot'
    },
];


const Sellers = () => {
  return (
    <Box>
      <Grid container spacing={2} >

        <Grid item xs={12}>
          <Paper sx={{paddingY: '.5rem', paddingX:'1rem'}} elevation={2}>
              <Typography variant="h5">Sellers</Typography>
          </Paper>
        </Grid>

        {/* Sellers Section Starts Here */}

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ overflowX: 'auto' }}>
            <Box>
              <DataGrid
                sx={{ textAlign: "center" }}
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
              />
            </Box>
          </Paper>
        </Grid>
        {/* Sellers Section Ends Here */}

      </Grid>
    </Box>
  )
}

export default Sellers