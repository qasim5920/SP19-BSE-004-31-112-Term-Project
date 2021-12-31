import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Textarea from "@mui/material/TextareaAutosize";
import { useNavigate ,useLocation} from "react-router-dom";
import axios from "axios"

const UpdateProduct = (props) => {

 const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [small, setSmall] = React.useState(false);
  const [medium, setMedium] = React.useState(false);
  const [large, setLarge] = React.useState(false);
  const [Xlarge, setXlarge] = React.useState(false);
  const [red, setRed] = React.useState(false);
  const [green, setGreen] = React.useState(false);
  const [blue, setBlue] = React.useState(false);
  const [black, setBlack] = React.useState(false);
  const [yellow, setYellow] = React.useState(false);
  const [formal, setFormal] = React.useState(false);
  const [inFormal, setInFormal] = React.useState(false);

  const [titleErr, setTitleErr] = React.useState(false);
  const [priceErr, setPriceErr] = React.useState(false);
  const [quantityErr, setQuantityErr] = React.useState(false);
  const [imageErr, setImageErr] = React.useState(false);
  const [descErr, setDescErr] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    var object = {
      title: "",
      desc: "",
      img: "",
      categories: [],
      size: [],
      color: [],
      price:0,
      quantity: 0,
      inStock: true,
    };
    if (title == "") setTitleErr(true);
    if (desc == "") setDescErr(true);
    if (image == "") setImageErr(true);
    if (quantity == null) setQuantityErr(true);
    if (price == null) setPriceErr(true);

    if (title && desc && image && quantity && price) {
      object.title = title;
      object.quantity = quantity;
      object.img = image;
      object.desc = desc;
      object.price = price;
      if (formal) object.categories.push("Formal");
      if (inFormal) object.categories.push("InFormal");
      if (small) object.size.push("S");
      if (medium) object.size.push("M");
      if (large) object.size.push("L");
      if (Xlarge) object.size.push("X");
      if (red) object.color.push("Red");
      if (green) object.color.push("Green");
      if (blue) object.color.push("Blue");
      if (black) object.color.push("Black");
      if (yellow) object.color.push("Yellow");

      console.log(object);
        let cat = object.category;
        let co = object.color;
     let s = object.size;
     let id = location.pathname.split('/')[4];
       axios.put("http://localhost:4000/api/products/"+id,object).then((response) => {

         console.log(response)
         alert("successfully Update");
         }
       
       )
       .catch((error) => console.log(error));
  }}
 

  
  const handleData = () => {
    let id = location.pathname.split('/')[4]
    console.log(id)
   let product = {};
    axios.get('http://localhost:4000/api/products/'+id).then((response) => {
          console.log(response.data);
          product = response.data;
          setTitle(product.title);
          setPrice(product.price);
          setQuantity(product.quantity);
          setDesc(product.desc);
          setImage(product.img);

          if(product.color.includes("Red") ) setRed(true);
          if(product.color.includes("Yellow")) setYellow(true);
          if(product.color.includes("Black")) setBlack(true);
          if(product.color.includes("Blue")) setBlue(true);
          if(product.color.includes("Green")) setGreen(true);

          if(product.size.includes("S")) setSmall(true);
         if(product.size.includes("M")) setMedium(true);
          if(product.size.includes("L")) setLarge(true);
          if(product.size.includes("XL")) setXlarge(true);

          if(product.categories.includes("Formal")) setFormal(true);
          if(product.categories.includes("InFormal")) setInFormal(true);







    setDesc(product.description);
    }).catch((err) => {console.log(err)});

    

  }

    React.useEffect(handleData,[]);

  return (
    <Box
      sx={{
        marginTop: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h4">
      Update Product
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <TextField
              onChange={(e) => {
                setTitle(e.target.value);
                console.log(e.target.value);
              }}
              id="title"
              label="Product Title"
              name="title"
              autoComplete="Product"
              variant="standard"
              fullWidth
              error={titleErr}
              value={title}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              onChange={(e) => setPrice(e.target.value)}
              id="price"
              label="Price"
              name="price"
              autoComplete="0"
              variant="standard"
              type="number"
              fullWidth
              error={priceErr}
              value={price}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              onChange={(e) => setQuantity(e.target.value)}
              id="quantity"
              label="quantity"
              name="quantity"
              autoComplete="0"
              variant="standard"
              type="number"
              fullWidth
              error={quantityErr}
              value={quantity}
            />
          </Grid>

          <Grid item xs={6} sm={4}>
            <Grid item xs={3} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox  checked={red}  onChange={(e) => setRed(e.target.checked)} />
                }
                label="Red"
              />
            </Grid>

            <Grid item xs={3} sm={3}>      
              <FormControlLabel
                control={
                  <Checkbox  checked={green} onChange={(e) => setGreen(e.target.checked)} />
                }
                label="Green"
              />
            </Grid>

            <Grid item xs={3} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox  checked={black} onChange={(e) => setBlack(e.target.checked)} />
                }
                label="Black"
              />
            </Grid>

            <Grid item xs={3} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox  checked={blue} onChange={(e) => setBlue(e.target.checked)} />
                }
                label="Blue"
              />
            </Grid>
            <Grid item xs={3} sm={3}>
              <FormControlLabel
                control={
                  <Checkbox  checked={yellow} onChange={(e) => setYellow(e.target.checked)} />
                }
                label="Yellow"
              />
            </Grid>
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              onChange={(e) => setDesc(e.target.value)}
              id="desc"
              label="Description"
              name="desc"
              autoComplete="This a Product"
              variant="filled"
              multiline
              rows={7}
              fullWidth
              value={desc}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              onChange={(e) => setImage(e.target.value)}
              id="img"
              label="Image Link"
              name="img"
              autoComplete="This a img"
              variant="standard"
              fullWidth
              error={imageErr}
              value={image}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <h3>Size</h3>
            <FormControlLabel
              control={
                <Checkbox  checked={small} onChange={(e) => setSmall(e.target.checked)} />
              }
              label="S"
            />
            <FormControlLabel
              control={
                <Checkbox  checked={medium} onChange={(e) => setMedium(e.target.checked)} />
              }
              label="M"
            />
            <FormControlLabel
              control={
                <Checkbox  checked={large} onChange={(e) => setLarge(e.target.checked)} />
              }
              label="L"
            />
            <FormControlLabel
              control={
                <Checkbox   checked={Xlarge} onChange={(e) => setXlarge(e.target.checked)} />
              }
              label="XL"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <h3>Category</h3>
            <FormControlLabel
              control={
                <Checkbox   checked={formal} onChange={(e) => setFormal(e.target.checked)} />
              }
              label="Formal"
            />
            <FormControlLabel
              control={
                <Checkbox checked={inFormal} onChange={(e) => setInFormal(e.target.checked)} />
              }
              label="In Formal"
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Button color="primary" fullWidth type="submit">
              Update
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UpdateProduct;
