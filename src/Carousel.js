import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button, Box, Typography } from '@mui/material'

export default function MyCarousel()
{
    var items = [
        {
            name: "Random Name #3",
            pics : "https://image3.jdomni.in/banner/05022021/BB/98/7D/1690C225AFC975FEFDE5DCFBE0_1612505588680.png?output-format=webp"
        },
    
        {
            name: "Random Name #2",
            pics : "https://image2.jdomni.in/banner/05022021/25/BF/8D/481BE7B9EA65BF769CBA96A4C3_1612505688964.png?output-format=webp"
        }
    ]

    return (
        <Carousel>
            {
                items.map( (item, i) => <Item key={i} item={item} /> )
            }
        </Carousel>
    )
}

function Item(props)
{
    return (
        <Paper sx={{height:"inherit",marginTop:"70px",}}>
            <img style={{width:"100%"}} alt='' src={props.item.pics}/>
            {/* <Typography>
                {props.item.name}
            </Typography> */}
        </Paper>
      
    )
}