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
import UserTable from './userTable';


const theme = createTheme({
  palette:{
    success: {
      main: '#ffffff'
    }
  }
})



const UserComponent = () => {

   
  const [users,setUsers] = React.useState([]);
  const [totalUsers,setTotalUsers] = React.useState(0);
  const [adminUser,setAdminUser] = React.useState(0);
  const [totalOrderByUser,setTotalOrderByUsers] = React.useState(0);

   const fillRows = ()=>{

     var rows = [];
     users.map( (user,index)=>{
          
        
           axios.get("http://localhost:4000/api/users/orderscount/"+user._id)
          .then((orders)=>orders.data)
          .then((order)=>{setTotalOrderByUsers(order.length);})
          .catch((error)=>{
            console.log("User not found");
          });

          rows[index]= {id:index,
                        user:user.username,
                        email:user.email,
                        orders: totalOrderByUser,
                        date:user.createdAt};

     });
        return rows;

   }

   const getUsers = ()=>{
     axios.get("http://localhost:4000/api/users/").
     then((res)=> res.data).
     then((r)=>{setUsers(r);
     r.map(user=>{
         if(user.isAdmin==true){
             setAdminUser(a=>a+1);
         }
         setTotalUsers(u=>u+1);
     });

     
     })
     .catch((err)=>{
       console.log(err);
     });
   }

   

   React.useEffect(getUsers,[]);



  return (
    <ThemeProvider theme={theme}>
    <Container>
      <Grid container spacing={3}>
        <Grid item  sm={12} md={6} lg={4}>
           {}
          <TagCard
            title={"Total Users"}
            value={totalUsers}
            icon={<AutorenewIcon fontSize="large" color="success"/>}
            category="cash"
            background="#32c225"
          />
        </Grid>
        <Grid item  sm={12} md={6} lg={4}>
          <TagCard
            title={"Admin Users"}
            value={adminUser}
            icon={<AssignmentTurnedInIcon fontSize="large" color="success" />}
            category="cash"
            background="#2581c2"
          />
        </Grid>
      </Grid>

      <UserTable  rows={fillRows()} ></UserTable>
    </Container>
    </ThemeProvider>
  );
};
export default UserComponent;
