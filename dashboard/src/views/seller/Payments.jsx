import { FixedSizeList as List } from 'react-window'
import { forwardRef } from 'react';
// Material UI imports
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  styled, 
  Grid,
  TextField,
  Button,
  Chip
} from "@mui/material"

/* Material UI Icons Import */
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

/* This function will be used as an outer div wrapper in 'List' component of react-window  */
const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} {...props} />
))

/* This is the custom styled (div) tag used in component's body */
const TextContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  justifyContent: 'space-between'
});

const Payments = () => {

  const Row = ({ index, style }) => {
    return (
      <Box style={style} sx={{ display: 'flex' }}>
        <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} >{index + 1}</Box>
        <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} >$500</Box>
        <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} ><Chip label="pending" size="small" className='text-green-dark'/></Box>
        <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} >12 Jun 2023</Box>
      </Box>
    )
  }

  return (
    <Box>
     
        <Grid container spacing={3}>

          {/* Top 4 Grids */}
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>  
            <Paper elevation={2}>
              <Box p={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextContainer>
                    <Typography variant="h4"> $100</Typography>
                    <Typography variant="span"> Total Sales </Typography>
                </TextContainer>
                <Box sx={{ background: '#28c76f1f', color: '#fff', padding: '10px', borderRadius: '10px' }}>
                  <MonetizationOnIcon  fontSize='large' sx={{ color: '#28c76f' }}/>
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>  
            <Paper elevation={2}>
              <Box p={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextContainer>
                    <Typography variant="h4"> $2000</Typography>
                    <Typography variant="span"> Available Amount </Typography>
                </TextContainer>
                <Box sx={{ background: '#e000e81f', color: '#fff', padding: '10px', borderRadius: '10px' }}>
                  <MonetizationOnIcon fontSize='large' sx={{ color: '#cd00e8' }} />
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>  
            <Paper elevation={2}>
              <Box p={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextContainer>
                    <Typography variant="h4"> $500</Typography>
                    <Typography variant="span"> Withdrawal Amount </Typography>
                </TextContainer>
                <Box sx={{ background: '#00cfe81f', color: '#fff', padding: '10px', borderRadius: '10px' }}>
                  <MonetizationOnIcon  fontSize='large' sx={{ color: '#00cfe8' }}/>
                </Box>
              </Box>
          </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>  
            <Paper elevation={2}>
              <Box p={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextContainer>
                    <Typography variant="h4"> $1500</Typography>
                    <Typography variant="span"> Pending Amount </Typography>
                </TextContainer>
                <Box sx={{ background: '#7367f01f', color: '#fff', padding: '10px', borderRadius: '10px' }}>
                  <MonetizationOnIcon fontSize='large' sx={{ color: '#7367f0' }}/>
                </Box>
              </Box>
          </Paper>
          </Grid>

          {/* Send Request Component */}
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
              <Paper elevation={2}>
                <Box p={2}>
                  <Typography variant="h5">Send Request</Typography>
                    <Box sx={{ display: 'flex', justifyContent:'space-between',  alignItems: 'center', marginBottom: '1rem' }}>
                      <TextField
                        id="amount"
                        margin="normal"
                        name="amount"
                        label="Amount"
                        type="number"
                        autoComplete="number"
                        required
                        fullWidth
                        size="small"
                        // value={password}
                        // onChange={e => setPassword(e.target.value)}
                      />
                      <Button type="submit" variant="contained" sx={{ mt: 1, marginLeft: '.5rem' }}>Submit</Button>
                    </Box>

                    <Typography variant="subtitle1">Pending Request</Typography>
                    <Box sx={{ width: '100%', marginTop: '1rem' }}>
                      <Box sx={{ width: '100%', overflow: 'auto' }}>
                        <Box className="bg-blue-dark" sx={{ display: 'flex', minWidth: '340px' }}>
                          <Box flex={1} p={1}>No</Box>
                          <Box flex={1} p={1}>Amount</Box>
                          <Box flex={1} p={1}>Status</Box>
                          <Box flex={1} p={1}>Date</Box>
                        </Box>
                          {
                            <List 
                              style={{ minWidth: '340px' }}
                              className='List'
                              height={100}
                              itemCount={10}
                              itemSize={35}
                              outerElementType={outerElementType}
                            >
                              {Row}
                            </List>
                          }
                      </Box>
                    </Box>
                </Box>
              </Paper>
          </Grid>

          {/* Successfully Withdraw Component */}
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6} >
              <Paper elevation={2}>

                <Box p={2}>
                  <Typography variant="h5">Success Withdrawl</Typography>
                  <Box sx={{ width: '100%', marginTop: '1rem' }}>
                      <Box sx={{ width: '100%', overflow: 'auto' }}>
                        <Box className="bg-blue-dark" sx={{ display: 'flex', minWidth: '340px' }}>
                          <Box flex={1} p={1}>No</Box>
                          <Box flex={1} p={1}>Amount</Box>
                          <Box flex={1} p={1}>Status</Box>
                          <Box flex={1} p={1}>Date</Box>
                        </Box>
                          {
                            <List 
                              style={{ minWidth: '340px' }}
                              className='List'
                              height={100}
                              itemCount={10}
                              itemSize={35}
                              outerElementType={outerElementType}
                            >
                              {Row}
                            </List>
                          }
                      </Box>
                    </Box>
                </Box>

              </Paper>
          </Grid>

        </Grid>
    </Box>
  )
}

export default Payments