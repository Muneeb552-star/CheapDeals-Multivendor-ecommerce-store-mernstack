import Chart from 'react-apexcharts'
import { Link } from 'react-router-dom';

// Material UI imports
import { Container, Box, Paper, Typography, styled, Grid, Avatar } from "@mui/material"

//Material UI Table Imports
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//Material UI Icons Import
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';

/* 
  This is the custom styled (div) tag used in component's body 
*/
const TextContainer = styled('div')({
  display: "flex",
  flexDirection: "column",
  justifyContent: 'space-between'
});


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 'pending', 24, 'view'),
  createData('Ice cream sandwich', 237, 'pending', 37, 'view'),
  createData('Eclair', 262, 'pending', 24, 'view'),
  createData('Cupcake', 305, 'pending', 67, 'view'),
  createData('Gingerbread', 356, 'pending', 49, 'view'),
];




const AdminDashboard = () => {

  // React Apex-charts State Data
  const state = {
    series: [
      {
        name: "Orders",
        data: [34, 65, 34, 65, 34, 65, 34, 34, 34, 56, 23, 45]
      },
      {
        name: "Revenue",
        data: [34, 32, 45, 32, 34, 34, 43, 56, 65, 67, 45, 78]
      },
      {
        name: 'Sellers',
        data: [78, 32, 34, 54, 65, 34, 54, 21, 54, 43, 45, 43]
      }
    ],
    options : {

      color : ['#181ee8', '#181ee8'],
      plotOptions : {
        radius : 30
      },
      chart : {
        background : 'transparent',
      },
      dataLabels : {
        enabled : false
      },
      stroke : {
        show : true,
        curve : ['smooth', 'straight', 'stepline'],
        lineCap : 'butt',
        colors : '#f0f0f0',
        width : .5,
        dashArray : 0
      },
      xaxis : {
        categories : ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      legend : {
        position : 'top'
      },
      responsive : [
        {
          breakpoint : 565,
          yaxis : {
            categories : ['Jan', 'Feb', 'Mar', 'Apl', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          options : {
            plotOptions : {
              bar : {
                horizontal : true
              }
            },
            chart : {
              height : '550px'
            }
          }
        }
      ]
    }
  }

  return (
    <Box>
     
        <Grid container spacing={3}>

          {/* Top 4 Grids */}
          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>  
            <Paper elevation={2}>
              <Box p={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextContainer>
                    <Typography variant="h4"> $1350</Typography>
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
                    <Typography variant="h4"> 20</Typography>
                    <Typography variant="span"> Products </Typography>
                </TextContainer>
                <Box sx={{ background: '#e000e81f', color: '#fff', padding: '10px', borderRadius: '10px' }}>
                  <SellIcon fontSize='large' sx={{ color: '#cd00e8' }} />
                </Box>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>  
            <Paper elevation={2}>
              <Box p={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextContainer>
                    <Typography variant="h4"> 50</Typography>
                    <Typography variant="span"> Sellers </Typography>
                </TextContainer>
                <Box sx={{ background: '#00cfe81f', color: '#fff', padding: '10px', borderRadius: '10px' }}>
                  <Diversity3OutlinedIcon  fontSize='large' sx={{ color: '#00cfe8' }}/>
                </Box>
              </Box>
          </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={3} xl={3}>  
            <Paper elevation={2}>
              <Box p={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <TextContainer>
                    <Typography variant="h4"> 100</Typography>
                    <Typography variant="span"> Orders </Typography>
                </TextContainer>
                <Box sx={{ background: '#7367f01f', color: '#fff', padding: '10px', borderRadius: '10px' }}>
                  <ShoppingCartOutlinedIcon fontSize='large' sx={{ color: '#7367f0' }}/>
                </Box>
              </Box>
          </Paper>
          </Grid>
          

          {/* React Apex Charts Component */}
          <Grid item xs={12} sm={12} md={12} lg={7} xl={7} >
              <Paper elevation={2}>
                <Box p={2}>
                  <Chart options={state.options} series={state.series} type='bar' height={300}/>
                </Box>
              </Paper>
          </Grid>
        

          {/* Recent Chat Messages Section */}
          <Grid item xs={12} sm={12} md={12} lg={5} xl={5} >
              <Paper elevation={2}>
                <Box p={2}>

                  {/* Chat Box Top Text */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingY: '1rem' }}>
                    <Typography variant='span'> Recent Seller Message </Typography>
                    <Link to='/'><Typography variant='subtitle2' pl={2} pr={2}>View All</Typography></Link>
                  </Box>

                  {/* List Items Section Starts Here */}
                    <Box sx={{ display: 'flex', marginY: '1rem'}}>
                      <Avatar 
                        alt="Remy Sharp" 
                        sx={{ width: '30', height: '30', cursor: 'pointer' }} 
                        src="https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                      />
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant='subtitle2' pl={2} pr={2}>Admin</Typography>
                          <Typography variant='subtitle2'>10:42 PM</Typography>
                        </Box>
                        <Typography pl={2}> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</Typography>
                      </Box>
                    </Box>


                    <Box sx={{ display: 'flex', marginY: '1rem' }}>
                      <Avatar 
                        alt="Remy Sharp" 
                        sx={{ width: '30', height: '30', cursor: 'pointer' }} 
                        src="https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                      />
                      <Box sx={{ width: '100%' }} >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant='subtitle2' pl={2} pr={2}>Admin</Typography>
                          <Typography variant='subtitle2'>10:42 PM</Typography>
                        </Box>
                        <Typography pl={2}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </Typography>
                      </Box>
                    </Box>


                    <Box sx={{ display: 'flex', marginY: '1rem' }}>
                      <Avatar 
                        alt="Remy Sharp" 
                        sx={{ width: '30', height: '30', cursor: 'pointer' }} 
                        src="https://images.unsplash.com/photo-1615109398623-88346a601842?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80" 
                      />
                      <Box sx={{ width: '100%' }} >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant='subtitle2' pl={2} pr={2}>Admin</Typography>
                          <Typography variant='subtitle2'>10:42 PM</Typography>
                        </Box>
                        <Typography pl={2}> Lorem ipsum, dolor sit amet consectetur adipisicing elit. </Typography>
                      </Box>
                    </Box>

                    {/* List Items Section Ends Here */}

                </Box>
              </Paper>
          </Grid>

          {/* Recent Orders Section Starts Here */}
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>  
              <TableContainer component={Paper}>
                <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                  <Table aria-label="simple table" sx={{ overflowX: 'auto' }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>ORDER ID</TableCell>
                        <TableCell align="right">PRICE</TableCell>
                        <TableCell align="right">PAYMENT STATUS</TableCell>
                        <TableCell align="right">ORDER STATUS</TableCell>
                        <TableCell align="right">ACTIVE</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </TableContainer>
          </Grid>
        
      </Grid>            
    </Box>
  )
}

export default AdminDashboard