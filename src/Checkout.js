import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  getDialogContentTextUtilityClass,
  Slide,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { contxtname } from "./Context";
import apicall from "./db.js";
import { v4 as uid } from "uuid";
import { useNavigate } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const Checkout = () => {
  const contxt = React.useContext(contxtname);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [mob_no, setMob_no] = useState("");
  const [home_no, setHome_no] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [ttl, setTtl] = useState("");
  const [offer, setOffer] = useState("");
  const [ttldis, setTtlDis] = useState(0);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    let total = 0;
    contxt.addtocartstate.map((i) => {
      let q = Number(i.quantity);
      let p = Number(i.price);
      total = total + q * p;
    });
    setTtl(total);
  }, contxt.cartcount);
  const discount = () => {
    if(offer === "AKASH100"){
      setTtlDis(100);
    }
    else{
      alert("Enter valid code")
    }
    
  };
  const placeorder = async () => {
    if (name == "" || home_no == "" || city == "" || state == "" || pin == "") {
      handleClickOpen();
    } else {
      let items = {
        id: uid,
        date:
          new Date().getDate() +
          "/" +
          new Date().getMonth() +
          "/" +
          new Date().getYear(),
        userid: contxt.userID,
        orderitems: contxt.addtocartstate,
        name: name,
        total: ttl-ttldis,
        address: home_no + ", " + city + ", " + state + ", " + pin,
        mob_number: mob_no,
      };

      try {
        await apicall.post("/orders/", items);
        contxt.addtocartstate.map(async (i) => {
          try {
            await apicall.delete(`/addtocart/${i.id}`);
            contxt.setAddtocartstate([]);
            contxt.setCartCount(0);
          } catch (er) {
            console.log(er);
          }
        });
        let allorders = await apicall.get(`/orders`);
        contxt.setOrders(allorders.data);
        navigate("/orders");
      } catch (e) {
        console.log(e);
      }
      setTtl(0);
    }
  };

  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"All fields are mandatory?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>{" "}
      <h1 style={{ marginTop: "100px", marginLeft: "20px" }}>Checkout </h1>
      <div className="productdetailspage">
        <div
          className="detailpropicdiv"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="standard-basic"
            label="Enter your name"
            variant="standard"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Enter mobile number(optional if you want to change)"
            variant="standard"
            onChange={(e) => {
              setMob_no(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Enter House number"
            variant="standard"
            onChange={(e) => {
              setHome_no(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Enter City"
            variant="standard"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Enter State"
            variant="standard"
            onChange={(e) => {
              setState(e.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            label="Enter PIN Code"
            variant="standard"
            onChange={(e) => {
              setPin(e.target.value);
            }}
          />
        </div>
        <hr />
        <div className="detailprocartdiv">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <TextField
              sx={{ width: "80%" }}
              id="standard-basic"
              label="Enter 'AKASH100' and get 100 rupees cashback"
              variant="standard"
              onChange={(e) => {
                setOffer(e.target.value);
              }}
            />
            <div onClick={discount} className="applybtn">
              Apply
            </div>
          </div>
          <p className="detailproname">
            <u>Details</u>
          </p>
          <div className="specicationdetails">
            <p>Number of Products : </p>
            <p> &nbsp;&nbsp; {contxt.cartcount}</p>
          </div>
          <div className="specicationdetails">
            <p>Total : </p>
            <p> &nbsp;&nbsp; ₹{ttl-ttldis}</p>
          </div>
          <div className="specicationdetails">
            <p>Total Discount : </p>
            <p> &nbsp;&nbsp; ₹{ttldis}</p>
          </div>
          <hr />
          <div className="cartbox">
            <div onClick={placeorder} className="addtocartbtndetails">
              Place Order
            </div>
          </div>
          <hr />
        </div>
      </div>
    </>
  );
};

export default Checkout;
