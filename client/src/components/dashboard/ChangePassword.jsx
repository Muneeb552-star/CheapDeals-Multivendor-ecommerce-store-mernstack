import React, { useState } from 'react'
/* MUI imports */
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Button from '@mui/material/Button'

const ChangePassword = () => {

  const [state, setState] = useState({ oldPassword: '', newPassword: '' })

  const handleInput = (e) => { setState({ ...state, [e.target.name]: e.target.value }) }

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(seller_login(state))
  }

  return (
    <div className='p-4 bg-white'>
      <h2 className='text-xl text-slate-600 text-center pb-5'>Change Password</h2>
      {/* Form */}
      <Box component="form" onSubmit={handleSubmit} className='w-[40%] mx-auto md:w-full'>
          {/* Email input */}
          <TextField
            id="oldPassword"
            margin='normal'
            label="Old Password"
            name="oldPassword"
            type="password"
            autoComplete="password"
            autoFocus
            required
            fullWidth
            size="small"
            value={state.oldPassword}
            onChange={handleInput}
          />

          {/* Password input */}
          <TextField
            id="newPassword"
            margin="normal"
            name="newPassword"
            label="New Password"
            type="password"
            autoComplete="current-password"
            required
            fullWidth
            size="small"
            value={state.newPassword}
            onChange={handleInput}
          />

          {/* Sign In button */}
            <Button
              type="submit"
              color='warning'
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: '7px' }}
              // disabled={loader ? true : false}
            >
              {/* { loader ? <CircularProgress color="inherit" size="1.5em"/> : 'Sign In' } */}
              Update
            </Button>
        </Box>
    </div>
  )
}

export default ChangePassword