import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { seller_register, clearMessage } from "../../store/Slices/authSlice";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
/* MUI Imports */
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CircularProgress } from "@mui/material";


// Function to Handle SignIn Form
export default function Register() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loader, errorMessage, successMessage  } = useSelector(state => state.auth)
  
  const [state, setState] = useState({ name: '', email: '', password: '' })

  const handleInput = (e) => { setState({ ...state, [e.target.name]: e.target.value }) } 

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(seller_register(state))
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
      }, 1500); // Delay navigation for 2 seconds (adjust the time as needed)
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
          background: "#ffffff",
        }}
      >
        {/* Welcome text Starts Here */}
        <Typography variant="h5" align="center">Welcome to cheapDeals.</Typography>
        <Typography variant="subtitle2" mt={2}>
          {" "}
          Please register to your account & start your business{" "}
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {/* Name input */}
          <TextField
            margin="normal"
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            required
            fullWidth
            value={state.name}
            onChange={handleInput}
          />

          {/* Email input */}
          <TextField
            margin="normal"
            id="email"
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
            margin="normal"
            name="password"
            label="Password"
            type="password"
            id="password"
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
            sx={{ mt: 3, mb: 2, borderRadius: "15px" }}
            disabled={loader ? true : false}
          >
            { loader ? <CircularProgress color="inherit" size="1.5em"/> : 'Register' }
          </Button>

          {/* Forgot password and Sign Up links */}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>

            <Grid item>
              <Link to="/login" variant="body2">
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>

        </Box>
      </Box>
    </Container>
  );
}