import React from 'react';
import TopMenu from './TopMenu'
import HomeCard from './homeCard'
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {Grid} from '@mui/material'

const Home = () => {
    return ( <div>
         <TopMenu/>
          
          <Grid container>
            <Grid item sm={6}>
               <HomeCard />
            </Grid>
          </Grid>
    </div>
     );
}
 
export default Home;