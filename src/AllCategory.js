import React from "react";
import { contxtname } from "./Context";
import apicall from "./db.js";
import ProductBox from "./ProductBox";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Slider,
} from "@mui/material";
import { Box } from "@mui/system";

// const minDistance = 10;
const AllProducts = () => {
  const contxt = React.useContext(contxtname);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [serchar, setSerchar] = React.useState([]);
  const open = Boolean(anchorEl);
  const [value, setValue] = React.useState([200, 2500]);

  React.useEffect(() => {
    setSerchar(contxt.products);
  }, [contxt.products]);
  function valuetext(value) {
    return value;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    let filtered = [];
    contxt.products.map((i) => {
      if (i.price > newValue[0] && i.price < newValue[1]) {
        filtered.push(i);
      }
    });
    console.log(filtered);
    setSerchar(filtered);
    console.log(serchar);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const addtocart = (e) => {
    contxt.products.map(async (i) => {
      if (i.id == e.target.id) {
        if (contxt.addtocartstate.length != 0) {
          contxt.addtocartstate.map(async (j) => {
            if (e.target.id == j.id) {
              let items = {
                id: j.id,
                pcategory: j.pcategory,
                pname: j.pname,
                quantity: j.quantity + 1,
                price: j.price,
                img: j.img,
              };
              console.log(contxt.addtocartstate);
              try {
                await apicall.put(`/addtocart/${i.id}`, items);
                let addtocart = await apicall.get("/addtocart");
                contxt.setAddtocartstate(addtocart.data);
              } catch (e) {
                console.log(e);
              }
            } else {
              let item = {
                id: i.id,
                pcategory: i.pcategory,
                pname: i.pname,
                quantity: 1,
                price: i.price,
                img: i.img,
              };
              console.log(item);
              console.log(contxt.addtocartstate);
              try {
                await apicall.post("/addtocart", item);
                let addtocart = await apicall.get("/addtocart");
                contxt.setAddtocartstate(addtocart.data);
                contxt.setCartCount(addtocart.data.length);
              } catch (e) {
                console.log(e);
              }
            }
          });
        } else {
          let item = {
            id: i.id,
            pcategory: i.pcategory,
            pname: i.pname,
            quantity: 1,
            price: i.price,
            img: i.img,
          };
          console.log(item);
          console.log(contxt.addtocartstate);
          try {
            await apicall.post("/addtocart", item);
            let addtocart = await apicall.get("/addtocart");
            contxt.setAddtocartstate(addtocart.data);
            contxt.setCartCount(addtocart.data.length);
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  };

  const detailspage = (e) => {
    contxt.setDetailid(e.target.id);
    navigate("/details");
  };
  const inc = () => {
    let ar1 = [...contxt.products];
    ar1.sort((a, b) => a.price - b.price);
    setSerchar(ar1);
  };
  const dec = () => {
    let ar1 = [...contxt.products];
    ar1.sort((a, b) => b.price - a.price);
    setSerchar(ar1);
  };

  return (
    <>
      <div
        style={{
          marginTop: "90px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Sort </InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            label="Age"
          >
            <MenuItem value={10} onClick={inc}>
              Price : Low to High
            </MenuItem>
            <MenuItem value={20} onClick={dec}>
              Price : High to Low
            </MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ width: "500px", marginRight: "100px", display: "flex" }}>
          <InputLabel
            sx={{
              width: "80px",
              fontSize: "18px",
              fontWeight: "bolder",
              marginTop: "40px",
            }}
            id="demo-select-small"
          >
            Filter
          </InputLabel>

          <Slider
            sx={{ marginTop: "40px" }}
            aria-label="Always visible"
            defaultValue={80}
            getAriaValueText={valuetext}
            min={200}
            max={2500}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="Always visible"
          />
        </Box>
      </div>
      
      {serchar.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "100px",
          }}
          className="categorypage"
        >
          <h1>No Product Found! </h1>
          <img alt="" style={{ width: "40%" }} src="no.png" />
        </div>
      ) : (
        <div className="categorypage">
          {serchar.map((i) => {
            return (
              <ProductBox
                productpic={i.img}
                productname={i.pname}
                productprice={i.price}
                id={i.id}
                category={i.pcategory}
                addtocartbtn={addtocart}
                showdetails={detailspage}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default AllProducts;
