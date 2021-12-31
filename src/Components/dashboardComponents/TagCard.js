import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';


const TagCard = (probs) => {
    return ( 
       <Card   style={{ background: probs.background,color:"#ffffff"}}>
           <CardHeader action={<IconButton style={{ marginLeft:"2rem"}}>
              {probs.icon}
           </IconButton>}
           title = {probs.title} 
           />
           <CardContent>
               <Typography  variant="h4" >
                  {probs.value}
               </Typography>
            </CardContent>
       </Card>
    );
}
 
export default TagCard;