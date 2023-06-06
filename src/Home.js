import React from "react";
import MyCarousel from "./Carousel";
import "./App.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Divider, IconButton, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { contxtname } from "./Context";
import Footer from "./Footer";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
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
const Home = () => {
  const contxt = React.useContext(contxtname);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    setTimeout(()=>handleOpen(),5000)
  }, []);
  const goleft = () => {
    document.getElementById("sweetcarousel").scrollLeft -= 220;
  };
  const goright = () => {
    document.getElementById("sweetcarousel").scrollLeft += 220;
  };
  const sendtocategorypage = (e) => {
    contxt.setCat_Products(e.target.id);
  };
  const sendtocategorypage2 = (e) => {
    contxt.setCat_Products(e.target.textContent);
  };
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
  return (
    <>
      <div style={{ position: "relative" }}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: "0px",
                  right: "0px",
                  cursor: "pointer",
                  color: "red",
                }}
              >
                <CancelIcon />
              </IconButton>

              <Box>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                  sx={{ fontSize: "2.5vw" }}
                >
                  Our offer week .........
                </Typography>
                <img
                  alt=""
                  style={{ width: "30vw" }}
                  src="https://images.jdmagicbox.com/comp/pune/z2/020pxx20.xx20.170809160958.d3z2/catalogue/sweets-junction-thergaon-pune-sweet-shops-99v2d.jpeg"
                />
              </Box>
              <Typography
                id="transition-modal-title"
                variant="h6"
                sx={{ fontSize: "2.5vw" }}
              >
                Apply "AKASH100" and get 100 rupees off
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
      <div style={{ marginTop: "20px" }}>
        {/* <Search sx={{ backgroundColor: "white",marginTop:"40px" }}>
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

        <MyCarousel />
        <p className="heading">• • Popular Items • •</p>
        <div className="sweetcarouselparent">
          <div className="carouselbtn" onClick={goleft}>
            <ArrowBackIosIcon sx={{ color: "white", marginLeft: "8px" }} />
          </div>
          <div id="sweetcarousel" className="sweetscarousel">
            <div className="sweetcard">
              <Link to="/category">
                <img
                  onClick={sendtocategorypage}
                  id="Modaks"
                  className="sweetpic"
                  alt=""
                  src="https://image2.jdomni.in/banner/29092020/8D/BF/53/654F4AB026C6518C4E97D91213_1601384620509.png?output-format=webp"
                />
              </Link>
              <Link to="/category">
                <p onClick={sendtocategorypage2} className="sweetname">
                  Modaks
                </p>
              </Link>
            </div>
            <div className="sweetcard">
              <Link to="/category">
                <img
                  onClick={sendtocategorypage}
                  id="Burfi"
                  className="sweetpic"
                  alt=""
                  src="https://image3.jdomni.in/banner/29092020/46/8E/EE/99F79491803B73EE5E595F35FD_1601377931546.jpg?output-format=webp"
                />
              </Link>
              <Link to="/category">
                <p onClick={sendtocategorypage2} className="sweetname">
                  Burfi
                </p>
              </Link>
            </div>

            <div className="sweetcard">
              <Link to="/category">
                <img
                  onClick={sendtocategorypage}
                  id="Gulab Jamun"
                  className="sweetpic"
                  alt=""
                  src="https://image3.jdomni.in/banner/29092020/8D/BE/2B/F7ABDB9174C6E382E3C0AFEC24_1601377949409.png?output-format=webp"
                />
              </Link>
              <Link to="/category">
                <p onClick={sendtocategorypage2} className="sweetname">
                  Gulab Jamun
                </p>
              </Link>
            </div>

            <div className="sweetcard">
              <Link to="/category">
                <img
                  onClick={sendtocategorypage}
                  id="Soan Papdi"
                  className="sweetpic"
                  alt=""
                  src="https://image2.jdomni.in/banner/29092020/E6/01/0B/062554AC29E8E7F7D8ABA50BB8_1601377968296.png?output-format=webp"
                />
              </Link>
              <Link to="/category">
                <p onClick={sendtocategorypage2} className="sweetname">
                  Soan Papdi
                </p>
              </Link>
            </div>

            <div className="sweetcard">
              <Link to="/category">
                <img
                  onClick={sendtocategorypage}
                  id="Rasgulla"
                  className="sweetpic"
                  alt=""
                  src="https://image3.jdomni.in/banner/29092020/0E/91/6B/BD1F7C8CFD51A7B0001FD7F05D_1601378334221.jpg?output-format=webp"
                />
              </Link>
              <Link to="/category">
                <p onClick={sendtocategorypage2} className="sweetname">
                  Rasgulla
                </p>
              </Link>
            </div>

            <div className="sweetcard">
              <Link to="/category">
                <img
                  onClick={sendtocategorypage}
                  id="Cham Cham"
                  className="sweetpic"
                  alt=""
                  src="https://image3.jdomni.in/banner/29092020/C5/B3/22/40C3D9E18F29F8116EF7430C8F_1601383569706.png?output-format=webp"
                />
              </Link>
              <Link to="/category">
                <p onClick={sendtocategorypage2} className="sweetname">
                  Cham Cham
                </p>
              </Link>
            </div>

            <div className="sweetcard">
              <Link to="/category">
                <img
                  onClick={sendtocategorypage}
                  id="Rasmalai"
                  className="sweetpic"
                  alt=""
                  src="https://image3.jdomni.in/banner/29092020/E0/D7/1B/EB3EED9B14BC8E64D03905C639_1601385862543.png?output-format=webp"
                />
              </Link>
              <Link to="/category">
                <p onClick={sendtocategorypage2} className="sweetname">
                  Rasmalai
                </p>
              </Link>
            </div>

            {/* 
          <div className="sweetcard">
            <Link to="/category">
              <img
              onClick={sendtocategorypage}
                className="sweetpic"
                alt=""
                src="https://image3.jdomni.in/banner/29092020/87/5D/5C/9E695B564CE8A98F159BCC71D3_1601384755423.png?output-format=webp"
              />
            </Link>
            <Link to="/category">
              <p onClick={sendtocategorypage2}  className="sweetname">Jalebi</p>
            </Link>
          </div> */}
          </div>
          <div onClick={goright} className="carouselbtn">
            <ArrowForwardIosIcon sx={{ color: "white", marginLeft: "5px" }} />
          </div>
        </div>
        <div className="aboutdiv">
          <img
            alt=""
            src="https://image3.jdomni.in/banner/01102020/2E/FB/0B/B5397B6A8B0429E0CDBC46F7F6_1601540551867.png?output-format=webp"
          />
          <div className="aboutcontent">
            <p className="heading">• • About Us • •</p>

            <p className="aboutus">
              After serving so many customers, today we can proudly say that our
              shop, Sweet Junction, situated at Vishwas Khand, Lucknow, Uttar
              Pradesh, is home to a wide range of sweets that cater to the
              diverse taste buds of every patron. All of our delicacies are made
              using unique recipes that will leave a memorable aftertaste in
              your mouth. You can call for sweets in times of sudden sweet
              cravings or when you wish to complete a meal with a delightful
              dessert.
            </p>
          </div>
        </div>
        <p className="heading">• • Gallery • •</p>
        <div className="galary">
          <img
            className="galaryimg"
            alt=""
            src="https://image3.jdomni.in/banner/29092020/50/B8/A2/59A2B8076A2ED68865BCE9B5B0_1601398043957.jpg?output-format=webp"
          />
          <img
            className="galaryimg"
            alt=""
            src="https://image2.jdomni.in/banner/29092020/6A/BC/78/B4729546909848CD1306E4D0B2_1601398042277.jpg?output-format=webp"
          />
          <img
            className="galaryimg"
            alt=""
            src="https://image1.jdomni.in/banner/29092020/43/3B/8D/9866BDEFECCF4FD185827E70CF_1601398039750.jpg?output-format=webp"
          />
          <img
            className="galaryimg"
            alt=""
            src="https://content.jdmagicbox.com/quickquotes/images_main/rasmalai-0-5-kg-210963825-x26ia.jpg"
          />
          <img
            className="galaryimg"
            alt=""
            src="https://content.jdmagicbox.com/quickquotes/images_main/bikano-indian-sweets-21-06-2021-122-230169481-vwyf8.jpg"
          />
          <img
            className="galaryimg"
            alt=""
            src="https://content.jdmagicbox.com/quickquotes/images_main/1000-ml-bar-100-percent-natural-ice-cream-374837032-z1el4.jpg"
          />
        </div>
        <p className="heading">• • Contact Us • •</p>

        <div className="contactusform">
          <div className="contactusfomat">
            <div className="inputss">
              <input className="inputofcontact" placeholder="Enter name" />
              <input
                className="inputofcontact"
                placeholder="Enter mobile number"
                type="Number"
              />
              <input className="inputofcontact" placeholder="Enter mail id" />
            </div>

            <textarea
              className="inputofcontactmsg"
              placeholder="Enter message"
            />
          </div>
          <div className="sendbtn">Submit</div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
