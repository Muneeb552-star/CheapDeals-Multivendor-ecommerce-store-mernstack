// I want to show MUI 'CircularProgress' on the image which i click to update the image. Untill the 'loader' variable of useSelector() hook is not set to defined (true), the loader 'CircularProgress' should show on that particular image. How to do it ?

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { get_categories } from "../../store/Slices/categorySlice";
import { get_product, clearMessage, update_product, update_product_image } from '../../store/Slices/productSlice';
import { toast } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom';
// MUI Icons Import
import { Box, Container, Grid, Paper, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress  } from '@mui/material'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { styled } from "@mui/material/styles";


const TextFieldWrap = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.between('xs', 'md')]: {
    display: 'block',
  },
}))


const UpdateProduct = () => {

  const { productId } = useParams()
  const dispatch = useDispatch()

  const { categories } = useSelector(state => state.category)
  const { product, loader, errorMessage, successMessage } = useSelector(state => state.product)

  const [category, setCategory] = useState('')
  const [allCategory, setAllCategory] = useState([])
  const [images, setImages] = useState([])
  const [imageShow, setImageShow] = useState([])


  /* 
    This useEffect hook will call the get_categories action/function of categorySlice. 
  */
  useEffect(() => {
    dispatch(get_categories())
  }, [dispatch])

  /* 
    This useState() hook will will store the variable's values in 'state' variable. 
  */

  const [ state, setState ] = useState({
    name: '',
    description: '',
    discount: '',
    price: '',
    brand: '',
    stock: '',
    productId: productId ? productId : ''
  })

  const inputHandle = (e) => { setState({ ...state, [e.target.name]: e.target.value }) }

  /* 
    This useEffect hook will call the get_categories action/function of categorySlice. 
  */
  useEffect(() => {
    dispatch(get_product(productId))
  }, [productId, dispatch])

  /* 
    This useEffect hook will set the allCategory hook to 'categories' payload. 
  */
  useEffect(() => {
    if (categories.length > 0) {
      setAllCategory(categories)
    }
  }, [categories])


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
    const imageChange = (img, files) => {
      if (files.length > 0) {
        const formData = new FormData()
        formData.append('oldImage', img)
        formData.append('newImage', files[0])
        formData.append('productId', productId)

        dispatch(update_product_image(formData))
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


  /* 
    This useEffect hook will set the state variable to the product info fetched from only 1 product. 
  */
    useEffect(() => {
      if (product) {
        setState({
          name: product.name,
          description: product.description,
          discount: product.discount,
          price: product.price,
          brand: product.brand,
          stock: product.stock,
          productId: product._id
        });
        setCategory(product.category);
        setImageShow(product.images || []);
      }
    }, [product]);

  /*
    This Function is used to handle form submission.
  */  
    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(update_product(state))
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
      }
    }, [errorMessage, successMessage, dispatch])



  return (
    <Container sx={{ marginY: "6rem" }}>
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
                  id="product name"
                  label="Product Name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  size="small"
                  autoFocus
                  required
                  fullWidth
                  value={state.name}
                  onChange={inputHandle}
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
                  onChange={inputHandle}
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
                  onChange={inputHandle}
                  sx={{ marginRight: '8px' }}
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
                  onChange={inputHandle}
                  sx={{ marginRight: '8px' }}
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
                  onChange={inputHandle}
                />
              </TextFieldWrap>

              <Box>
                <TextField
                  id="outlined-multiline-static"
                  label="Description"
                  name="description"
                  multiline
                  rows={4}
                  variant="outlined"
                  required
                  value={state.description}
                  onChange={inputHandle}
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
                  <Box 
                    sx={{ 
                      marginBottom:  { xs: '.5rem', sm : '.5rem', md: '.5rem' },  display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
                        {/* Show uploaded images here */}
                      {
                        imageShow.map((img, i) => <Box key={i} sx={{ height: '180px', width: '180px', position: 'relative'}}>
                          <label htmlFor={i}>
                            <img src={img} alt="product" style={{ width: '100%', height: '100%' }} />
                          </label>
                          <input multiple type="file" id={i} onChange={(e) => imageChange(img, e.target.files)} style={{ opacity: '0' }} />
                          <button 
                            onClick={(e) => {
                              e.preventDefault(); // Prevent default behavior (scrolling)
                              removeImage(i);
                            }}
                            style={{
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
                            }}>
                            X
                          </button>
                        </Box>)
                      }
                      {/* Show uploaded images code ends here */}

                      {/* Upload new Images Box */}
                      <Box component='label'
                        htmlFor="product_images"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '180px',
                          width: '200px',
                          cursor: 'pointer',
                          border: '1px dashed #C0C0C0',
                          borderRadius: '5px',
                          background: '#F5F5F5',
                        }}
                      >
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                          <span><ImageOutlinedIcon/></span>
                          <Typography variant='subtitle2' color='primary'>Browse Images</Typography>
                          <input multiple type="file"  onChange={imageHandle} id="product_images" style={{ marginLeft: '2.5rem', opacity: '0' }}/>
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
                  { loader ? <CircularProgress color="inherit" size="1.5em"/> : 'Update Product' }
                </Button>
                    
            </Grid>

            </Box>
          </Paper>
        </Grid>

      </Grid>
    </Container>
  )
}

export default UpdateProduct


