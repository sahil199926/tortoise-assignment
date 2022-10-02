import React from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import useCheckSize from "../../Hooks/useChecksize";
const commonBtnStyle = {
  marginRight: "8px",
  color: "#767676",
  border: "1px solid rgb(209, 209, 209)",
  minWidth: "40px",
  maxHeight: "32px",
  padding: "auto 11px",
  textTransform: "none",
};

function Idp({ open, setOpen, imageData }) {
  const size=useCheckSize();
  const handleClose = () => {
    setOpen(false);
  };

const downloadImage=()=>{
  var link = document.createElement("a");
  link.href = imageData.urls.raw;
  link.target = "_blank";
  link.download = "Download.jpg";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

  return (
    <Box component="div" position="relative"> 
      <Dialog
        fullWidth
        fullScreen={size<768}
        width="lg"
        maxWidth="lg"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle stickyHeader>
          <Box 
          onClick={handleClose}
          sx={{
            display: size<768?"flex":"none",
            position: "absolute",
            right: "10px",
            color: "#767676",
            padding: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
          ><CloseIcon/></Box>
          <Grid container>
            <Grid item xs={12} sm={6} mt={1} display="flex">
              <Box mr={1}>
                <img
                  style={{ borderRadius: "50%" }}
                  src={imageData?.user.profile_image.small}
                  alt="profile"
                />
              </Box>
              <Box>
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  {imageData?.user.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "13px", color: "#767676" }}
                >
                  @{imageData?.user.username}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box component="aside" sx={{ width: "100%" }}>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  mt={1}
                  justifyContent={{ sm: "flex-end", xs: "space-between" }}
                >
                  <Box>
                    <Button sx={{ ...commonBtnStyle }}>
                      <FavoriteIcon sx={{ width: "18px" }} />
                    </Button>
                    <Button sx={{ ...commonBtnStyle }}>
                      <AddIcon />
                    </Button>
                  </Box>
                  <Button
                  onClick={downloadImage}
                    sx={{
                      ...commonBtnStyle,
                      float: { xs: "right", sm: "unset" },
                      color: "#fff",
                      backgroundColor: "rgb(60, 180, 110)",
                    }}
                  >
                    Download Free
                  </Button>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <Box component="div">
            <Box
              display="flex"
              component="section"
              sx={{
                minWidth: "min(100%, 435px)",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={imageData.urls.regular}
                sx={{
                  maxWidth: "100%",
                  maxHeight: { sm: "579.983px", xs: "fit-content" },
                }}
              />
            </Box>
          </Box>
          <Box component="main" my={2}>
            <Grid container>
              <Grid item xs={12} my={1} sm={6}>
                <Box
                  component="aside"
                  display="flex"
                  width="200px"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", color: "#767676" }}
                    >
                      Likes
                    </Typography>
                    <Typography variant="h6" fontSize="15px">
                      {imageData?.user.total_likes}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ fontSize: "14px", color: "#767676" }}
                    >
                      Photos
                    </Typography>
                    <Typography variant="h6" fontSize="15px">
                      {imageData?.user.total_photos}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} my={1} sm={6}>
                <Box
                  component="aside"
                  display="flex"
                  justifyContent={{ xs: "flex-start", sm: "flex-end" }}
                >
                  <Button sx={{ ...commonBtnStyle }}>
                    <ReplyIcon sx={{ width: "18px", marginRight: "5px" }} />
                    Share
                  </Button>
                  <Button sx={{ ...commonBtnStyle }}>
                    <InfoIcon sx={{ width: "18px", marginRight: "5px" }} />
                    Info
                  </Button>
                  <Button sx={{ ...commonBtnStyle }}>...</Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box component="footer" my={4}>
            <Box component="section" display="flex" sx={{ color: "#7a7a7a" }}>
              <CalendarTodayIcon sx={{ width: "15px", marginRight: "10px" }} />
              <Typography variant="body2" pt="5px">
                Published on August 31, 2022
              </Typography>
            </Box>
            <Box component="section" display="flex" sx={{ color: "#7a7a7a" }}>
              <CameraAltIcon sx={{ width: "15px", marginRight: "10px" }} />
              <Typography variant="body2" pt="5px">
                NIKON CORPORATION, NIKON Z 6_2
              </Typography>
            </Box>
            <Box component="section" display="flex" sx={{ color: "#7a7a7a" }}>
              <VerifiedUserIcon sx={{ width: "15px", marginRight: "10px" }} />
              <Typography variant="body2" pt="5px">
                Free to use under the Unsplash License
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Idp;
