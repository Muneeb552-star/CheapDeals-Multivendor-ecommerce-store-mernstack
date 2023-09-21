import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Paper, Typography, Grid, styled } from "@mui/material"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

  /* Icon Box Wrapper Styling */
const IconBoxWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: '100%',

}))

 /* Icon Box container Styling */
const IconBox = styled(Box)(({ theme }) => ({
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
  { field: 'name',      headerName: 'NAME' ,     flex: 2},
  { field: 'category',  headerName: 'CATEGORY' , flex: 1},
  { field: 'brand',     headerName: 'BRAND' ,    flex: 1},
  { field: 'price',     headerName: 'PRICE' ,    flex: 1},
  { field: 'discount',  headerName: 'DISCOUNT' , flex: 1},
  { field: 'stock',     headerName: 'STOCK' ,    flex: 1},
  {
    field: 'actions',
    headerName: 'ACTION',
    description: 'This column is not sortable.',
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <IconBoxWrap>
        <IconBox><CreateOutlinedIcon color='primary'/></IconBox>
        <IconBox><DeleteForeverIcon color='error' /></IconBox>
    </IconBoxWrap>
    ),
  },
];

  /* MUI DataGrid rows */
const rows = [
  {  
    id: 1, 
    no: '#1234',
    name: 'Men"s Premium Soft Jacket',
    category: 'Sports',
    brand: 'Adidas',
    price: 500,
    discount: 5,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
  },
  {  
    id: 2, 
    no: '#1234',
    name: 'Men"s Premium Soft Jacket',
    category: 'Sports',
    brand: 'Adidas',
    price: 500,
    discount: 5,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
  },
  {  
    id: 3, 
    no: '#1234',
    name: 'Men"s Premium Soft Jacket',
    category: 'Sports',
    brand: 'Adidas',
    price: 500,
    discount: 5,
    stock: 10,
    image: 'https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80', 
  }
];

const DiscountProducts = () => {
  return (
    <Container>
      <Grid container spacing={3}>

        <Grid item xs={12}>
            <Paper sx={{paddingY: '.5rem', paddingX:'1rem'}} elevation={2}>
                <Typography variant="h5">Discount Products</Typography>
            </Paper>
        </Grid>

        {/* Products Section Starts Here */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper elevation={2}>
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
        {/* Products Section Ends Here */}

      </Grid>
    </Container>
  )
}

export default DiscountProducts