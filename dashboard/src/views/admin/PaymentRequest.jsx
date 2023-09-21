import { FixedSizeList as List } from 'react-window'
import { forwardRef } from 'react';
import { Container, Grid, Paper, Typography, Box, Button, Chip } from "@mui/material"

const outerElementType = forwardRef((props, ref) => (
    <div ref={ref} {...props} />
))


const PaymentRequest = () => {

  const Row = ({ index, style }) => {
      return (
        <Box style={style} sx={{ display: 'flex' }}>
          <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} >{index + 1}</Box>
          <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} >$500</Box>
          <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} ><Chip label="pending" size="small" className='text-green-dark'/></Box>
          <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} >12 Jun 2023</Box>
          <Box flex={1} p={2} sx={{ whiteSpace: 'nowrap' }} ><Button size='small' className='bg-green-dark'>Confirm</Button></Box>
        </Box>
      )
    }

  return (
    <Container sx={{ marginTop: "6rem" }}>
      <Grid container spacing={2}>

        <Grid item xs={12}>
            <Paper sx={{ padding: ".5rem" }} elevation={2}>
                <Typography variant="h5">Payment Request</Typography>
            </Paper>
        </Grid>


        <Grid item xs={12}>   
           <Paper elevation={2}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ width: '100%', overflow: 'auto' }}>
                  <Box className="bg-blue-dark" sx={{ display: 'flex', minWidth: '340px' }}>
                    <Box flex={1} p={2}>No</Box>
                    <Box flex={1} p={2}>Amount</Box>
                    <Box flex={1} p={2}>Status</Box>
                    <Box flex={1} p={2}>Date</Box>
                    <Box flex={1} p={2}>Action</Box>
                  </Box>
                    {
                      <List 
                        style={{ minWidth: '340px' }}
                        className='List'
                        height={350}
                        itemCount={30}
                        itemSize={35}
                        outerElementType={outerElementType}
                      >
                        {Row}
                      </List>
                    }
                </Box>
              </Box>
           </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default PaymentRequest