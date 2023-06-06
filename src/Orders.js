import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { contxtname } from "./Context";
import apicall from "./db.js";
import Row from "./Row";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Orders() {
  const contxt = React.useContext(contxtname);
  const [available, setAvailable] = React.useState("no");
  const [open, setOpen] = React.useState(false);
  const [ids, setId] = React.useState("");
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const avail = async () => {
      let allorders = await apicall.get(`/orders`);
      contxt.setOrders(allorders.data);
      contxt.orders.map((i) => {
        if (i.userid == contxt.userID) {
          setAvailable("yes");
        }
      });
    };
    avail();
  }, []);

  const handleClickOpen = (id) => {
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const cancelorder = async () => {
    try {
      await apicall.delete(`/orders/${ids}`);
      let cancelorder = await apicall.get("/orders");
      await contxt.setOrders(cancelorder.data);
      setOpen(false);
      let left = cancelorder.data.filter((i) => contxt.userID == i.userid);
      if (left.length === 0) {
        setAvailable("no");
      }
    } catch (er) {
      console.log(er);
    }
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
        <DialogTitle>{"Do you really want to cancel order?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            If yes, this order cannot be retrieve further!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={cancelorder}>Yes</Button>
        </DialogActions>
      </Dialog>
      {available == "yes" ? (
        <div className="same">
          <div>
            <h1 style={{marginTop:"100px",textAlign:"center"}}><u>My Orders</u></h1>
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell><b>Order ID</b></TableCell>
                    <TableCell align="left"><b>Customer</b></TableCell>
                    <TableCell align="left"><b>Address</b></TableCell>
                    <TableCell align="right"><b>Cancel Order</b></TableCell>
                    <TableCell align="right"><b>Date</b></TableCell>
                    <TableCell align="right"><b>Total</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contxt.orders.map((i) => {
                    if (i.userid == contxt.userID) {
                      return (
                        <Row
                          oid={i.id}
                          uname={i.name}
                          cancel={() => {
                            handleClickOpen(i.id);
                          }}
                          date={i.date}
                          total={i.total}
                          address={i.address}
                          orderitemsarr={i.orderitems}
                        />
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      ) : (
        <div className="same">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              marginTop: "100px",
            }}
          >
            <h1>No Order </h1>
            <img alt="" style={{ width: "40%" }} src="empty.png" />
          </div>
        </div>
      )}
    </>
  );
}
