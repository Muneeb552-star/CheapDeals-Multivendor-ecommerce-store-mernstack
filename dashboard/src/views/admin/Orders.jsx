import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Paper, Typography, styled, Grid, Chip } from "@mui/material"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// Icon Box Wrapper Styling
const IconBoxWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: '100%',
}))

// Icon Box container Styling
const IconBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s ease',
  width: '35px',
  height: '35px',
  textAlign: 'center',
  padding: '3px',
  cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '50%',
    }
}))

// MUI DataGrid Columns
const columns = [
    { field: 'orderId',        headerName: 'ORDER ID', flex: 1},
    { field: 'price',          headerName: 'PRICE', flex: 1},
    { field: 'paymentStatus',  headerName: 'PAYMENT STATUS' , flex: 1},
    {
      field: 'status',
      headerName: 'STATUS',
      flex: 1,
      renderCell: (params) => (
          <Chip size='small' label={params.value} color="warning" />
      ),
  },
    {
      field: 'actions',
      headerName: 'ACTION',
      description: 'This column is not sortable.',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconBoxWrap>
          <IconBox>
            <Link to="/admin/dashboard/order-details/1"><CreateOutlinedIcon color='primary'/></Link>
          </IconBox>
          <IconBox><DeleteForeverIcon color='error' /></IconBox>
      </IconBoxWrap>
      ),
    },
];

// MUI DataGrid Rows
const rows = [
    {  id: 1, orderId: '#1234', price: 500, paymentStatus: 'Paid', status: 'Pending' },
    {  id: 2, orderId: '#1234', price: 500, paymentStatus: 'Paid', status: 'Pending' }
];


export default function Orders() {
    return (
      <Box>
          <Grid container spacing={2} >

            <Grid item xs={12}>
              <Paper sx={{paddingY: '.5rem', paddingX:'1rem'}} elevation={2}>
                <Typography variant='h5'>Orders</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper elevation={2} >
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                    autoHeight
                  />
              </Paper>
            </Grid>
            
          </Grid>
      </Box>
    );
}





