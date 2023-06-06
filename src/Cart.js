import * as React from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { contxtname } from "./Context";
import {
  Button,
  IconButton,
  Snackbar,
  TableBody,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import apicall from "./db.js";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const sty = { fontSize: "20px", fontWeight: "900" };

export default function Cart() {
  const contxt = React.useContext(contxtname);
  const navigate = useNavigate();
  const [opndel, setOpndel] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClickconfirm = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseconfirm = () => {
    setAnchorEl(null);
  };

  const open1 = Boolean(anchorEl);
  const id = open1 ? "simple-popover" : undefined;

  const cancel = () => {
    setAnchorEl(null);
  };
  const checkout = () => {
    if (contxt.userID == "") {
      handleClickOpengoforlogin();
    } else {
      navigate("/checkout");
    }
  };
  const lessit = (e) => {
    contxt.addtocartstate.map(async (j) => {
      if (e == j.id) {
        if (j.quantity == 1) {
          handleClickSnack();
        } else {
          let items = {
            id: j.id,
            pcategory: j.pcategory,
            pname: j.pname,
            quantity: j.quantity - 1,
            price: j.price,
            img: j.img,
          };
          console.log(contxt.addtocartstate);
          try {
            await apicall.put(`/addtocart/${j.id}`, items);
            let addtocart = await apicall.get("/addtocart");
            contxt.setAddtocartstate(addtocart.data);
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  };
  const addit = async (e) => {
    contxt.addtocartstate.map(async (j) => {
      if (e == j.id) {
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
          await apicall.put(`/addtocart/${j.id}`, items);
          let addtocart = await apicall.get("/addtocart");
          contxt.setAddtocartstate(addtocart.data);
        } catch (e) {
          console.log(e);
        }
      }
    });
  };
  const deletefromcart = async (e) => {
    try {
      await apicall.delete(`/addtocart/${e}`);
      let addtocart = await apicall.get("/addtocart");
      contxt.setAddtocartstate(addtocart.data);
      contxt.setCartCount(addtocart.data.length);
      handleCloseconfirm();
    } catch (er) {
      console.log(er);
    }
  };
  const emptycart = () => {
    contxt.addtocartstate.map(async (i) => {
      try {
        await apicall.delete(`/addtocart/${i.id}`);
        contxt.setAddtocartstate([]);
        contxt.setCartCount(0);
      } catch (er) {
        console.log(er);
      }
    });
    handleClose();
  };

  const [open, setOpen] = React.useState(false);
  const [goforlogin, setGoforlogin] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpengoforlogin = () => {
    setGoforlogin(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClosegoforlogin = () => {
    setGoforlogin(false);
  };
  const [opensnack, setOpensnack] = React.useState(false);

  const handleClickSnack = () => {
    setOpensnack(true);
  };

  const handleClosesnack = () => {
    setOpensnack(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClosesnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={opensnack}
        autoHideDuration={1000}
        onClose={handleClosesnack}
        message="Quantity can't be zero"
        action={action}
      />
      <Dialog
        open={goforlogin}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClosegoforlogin}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"First you have to log in yourself!"}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClosegoforlogin}>Ok</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you really want to empty cart?"}</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>NO</Button>
          <Button onClick={emptycart}>YES</Button>
        </DialogActions>
      </Dialog>
      {contxt.cartcount == 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "100px",
          }}
        >
          <h1>Cart is empty</h1>
          <img alt="" style={{ width: "40%" }} src="empty.png" />
        </div>
      ) : (
        <div
          div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <u>
            {" "}
            <h1 style={{ marginTop: "70px" }}>Your Cart</h1>
          </u>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="outlined"
              sx={{ fontSIze: "30px" }}
              onClick={handleClickOpen}
              color="error"
              startIcon={<DeleteIcon sx={{ fontSIze: "30px" }} />}
            >
              Empty Cart
            </Button>{" "}
            &nbsp;
            <Button
              onClick={checkout}
              variant="outlined"
              color="success"
              startIcon={<ShoppingCartCheckoutIcon />}
            >
              Proceed to Checkout
            </Button>
          </div>

          <TableContainer component={Paper} sx={{ marginBottom: "70px" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell
                    align="left"
                    sx={{ fontSize: "20px", fontWeight: "900" }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "20px", fontWeight: "900" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ fontSize: "20px", fontWeight: "900" }}
                  >
                    Quantity
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "20px", fontWeight: "900" }}
                  >
                    Price
                  </TableCell>
                  <TableCell align="center" sx={sty}>
                    Total Price
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ fontSize: "20px", fontWeight: "900" }}
                  >
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              {contxt.addtocartstate.map((i) => {
                return (
                  <TableBody>
                    <TableRow>
                      <TableCell />
                      <TableCell align="left" sx={{ width: "50px" }}>
                        <img
                          alt=""
                          src={i.img}
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "90px",
                            boxShadow: "5px 5px 5px 5px gray",
                            marginLeft: "-20px",
                          }}
                        />
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontSize: "18px", fontWeight: "300" }}
                      >
                        {i.pname}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontSize: "25px",
                          fontWeight: "300",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "fit-content",
                            height: "30px",
                          }}
                        >
                          <IconButton
                            onClick={() => {
                              lessit(i.id);
                            }}
                          >
                            <RemoveCircleIcon
                              id={i.id}
                              sx={{
                                fontSize: "40px",
                                color: "red",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                          {i.quantity}
                          <IconButton
                            onClick={() => {
                              addit(i.id);
                            }}
                          >
                            <AddCircleIcon
                              id={i.id}
                              sx={{
                                fontSize: "40px",
                                color: "green",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "18px", fontWeight: "300" }}
                      >
                        {i.price}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{ fontSize: "18px", fontWeight: "300" }}
                      >
                        {Number(i.price) * Number(i.quantity)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{ fontSize: "18px", fontWeight: "300" }}
                      >
                        <div>
                          <IconButton
                            onClick={handleClickconfirm}
                            sx={{ marginRight: "20px" }}
                          >
                            <DeleteIcon
                              sx={{
                                color: "red",
                                fontSize: "40px",
                                cursor: "pointer",
                              }}
                            />
                          </IconButton>
                          <Popover
                            id={id}
                            open={open1}
                            anchorEl={anchorEl}
                            onClose={handleCloseconfirm}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <div style={{ display: "flex" }}>
                              <Button
                                variant="text"
                                onClick={handleCloseconfirm}
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => {
                                  deletefromcart(i.id);
                                }}
                                variant="text"
                              >
                                Delete
                              </Button>
                            </div>
                          </Popover>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
