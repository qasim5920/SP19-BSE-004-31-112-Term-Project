import React from "react";
import Dashboard from "./Components/dashboardComponents/dashboard";
import Layout from "./Components/dashboardComponents/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import  Ass  from './Components/dashboardComponents/Drawer'
import UserComponent from './Components/dashboardComponents/userComponent'
import ProductComponent from './Components/dashboardComponents/productComponent'
import AddProduct from './Components/dashboardComponents/AddProduct'
import Analysis from './Components/dashboardComponents/analysis';
import UpdateProduct from './Components/dashboardComponents/UpdateProduct'


function App() {
  return (
    <Router>
      <Layout>
      <Routes>
              <Route path='/dashboard/analysis' element={<Analysis />} />
        <Route path='/dashboard/products/update/:id' element={<UpdateProduct/>} />
        <Route  path='/dashboard/home' element={<Dashboard/>} />
        <Route exact path='/dashboard/products' element={<ProductComponent/>} />
        <Route path='/dashboard/users' element={<UserComponent />} />
        <Route path='/dashboard/products/addProduct' element={<AddProduct />} />
      </Routes>
      </Layout>
    </Router>
  );
}



export default App;
