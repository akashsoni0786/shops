import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import apicall from "./db.js";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FaceIcon from "@mui/icons-material/Face";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import {
  Alert,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Slide,
  Snackbar,
  Tooltip,
} from "@mui/material";
import { fontWeight } from "@mui/system";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import { contxtname } from "./Context";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import CallIcon from "@mui/icons-material/Call";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const txtstyle = {
  color: "gray",
  fontWeight: "900",
  "&:hover": {
    color: "orange",
  },
};
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openOTP, setOpenOTP] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenOTP = () => setOpenOTP(true);
  const handleCloseOTP = () => setOpenOTP(false);

  const contxt = React.useContext(contxtname);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    handleMobileMenuClose();
    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key="Modaks" disablePadding>
          <ListItemButton
            onClick={() => {
              contxt.setCat_Products("Modaks");
              navigate("/category");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Modaks" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Burfi" disablePadding>
          <ListItemButton
            onClick={() => {
              contxt.setCat_Products("Burfi");
              navigate("/category");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Burfi" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Gulab Jamun" disablePadding>
          <ListItemButton
            onClick={() => {
              contxt.setCat_Products("Gulab Jamun");
              navigate("/category");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Gulab Jamun" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Soan Papdi" disablePadding>
          <ListItemButton
            onClick={() => {
              contxt.setCat_Products("Soan Papdi");
              navigate("/category");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Soan Papdi" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Rasgulla" disablePadding>
          <ListItemButton
            onClick={() => {
              contxt.setCat_Products("Rasgulla");
              navigate("/category");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Rasgulla" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Cham Cham" disablePadding>
          <ListItemButton
            onClick={() => {
              contxt.setCat_Products("Cham Cham");
              navigate("/category");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Cham Cham" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Rasmalai" disablePadding>
          <ListItemButton
            onClick={() => {
              contxt.setCat_Products("Rasmalai");
              navigate("/category");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Rasmalai" />
          </ListItemButton>
        </ListItem>
      </List>
      {/* <Divider />
      <List>
        {contxt.userID == "" ? (
          <ListItem key="Login" disablePadding>
            <ListItemButton onClick={handleOpen}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
        <ListItem key="About" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Contact" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </ListItem> */}
      {/* </List> */}
    </Box>
  );
  var search_val = [];
  const search_products = (e) => {
    navigate("/search");
    var searchtext = e.target.value;

    contxt.products.map((i) => {
      if (i.pname.toLowerCase().includes(searchtext))
       {
        search_val = [...search_val, i];
        contxt.setSearchtxtar(search_val);
      }
    });
 
    
  };
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
      <Search sx={{ backgroundColor: "white" }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "black" }} />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ color: "black" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyUp={search_products}
            />
          </Search>
      </MenuItem>
      <Link to="/" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMobileMenuClose}>
          <Tooltip title="Cart">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <p>Home</p>
        </MenuItem>
      </Link>

      <Link to="/allcategory" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleMobileMenuClose}>
          <Tooltip title="Cart">
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <p>All Category</p>
        </MenuItem>
      </Link>

      {contxt.userID == "" ? (
        <></>
      ) : (
        <Link to="/orders" style={{ textDecoration: "none", color: "black" }}>
          <MenuItem onClick={handleMobileMenuClose}>
            <Tooltip title="Cart">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <FaceIcon />
              </IconButton>
            </Tooltip>
            <p>Orders</p>
          </MenuItem>
        </Link>
      )}

      <MenuItem onClick={toggleDrawer("right", true)}>
        <Tooltip title="Cart">
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <CategoryIcon />
          </IconButton>
        </Tooltip>
        <p>Category</p>
      </MenuItem>

      <Link to="/cart" style={{ textDecoration: "none", color: "black" }}>
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={contxt.cartcount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <p>Cart</p>
        </MenuItem>
      </Link>

      {contxt.userID == "" ? (
        <MenuItem
          onClick={() => {
            handleOpen();
            handleMobileMenuClose();
          }}
        >
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <FaceIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            logout();
          }}
        >
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <NoAccountsIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      )}
    </Menu>
  );
  function TransitionDown(props) {
    return <Slide {...props} direction="down" />;
  }
  const [opensnack, setOpensnack] = React.useState(false);
  const [opensnackwrong, setOpensnackwrong] = React.useState(false);

  const [otpsnackwrong, setOtpsnackwrong] = React.useState(false);
  const [otpsnackwrongOTP, setOtpsnackwrongOTP] = React.useState(false);
  const [otpsnackrightOTP, setOtpsnackrightOTP] = React.useState(false);

  const [transition, setTransition] = React.useState(undefined);
  const [mobnum, setMobnum] = React.useState(0);
  const [otp, setOTP] = React.useState();
  const sendotpsnack = (Transition) => () => {
    setOpensnack(true);
    setTransition(() => Transition);
  };

  const handleClosesnack = () => {
    setOpensnack(false);
  };
  const handleClosesnackwrong = () => {
    setOpensnackwrong(false);
  };
  const handleClosesnackwrongOTP = () => {
    setOtpsnackwrongOTP(false);
  };

  const handleClosesnackrightOTP = () => {
    setOtpsnackrightOTP(false);
  };

  const wronginput = (Transition) => () => {
    setTransition(() => Transition);
    setOpensnackwrong(true);
  };
  const wronginputOTP = (Transition) => () => {
    setTransition(() => Transition);
    setOpensnackwrong(true);
  };

  const otpfunc = () => {
    if (mobnum.length == 10) {
      document.getElementById("sendotpbtn").style.display = false;
      setOpensnack(true);
      sendotpsnack(TransitionDown);
      handleClose();
      handleOpenOTP();
    } else {
      setOpensnackwrong(true);
      wronginput(TransitionDown);
    }
  };

  const otpverify = () => {
    if (otp == 1234) {
      setOtpsnackrightOTP(true);
      sendotpsnack(TransitionDown);
      handleCloseOTP();
      contxt.setUserID(mobnum);
    } else {
      setOtpsnackwrongOTP(true);
      wronginputOTP(TransitionDown);
    }
  };
  const logout = () => {
    contxt.setUserID("");
    navigate("/");
    contxt.addtocartstate.map(async (i) => {
      try {
   
        await apicall.delete(`/addtocart/${i.id}`);
        contxt.setAddtocartstate([]);
        contxt.setCartCount(0);
      } catch (er) {
        console.log(er);
      }
    });
  };
  
  // var search_val = [];
  // const search_products = (e) => {
  //   navigate("/search");
  //   var searchtext = e.target.value;

  //   contxt.products.map((i) => {
  //     if (i.pname.toLowerCase().includes(searchtext))
  //      {
  //       search_val = [...search_val, i];
  //       contxt.setSearchtxtar(search_val);
  //     }
  //   });
 
    
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Snackbar
        open={otpsnackwrongOTP}
        autoHideDuration={6000}
        onClose={handleClosesnackwrongOTP}
      >
        <Alert
          onClose={handleClosesnackwrongOTP}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please enter valid OTP!
        </Alert>
      </Snackbar>

      <Snackbar
        open={otpsnackrightOTP}
        autoHideDuration={6000}
        onClose={handleClosesnackrightOTP}
      >
        <Alert
          onClose={handleClosesnackrightOTP}
          severity="success"
          sx={{ width: "100%" }}
        >
          OTP Verified successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={opensnack}
        onClose={handleClosesnack}
        TransitionComponent={transition}
        message="Your OTP for Sweet Junction is 1234"
        key={transition ? transition.name : ""}
      />

      <Snackbar
        open={opensnackwrong}
        autoHideDuration={6000}
        onClose={handleClosesnackwrong}
      >
        <Alert
          onClose={handleClosesnackwrong}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please enter valid mobile number of 10 digits!
        </Alert>
      </Snackbar>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>
            Register yourself
          </Typography>

          <FormControl variant="standard">
            <InputLabel
              sx={{ fontSize: "15px" }}
              htmlFor="input-with-icon-adornment"
            >
              Enter your mobile number
            </InputLabel>
            <Input
              onKeyUp={(e) => {
                setMobnum(e.target.value);
              }}
              type="Number"
              sx={{ fontSize: "30px" }}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <CallIcon />
                </InputAdornment>
              }
            />
            <div id="sendotpbtn" onClick={otpfunc} className="addtocartbtn">
              Send OTP
            </div>
          </FormControl>
        </Box>
      </Modal>

      <Modal
        keepMounted
        open={openOTP}
        onClose={handleCloseOTP}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>
            OTP Verification
          </Typography>

          <FormControl variant="standard">
            <InputLabel
              sx={{ fontSize: "15px" }}
              htmlFor="input-with-icon-adornment"
            >
              Enter OTP
            </InputLabel>
            <Input
              onKeyUp={(e) => {
                setOTP(e.target.value);
              }}
              type="Number"
              sx={{ fontSize: "30px" }}
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AdminPanelSettingsIcon />
                </InputAdornment>
              }
            />
            <div onClick={otpverify} className="addtocartbtn">
              Verify OTP
            </div>
          </FormControl>
        </Box>
      </Modal>

     

      <AppBar
        position="fixed"
        sx={{zIndex: "99", backgroundColor: "#f1e2ce",maxWidth:"100vw",left: '0' }}
      >
        <Toolbar>
          <img
          onClick={()=>{navigate("/")}}
            style={{ width: "150px",cursor:"pointer" }}
            alt=""
            src="https://image1.jdomni.in/storeLogo/29092020/C4/3E/F9/DA80826D535A06444A27BC724F_1601398281684.png?output-format=webp"
          />

          {/* <Search sx={{ backgroundColor: "white" }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "black" }} />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ color: "black" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyUp={search_products}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Search sx={{ backgroundColor: "white" }}>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: "black" }} />
            </SearchIconWrapper>
            <StyledInputBase
              sx={{ color: "black" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyUp={search_products}
            />
          </Search>
            <Tooltip title="Home">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <NavLink to="/" style={{ textDecoration: "none" }}>
                  <Typography sx={txtstyle}>Home</Typography>{" "}
                </NavLink>
              </IconButton>
            </Tooltip>
            <Tooltip title="Categories">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={()=>{navigate("/allcategory")}}
                color="inherit"
              >
                <Typography sx={txtstyle}>All Category</Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="Categories">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={toggleDrawer("right", true)}
                color="inherit"
              >
                <Typography sx={txtstyle}>Category</Typography>
              </IconButton>
            </Tooltip>
            {contxt.userID === "" ? (
              <></>
            ) : (
              <>
                <Tooltip title="Logout">
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={() => {
                      navigate("/orders");
                    }}
                    color="inherit"
                  >
                    <Typography sx={txtstyle}>Orders</Typography>
                  </IconButton>
                </Tooltip>
              </>
            )}

            {contxt.userID === "" ? (
              <Tooltip title="Login">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleOpen}
                  color="inherit"
                >
                  <Typography sx={txtstyle}>Login</Typography>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Logout">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={logout}
                  color="inherit"
                >
                  <Typography sx={txtstyle}>Logout</Typography>
                </IconButton>
              </Tooltip>
            )}

            {contxt.cartcount == 0 ? (
              <></>
            ) : (
              <Tooltip title="Cart">
                <Link to="/cart">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={contxt.cartcount} color="error">
                      <ShoppingCartIcon
                        sx={{ color: "orange", fontSize: "45px" }}
                      />
                    </Badge>
                  </IconButton>
                </Link>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMobileMenu}
      <div>
        {["right"].map((anchor) => (
          // <React.Fragment key={anchor}>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list('right')}
            </Drawer>
          // </React.Fragment>
        ))}
      </div>
      {/* {renderMenu} */}
    </Box>
  );
}
