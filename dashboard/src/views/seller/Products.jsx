import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { get_products } from "../../store/Slices/productSlice";
import { Link } from 'react-router-dom';
/* MUI Imports */
import { DataGrid } from '@mui/x-data-grid'
import { Container, Box, Paper, Typography, Grid, styled, TextField } from "@mui/material"
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



const Products = () => {

  const dispatch = useDispatch()
  const { products } = useSelector(state => state.product)
  // useState() hooks for search  bar
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRows, setFilteredRows] = useState([])

  /* 
    This useEffect hook will call the get_products action/function of productSlice. 
  */
  useEffect(() => {
    dispatch(get_products())
  }, [dispatch])

  const handleSearch = (e) => setSearchQuery(e.target.value)


  /* 
    This function will show/filter the products searched through search bar. 
    When the 'searchQuery' value gets changed, this function will be called. 
  */
  const searchRecords = useCallback(() => {
    const filteredData = products.filter((row) => {
      const name = row.name || '';
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredRows(filteredData);
  }, [searchQuery, products]);

  /* 
    Ths useEffect() hook will call the 'searchRecords' function. 
  */
  useEffect(() => {
    searchRecords();
  }, [searchQuery, products, searchRecords]);

  /* 
    Modify rows to use filteredRows if available, otherwise use products
  */ 
    const rows = filteredRows.length > 0 ? filteredRows.map((row, index) => ({
      ...row,
      id: row._id,
      no: `${index + 1}`,
    })) : products.map((row, index) => ({
      ...row,
      id: row._id,
      no: `${index + 1}`,
    }));
  

  /* MUI DataGrid Columns */
  const columns = [
    { field: 'no',    headerName: 'NO',    flex: 1},
    {
      field: 'images',
      headerName: 'IMAGE',
      flex: 1,
      renderCell: (params) => (
        <div>
        {params.value && Array.isArray(params.value) && params.value.length > 0 ? (
          <img
            src={params.value[0]}
            alt={`Product ${params.rowIndex + 1}`}
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '5px',
              marginRight: '5px',
            }}
          />
       
        ) : null}
      </div>
      ),
    },
    { field: 'name',      headerName: 'NAME' ,     flex: 3},
    { field: 'category',  headerName: 'CATEGORY' , flex: 1},
    { field: 'brand',     headerName: 'BRAND' ,    flex: 1},
    { 
      field: 'price',     
      headerName: 'PRICE' ,    
      flex: 1,
      renderCell: (params) => (
        <div>
          ${params.value}
        </div>
      ),
    },
    { 
      field: 'discount',  
      headerName: 'DISCOUNT' , 
      flex: 1,
      renderCell: (params) => (
        <div>
          {params.value}%
        </div>
      ),
    },
    { field: 'stock',     headerName: 'STOCK' ,    flex: 1},
    {
      field: 'actions',
      headerName: 'ACTION',
      description: 'This column is not sortable.',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconBoxWrap>
          <IconBox>
            <Link to={`/seller/dashboard/update-product/${params.row._id}`}><CreateOutlinedIcon color='primary'/></Link>
          </IconBox>
          <IconBox><DeleteForeverIcon color='error' /></IconBox>
      </IconBoxWrap>
      ),
    },
  ]

  return (
    <Box sx={{ textAlign: "center", width: '100%', overflowX: 'auto' }}>
      
          
      <Box sx={{ overflow: 'auto' }}>
        <Paper elevation={2}>
          <Box sx={{ width: '15rem', ml: '1rem' }}>
            <TextField
              id="search"
              margin="normal"
              label="Search"
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              fullWidth
              size="small"
            />
          </Box>

            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              autoHeight
            />
        </Paper>

      </Box>
        
        {/* Products Section Ends Here */}
     
    </Box>
  )
}

export default Products