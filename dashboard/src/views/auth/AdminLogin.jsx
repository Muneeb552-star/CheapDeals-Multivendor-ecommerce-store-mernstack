import { useEffect, useState } from "react";
import { adminAvatar } from "../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { admin_login, clearMessage } from "../../store/Slices/authSlice";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Importing Material UI Components
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from "@mui/material/Checkbox";
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from '@mui/material/Button';


// Function to Handle SignIn Form
export default function AdminLogin() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage  } = useSelector(state => state.auth)

  const [state, setState] = useState({ email: '', password: '' })

  const handleInput = (e) => { setState({ ...state, [e.target.name]: e.target.value }) } 

  // Function to handle Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(admin_login(state))
  };

  useEffect(() => {
    if(errorMessage) {
      toast.error(errorMessage)
      dispatch(clearMessage());
    }

    if(successMessage) {
      toast.success(successMessage)
      dispatch(clearMessage());
      setTimeout(() => {
        navigate('/');
      }, 1500); 
    }
  }, [errorMessage, successMessage, dispatch, navigate])


  return (
    <Container component="main" maxWidth="sm">
      {/* Form Wrapper */}
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginY: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "#ffffff"
        }}
      >
        {/* Welcome text Starts Here */}
        <div className="admin__avatar">
            <img src={adminAvatar} alt="admin" style={{ width: "70px", height: "75px" }}/>
        </div>
        <Typography variant="h5"> ADMIN LOGIN </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Email input */}
          <TextField
            id="email"
            margin='normal'
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            value={state.email}
            onChange={handleInput}
          />

          {/* Password input */}
          <TextField
            id="password"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
            value={state.password}
            onChange={handleInput}
          />

          {/* Remember me checkbox */}
          <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me"/>

          {/* Sign In button */}
            <Button
              type="submit"
              className="btn-success"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: '15px', height: '40px' }}
              disabled={loader ? true : false}
            >
              { loader ? <CircularProgress color="inherit" size="1.5em"/> : 'Sign In' }
            </Button>

          {/* Forgot password and Sign Up links */}
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

