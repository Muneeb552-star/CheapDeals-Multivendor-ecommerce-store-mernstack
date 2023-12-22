import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback  } from "react";
import { useDispatch, useSelector } from "react-redux"
import { get_active_sellers } from '../../store/Slices/sellerSlice';
// Material UI Imports
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Paper, Typography, TextField, Grid, styled} from "@mui/material"
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';


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


const Sellers = () => {

  const dispatch = useDispatch()
  const { sellers } = useSelector( state => state.seller )


  // useState() hooks for search query
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRows, setFilteredRows] = useState([])

  /* 
    This useEffect hook will call the get_categories action/function of categorySlice. 
  */
  useEffect(() => {
    dispatch(get_active_sellers())
  }, [dispatch])

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
  
  
    /* 
      Modify rows to use filteredRows if available, otherwise use categories
    */ 
    const rows = filteredRows.length > 0 
                  ? filteredRows.map((row, index) => ({ ...row, id: row._id, no: `${index + 1}` })) 
                  : sellers.map((row, index) => ({ ...row, id: row._id, no: `${index + 1}` }))


    /* MUI DataGrid Columns */
    const columns = [
      { field: 'no',    headerName: 'NO',    flex: 1},
      {
        field: 'image',
        headerName: 'IMAGE',
        flex: 1,
        renderCell: (params) => <img src={params.value} alt="seller" style={{ width: "45px", height: '45px', borderRadius: '5px' }} />,
      },
      { field: 'name',  headerName: 'NAME' , flex: 1},
      { field: 'payment',  headerName: 'PAYMENT' , flex: 1},
      { field: 'email',  headerName: 'EMAIL' , flex: 1},
      {
        field: '_id',
        headerName: 'ACTION',
        description: 'This column is not sortable.',
        sortable: false,
        flex: 1,
        renderCell: (params) => (
          <IconBoxWrap>
            <Link to={`/admin/dashboard/seller/details/${params.value}`}><IconBox><CreateOutlinedIcon color='primary'/></IconBox></Link>
        </IconBoxWrap>
        ),
      },
    ];
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