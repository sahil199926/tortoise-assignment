import * as React from "react";
import "./hoc.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Toolbar, Grid, Divider, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import { StaticRoutes } from "../../mockdata";
import { useLocation } from "react-router-dom";
import useCheckSize from "../../Hooks/useChecksize";
import logo from "../../assets/logo.png";
import MenuIcon from "@mui/icons-material/Menu";


export default function Hoc({ children }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const size = useCheckSize();
  const location = useLocation();
  const catid =
    location.pathname.split("/")[2] || location.pathname.split("/")[1] || "";
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const routes = {
    left: StaticRoutes.slice(0, 2),
    right: size > 890 ? StaticRoutes.slice(2) : StaticRoutes,
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const routeRef = React.useRef();
  const navigate = useNavigate();
  const checkScrollPosition = () => {
    console.log(routeRef);
  };

  const onCategoryClick = (route) => {
    if (route.value === "following") {
      navigate("/following");
    } else if (route.value === "editorial") {
      navigate("/");
    } else {
      navigate({
        pathname: `/category/${route.value}`,
      });
    }
  };

  const OnSearch = (e) => {
    e.preventDefault();
    navigate({
      pathname: `/photos/${search}`,
    });
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuOpen = (event) => {
    
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Company</MenuItem>
      <MenuItem onClick={handleMenuClose}>Product</MenuItem>
      <MenuItem onClick={handleMenuClose}>Community</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
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
      <MenuItem sx={{ justifyContent: "center" }}>
        <p>Advertise</p>
      </MenuItem>
      <MenuItem sx={{ justifyContent: "center" }}>
        <p>Blog</p>
      </MenuItem>
      <MenuItem sx={{ justifyContent: "center" }}>
        <p>Submit a photo</p>
      </MenuItem>
      <MenuItem sx={{ justifyContent: "center" }}>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        sx={{ justifyContent: "center" }}
        onClick={handleProfileMenuOpen}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle fontSize="large" />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          backgroundColor: "#fff",
          color: "#000",
        }}
        position="sticky"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <img style={{ width: "35px", height: "35px" }} src={logo} />
          </IconButton>

          <Box component="div" sx={{ flexGrow: 1, borderRadius: "20%" }}>
            <form onSubmit={(e) => OnSearch(e)}>
              <TextField
                sx={{
                  backgroundColor: "#eee",
                  width: "100%",
                  borderRadius: "25px",
                  "& .css-1gywuxd-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "inherit",
                    '& fieldset': {
                      border: 'none',
                      borderRadius: "inherit",
                    }
                  },
                }}
                fullWidth
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <IconButton sx={{ paddingRight: "10px" }}>
                      <SearchIcon />
                    </IconButton>
                  ),
                  endAdornment: (
                    <IconButton>
                      <QrCodeScannerIcon />
                    </IconButton>
                  ),
                }}
              />
            </form>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ borderRadius: "10px" }}
            >
              <Typography>Advertise</Typography>
            </IconButton>

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              sx={{ borderRadius: "10px" }}
            >
              <Typography>Blog</Typography>
            </IconButton>
            <IconButton
              size="small"
              color="inherit"
              sx={{ borderRadius: "10px" }}
            >
              <Typography>Submit photo</Typography>
            </IconButton>
            <IconButton size="small" color="inherit">
              <NotificationsIcon />
            </IconButton>
            <IconButton
              size="small"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMenuOpen}
              color="inherit"
              sx={{ borderRadius: "10px" }}
            >
              <MenuIcon />
            </IconButton>
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
        <Grid sx={{ marginTop: "10px" }} container>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              backgroundColor: "#fff",
              display: { xs: "none", md: "flex" },
            }}
            item
            xs={2}
          >
            {routes.left.map((route, index) => {
              return (
                <div
                  onClick={() => onCategoryClick(route)}
                  style={{
                    color: route.value == catid ? "black" : "#0000007a",
                    cursor: "pointer",
                    display: "flex",
                    fontWeight: "600",
                    justifyContent: "center",
                    whiteSpace: "nowrap",
                    padding: "10px",
                    borderBottom:
                      route.value == catid
                        ? "2px solid black"
                        : "2px solid #fff",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  {route.label}
                </div>
              );
            })}
            <Divider sx={{ height: "80%" }} orientation="vertical" />
          </Grid>
          <Grid
            ref={routeRef}
            className="allroutes"
            onScroll={checkScrollPosition}
            sx={{
              display: "flex",
              overflow: "scroll",
            }}
            item
            xs={12}
            md={10}
          >
            {routes.right.map((route, index) => {
              return (
                <div>
                  {" "}
                  <div
                    style={{
                      opacity: route.meta?.featured ? "1" : "0",
                      fontSize: "11px",
                      padding: "0px 10px",
                      color: "#0000007a",
                      textAlign: "left",
                    }}
                  >
                    featured
                  </div>
                  <Grid
                    onClick={() => onCategoryClick(route)}
                    sx={{
                      // textTransform: "capitalize",
                      color: route.value == catid ? "black" : "#0000007a",
                      cursor: "pointer",
                      display: "flex",
                      fontWeight: "600",
                      justifyContent: "center",
                      whiteSpace: "nowrap",
                      padding: " 5px 10px",
                      paddingBottom: "20px",
                      borderBottom:
                        route.value == catid
                          ? "2px solid black"
                          : "2px solid #fff",
                      "&:hover": {
                        color: "black",
                      },
                    }}
                  >
                    {route.label}
                  </Grid>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {/* {catid} */}
      {children}
    </Box>
  );
}
