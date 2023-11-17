import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from '../../store/Slices/categorySlice';
import { add_product, clearMessage } from '../../store/Slices/productSlice';
import { toast } from 'react-hot-toast';

// MUI Icons Import
import { Box, Container, Grid, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress  } from '@mui/material'
import { makeStyles } from '@mui/styles';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import { styled } from "@mui/material/styles";

// const ImageBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',

//   [theme.breakpoints.between('xs', 'md')]: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
// }))

const TextFieldWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.between('xs', 'md')]: {
    display: 'block',
  },
}))

/* Custom styles */
const useStyles = makeStyles({
  closeIcon: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    border: 'none',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  },
  uploadImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '180px',
    width: '200px',
    cursor: 'pointer',
    border: '1px dashed #C0C0C0',
    borderRadius: '5px',
    background: '#F5F5F5',
  },
  singleBox: {
    marginBottom:  { xs: '.5rem', sm : '.5rem', md: '.5rem' },  
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px'
  }
});

const AddProduct = () => {

  const classes = useStyles()
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)
  const { successMessage, errorMessage, loader } = useSelector(state => state.product)

  // const categories = [
  //   { id: 1, name: 'Sports' },
  //   { id: 2, name: 'Mobile' },
  //   { id: 3, name: 'Jarcy' },
  //   { id: 4, name: 'Pant' },
  //   { id: 5, name: 'Watch' }
  // ]

  useEffect(() => {
    dispatch(get_categories())
  }, [dispatch])

  const [state, setState] = useState({ 
      name: '', 
      description: '', 
      discount: '', 
      price: '', 
      brand: '', 
      stock: ''
    })

  /*
    This Function will set the form input values in state variable.
  */
  const handleInput = (e) => { setState({ ...state, [e.target.name]: e.target.value }) }

  const [category, setCategory] = useState('')
  const [allCategory, setAllCategory] = useState([])
  const [images, setImages] = useState([])
  const [imageShow, setImageShow] = useState([])
  // console.log(images)

  /*
    This Function is used to handle the image upload.
  */
  const imageHandle = (e) => {
      const files = e.target.files
      const length = files.length

      if ( length > 0 ) { 
        setImages([...images, ...files])
        let imageUrl = []

        for (let i = 0; i < length; i++){
          imageUrl.push({ url: URL.createObjectURL(files[i]) })
        }
        setImageShow([...imageShow, ...imageUrl])
      } 
  }

  /*
    This Function is used to change the images during uploading.
  */
  const imageChange = (img, index) => {
      if (img) {
        let tempUrl = imageShow
        let tempImages = images

        tempImages[index] = img
        tempUrl[index] = { url: URL.createObjectURL(img) }
        setImageShow([...tempUrl])
        setImages([...tempImages])
      }
  }

  /*
    This Function is used to remove images during uploading.
  */
  const removeImage = (i) => {
    const filteredImages = images.filter((img, index) => index !== i)
    const filteredImageUrl = imageShow.filter((img, index) => index !== i)
    setImages(filteredImages)
    setImageShow(filteredImageUrl)
  }
  // console.log(images) 

  useEffect(() => {
    setAllCategory(categories)
  }, [categories])

  /*
    This Function is used to handle form submission.
  */  

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', state.name)
    formData.append('description', state.description)
    formData.append('category', category)
    formData.append('discount', state.discount)
    formData.append('price', state.price)
    formData.append('brand', state.brand)
    formData.append('shopName', 'Cheap Deals')
    formData.append('stock', state.stock)

    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i])
    }
    
    dispatch(add_product(formData))
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
            name: '', 
            description: '', 
            discount: '', 
            price: '', 
            brand: '', 
            stock: '' 
          })
        setImageShow([])
        setImages([])
        setCategory("")
      }
    }, [errorMessage, successMessage, dispatch])

  return (
    <Box>
      <Grid container spacing={3}>

        <Grid item xs={12}>
            <Paper sx={{paddingY: '.5rem', paddingX:'1rem'}} elevation={2}>
                <Typography variant="h5">Product Editor</Typography>
            </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{padding: '1rem'}} elevation={2}>
            <Box component="form" onSubmit={handleSubmit}>
            {/* Top Grid */}
            <Grid item xs={12}>
              {/* Custome styled Box */}
              <TextFieldWrap>
                <TextField
                  margin="normal"
                  id="name"
                  label="Product Name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.name}
                  onChange={handleInput}
                  sx={{ marginRight: '8px' }}
                />
                <TextField
                  margin="normal"
                  id="brand"
                  label="Brand"
                  name="brand"
                  type="text"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.brand}
                  onChange={handleInput}
                  sx={{ marginRight: '8px' }}
                />
              </TextFieldWrap>

              <TextFieldWrap sx={{ width: '100%' }}>
                <FormControl sx={{ mt: 1, width: '100%', marginRight: '8px'}} size="small">
                  <InputLabel id="select-small-label">Category</InputLabel>
                  <Select 
                    labelId="select-small-label" 
                    id="select-small" 
                    label="category"
                    name="category"
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {
                      allCategory.map((cat, index) =>
                        <MenuItem key={index} value={cat.name} onClick={() => { setCategory(cat.name) }}> {cat.name}</MenuItem>)
                    }
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  id="stock"
                  label="Stock"
                  name="stock"
                  type="number"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.stock}
                  onChange={handleInput}
                  sx={{ marginRight: '8px' }}
                  inputProps={{ min: 0 }}
                />
              </TextFieldWrap>

              <TextFieldWrap sx={{marginBottom: '1rem'}}>
                <TextField
                  margin="normal"
                  id="price"
                  label="Price"
                  name="price"
                  type="number"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.price}
                  onChange={handleInput}
                  sx={{ marginRight: '8px' }}
                  inputProps={{ min: 0 }}
                />
                <TextField
                  margin="normal"
                  id="discount"
                  label="Discount"
                  name="discount"
                  type="number"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.discount}
                  onChange={handleInput}
                  inputProps={{ min: 0 }}
                />
              </TextFieldWrap>

              <Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name='description'
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                  value={state.description}
                  onChange={handleInput}
                  sx = {{ width: '100%', marginTop: '.5rem'}}
                />
              </Box>

            </Grid>


            {/* Bottom Grid */}
            <Grid item xs={12} mt={5}>
              <Typography variant='h6'>Product Settings</Typography>
              <Typography variant='caption'>Product Images</Typography>
                {/* Images container Box */}
                <Box>
                    {/* Single Box */}
                  <Box className={classes.singleBox}>
                    {/* Show uploaded images code starts here */}
                    {
                      imageShow.map((img, i) => <Box key={i} sx={{ height: '180px', width: '180px', position: 'relative'}} >

                      <label htmlFor={i}>
                        <img src={img.url} alt="product" style={{ width: '100%', height: '100%' }} />
                      </label>

                      <input type="file" id={i} onChange={(e) => imageChange(e.target.files[0], i)} style={{ opacity: '0' }} />
                          
                      <button className={classes.closeIcon} onClick={(e) => {
                        e.preventDefault();
                        removeImage(i);
                      }}>X</button>

                      </Box>)
                    }
                      {/* Show uploaded images code ends here */}

                      {/* Upload new Images Box */}
                      <Box component='label' htmlFor="product_image" className={classes.uploadImage}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                          <span><ImageOutlinedIcon/></span>
                          <Typography variant='subtitle2' color='primary'>Browse Images</Typography>
                          <input type="file" onChange={imageHandle} id="product_image" style={{ marginLeft: '2.5rem', opacity: '0' }} multiple required />
                        </Box>
                      </Box>

                    </Box>
                </Box>
                {/* Images container Box Ends Here */}

                <Button 
                  type="submit" 
                  className="btn-success" 
                  variant="contained" 
                  sx={{ marginY: '1rem', borderRadius: '15px', height: '40px', width: '10rem'}}
                  disabled={loader ? true : false}
                > 
                 { loader ? <CircularProgress color="inherit" size="1.5em"/> : 'Add Product' }
                </Button>
                    
            </Grid>

            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Box>
  )
}

export default AddProduct