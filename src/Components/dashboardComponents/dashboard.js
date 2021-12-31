import { DeleteOutlined } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import TagCard from "./TagCard";
import Container from "@mui/material/Container";
import OrderTable from "./orderTable";
import {makeStyles} from "@mui/styles";
import AutorenewIcon from '@mui/icons-material/Autorenew';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {ThemeProvider ,createTheme} from '@mui/material/styles';
import axios from 'axios';


const theme = createTheme({
  palette:{
    success: {
      main: '#ffffff'
    }
  }
})

const useStyles = makeStyles(theme=>{
  return {
    
  }
})

const Dashboard = () => {

  const classes = useStyles();



 
   let sale = 0;
   
  const [orders,setOrders] = React.useState([]);
  const [username,setusername] = React.useState("");
  const [pendingOrders,setPendingOrders] = React.useState(0);
  const [completedOrders,setCompletedOrders] = React.useState(0);
  const [sales,setSales] = React.useState(0);

   const fillRows = ()=>{

     var rows = [];
     orders.map( (order,index)=>{
          
        
           axios.get("http://localhost:4000/api/orders/userorder/"+order._id)
          .then((user)=>user.data)
          .then((user)=>{setusername(user.username)})
          .catch((error)=>{
            console.log("User not found");
          });

          rows[index]= {id:index,
                        customer:username,
                        pq:order.products.length,
                        amount:order.amount,
                        status:order.status,
                        date:order.createdAt};

     });
        return rows;

   }

   
   const handleOrderCount = (amount)=>{
  
   }
   const getOrders = ()=>{
     axios.get("http://localhost:4000/api/orders/").
     then((res)=> res.data).
     then((r)=>{setOrders(r);
     r.map(order=>{
     setSales(sale => sale + order.amount);
         if(order.status == "completed")
           setCompletedOrders(c => c+1)
          if(order.status == "pending")
          setPendingOrders(p=>p+1)
     });

     
     })
     .catch((err)=>{
       console.log(err);
     });
   }

   

   React.useEffect(getOrders,[]);



  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Grid container spacing={3}>
        <Grid item  sm={12} md={6} lg={4}>
           {}
          <TagCard
            title={"Order In Queue"}
            value={pendingOrders}
            icon={<AutorenewIcon fontSize="large" color="success"/>}
            category="cash"
            background="#32c225"
          />
        </Grid>
        <Grid item  sm={12} md={6} lg={4}>
          <TagCard
            title={"Completed Orders"}
            value={completedOrders}
            icon={<AssignmentTurnedInIcon fontSize="large" color="success" />}
            category="cash"
            background="#2581c2"
          />
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <TagCard
            title={"Total Earning"}
            value={sales}
            icon={<AttachMoneyIcon fontSize='large' color='success' />}
            category="cash"
            background="#8a1248"
          />
        </Grid>
      </Grid>

      <OrderTable  rows={fillRows()} ></OrderTable>
    </Container>
    </ThemeProvider>
  );
};
export default Dashboard;
