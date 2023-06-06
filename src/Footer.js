import React from 'react'
import MyCarousel from "./Carousel";
import "./App.css";
import { Divider, Tooltip } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
const Footer = () => {
  return (
    <div>
        <Divider variant="middle" />
    <div className="footerparent">
      <div className="footer">
        <p className="p1">Change languages: </p>
        <p className="p2">हिंदी</p>
        <p className="p3">English</p>
        <p className="p4">मराठी</p>
        <p className="p5">বাংলা</p>
        <p className="p6">தமிழ்</p>
        <p className="p7">ಕನ್ನಡ</p>
        <p className="p8">മലയാളം</p>
        <p className="p10">ਪੰਜਾਬੀ</p>
      </div>
      <div style={{ marginTop: "20px" }}>
        <Tooltip title="Linkdn">
          <LinkedInIcon
            sx={{ color: "blue", cursor: "pointer", margin: "0px 5px" }}
          />
        </Tooltip>
        <Tooltip title="Instagram">
          <InstagramIcon
            sx={{ color: "#ff1493", cursor: "pointer", margin: "0px 5px" }}
          />
        </Tooltip>
        <Tooltip title="Github">
          <GitHubIcon sx={{ cursor: "pointer", margin: "0px 5px" }} />
        </Tooltip>
        <Tooltip title="Facebook">
          <FacebookIcon
            sx={{ color: "#3b5998", cursor: "pointer", margin: "0px 5px" }}
          />
        </Tooltip>

        <Tooltip title="Youtube">
          <YouTubeIcon
            sx={{ color: "red", cursor: "pointer", margin: "0px 5px" }}
          />
        </Tooltip>
      </div>
    </div>
    </div>
  )
}

export default Footer