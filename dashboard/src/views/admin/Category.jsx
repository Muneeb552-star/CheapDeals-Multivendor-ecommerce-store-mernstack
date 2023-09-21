import { useState, useEffect, useCallback  } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { add_category, get_categories, clearMessage } from "../../store/Slices/categorySlice";
import { toast } from 'react-hot-toast';
// MUI Import
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, Paper, Typography, Grid, TextField, Button, styled, Modal, CircularProgress } from "@mui/material"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloseIcon from '@mui/icons-material/Close';

// Icon Box Wrapper Styling
const IconBoxWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: '100%',

}))

 /* Icon Box container Styling */
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

  /* Category Modal Style */
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};





const Category = () => {

  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage, categories } = useSelector(state => state.category)

  // useState() hooks for search  bar
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredRows, setFilteredRows] = useState([])

  const [open, setOpen] = useState(false)
  const [imageShow, setImageShow] = useState('')
  const [state, setState] = useState({ name: '', image: '' })

  /* 
    These 2 functions will handle the MUI modal close & open.
  */
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* 
    This function will handle the image upload 
  */
  const imageHandle = (e) => {
    let files = e.target.files
    if (files.length > 0) {
      setImageShow(URL.createObjectURL(files[0]))
      setState({ ...state, image: files[0] })
    }
  }

  /* 
    This function will handle the form submission 
  */
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_category(state))
  };


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
      setState({ name: '', image: '' })
      setImageShow('')
      setOpen(false) // Close the modal here
    }
  }, [errorMessage, successMessage, dispatch])

  /* 
    This useEffect hook will call the get_categories action/function of categorySlice. 
  */
  useEffect(() => {
    dispatch(get_categories())
  }, [dispatch])

  const handleSearch = (e) => setSearchQuery(e.target.value)

  /* 
    This function will show/filter the products searched through search bar. 
    When the 'searchQuery' value gets changed, this function will be called. 
  */
  const searchRecords = useCallback(() => {
    const filteredData = categories.filter((row) => {
      const name = row.name || '';
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredRows(filteredData);
  }, [searchQuery, categories]);


  /* 
    Ths useEffect() hook will call the 'searchRecords' function. 
  */
  useEffect(() => {
    searchRecords();
  }, [searchQuery, categories, searchRecords]);


  /* 
    Modify rows to use filteredRows if available, otherwise use categories
  */ 
  const rows = filteredRows.length > 0 ? filteredRows.map((row, index) => ({
    ...row,
    id: row._id,
    no: `${index + 1}`,
  })) : categories.map((row, index) => ({
    ...row,
    id: row._id,
    no: `${index + 1}`,
  }));
    
/* MUI DataGrid Rows Data */
// const rows = categories ? categories.map((row, index) => ({...row, id: row._id, no: `${index + 1}`})) : []

/* MUI DataGrid Columns */
const columns = [
  { field: 'no',    headerName: 'NO',    flex: 1},
  {
    field: 'image',
    headerName: 'IMAGE',
    flex: 1,
    renderCell: (params) => <img 
      src={params.value} alt="Category" 
      style={{ 
        width: "45px", 
        height: '45px', 
        borderRadius: '5px' 
      }} 
    />,
  },
  { field: 'name',  headerName: 'NAME' , flex: 1},
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


  return (
    <Box>
      <Grid container spacing={2}>

        <Grid item xs={12}>
          <Paper sx={{ padding: ".5rem" }} elevation={2}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography variant="h5">Categories</Typography>
              <Button variant="contained" color="warning" size="small" onClick={handleOpen}> Add Category </Button>
            </Box>
          </Paper>
        </Grid>

        {/* Category Section Starts Here */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ mb: 2 }}>
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
        {/* Category Section Ends Here */}
      </Grid>

        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
          <Box sx={style} component="form" onSubmit={handleSubmit}>

          {/* Close Modal Icon */}
          <Box sx={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }} onClick={handleClose}>
            <CloseIcon/>
          </Box>

          <Typography id="modal-modal-title" variant="h6" textAlign="center"> Add Category </Typography>
          <TextField
            id="category"
            margin="normal"
            label="category name"
            name="category"
            type="text"
            autoComplete="category"
            autoFocus
            required
            fullWidth
            value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })}
          />

          <Box component='label'
            htmlFor="image"
            sx={{ 
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', 
              justifyContent: 'center', 
              height: '170px', 
              width: '100%', 
              cursor: 'pointer',
              border: '1px dashed blue' 
            }}>
            {
              imageShow ? <img style={{ width: '100%', height: '100%' }} src={imageShow} alt="category" /> : <>
                <span><ImageOutlinedIcon/></span>
                <span>Select Image</span>
              </>
            }
            </Box>

            <input type="file" name="image" id="image" onChange={imageHandle} style={{ opacity: 0 }} required/>
            <Button
              type="submit"
              className="btn-success"
              fullWidth
              variant="contained"
              color='warning'
              sx={{ mt: 3, mb: 2, borderRadius: '15px' }}
              disabled={loader ? true : false}
            >
              { loader ? <CircularProgress color="inherit" size="1.5em"/> : 'Add Category' }
            </Button>

          </Box>
        </Modal>
    </Box>
  );
}

export default Category