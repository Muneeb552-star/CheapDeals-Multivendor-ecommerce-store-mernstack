import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { get_seller_requests } from "../../store/Slices/sellerSlice";
import { Link } from 'react-router-dom';
// MUI Imports
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Paper, Typography, Grid, styled, TextField} from "@mui/material"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';


// Icon Box Wrapper Styling
const IconBoxWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: '100%',
}))

// Icon Box container Styling
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




const SellersRequest = () => {
  const dispatch = useDispatch()
  const { sellers } = useSelector(state => state.seller)

  // useState() hooks for search  bar
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRows, setFilteredRows] = useState([])

  useEffect(() => {
    dispatch(get_seller_requests())
  })

  const handleSearch = (e) => setSearchQuery(e.target.value)

  /* 
    This function will show/filter the products searched through search bar. 
    When the 'searchQuery' value gets changed, this function will be called. 
  */
  const searchRecords = useCallback(() => {
    const filteredData = sellers.filter((row) => {
      const name = row.name || '';
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredRows(filteredData);
  }, [searchQuery, sellers]);
  
  
  /* 
    Ths useEffect() hook will call the 'searchRecords' function. 
  */
  useEffect(() => {
    searchRecords();
  }, [searchQuery, sellers, searchRecords]);


    // MUI DataGrid Columns
  const columns = [
    { field: 'no',            headerName: 'NO',             flex: 1},
    { field: 'name',          headerName: 'NAME',           flex: 1},
    { field: 'email',         headerName: 'EMAIL',          flex: 1},
    { field: 'payment',       headerName: 'PAYMENT STATUS', flex: 1},
    { field: 'status',        headerName: 'STATUS',         flex: 1},
    {
      field: 'actions',
      headerName: 'ACTION',
      description: 'This column is not sortable.',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <IconBoxWrap>
          <Link to={`/admin/dashboard/seller/details/${params.row._id}`}><IconBox><RemoveRedEyeIcon/></IconBox></Link>
      </IconBoxWrap>
      ),
    },
  ];


  /* 
    Modify rows to use filteredRows if available, otherwise use categories
  */ 
  const rows = filteredRows.length > 0 ? filteredRows.map((row, index) => ({
    ...row,
    id: row._id,
    no: `${index + 1}`,
  })) : sellers.map((row, index) => ({
    ...row,
    id: row._id,
    no: `${index + 1}`,
  }));

  return (
    <Container sx={{ marginTop: "6rem" }}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Paper sx={{ padding: ".5rem" }} elevation={2}>
              <Typography variant="h5">Sellers Request</Typography>
          </Paper>
        </Grid>

        {/* Sellers Section Starts Here */}

        <Grid item xs={12}>
          <Paper elevation={2}>
          <Box>
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
                sx={{ textAlign: "center", width: '100%' }}
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
            </Box>
          </Paper>
        </Grid>
        {/* Sellers Section Ends Here */}

      </Grid>
    </Container>
  )
}

export default SellersRequest