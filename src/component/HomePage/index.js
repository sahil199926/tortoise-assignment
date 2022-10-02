import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api";
import "./homePageStyles.css";
import { TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import SearchIcon from "@mui/icons-material/Search";
import LoadImages from "../common/LoadImages";
import useCheckSize from "../../Hooks/useChecksize";
function HomePage() {
  const [pageNo, setPageNo] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [indexImg, seIndexImg] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [search, setSearch] = useState("");
  const size = useCheckSize();
  const navigate = useNavigate();
  // data fetch
  const fetchPhotos = () => {
    setFetchLoading(true);
     API.get(
        `/photos?page=${pageNo}&per_page=${per_page}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
      )
      .then((res) => {
        setPageNo((p) => p + 1);
        setPhotos((prev) => [...prev, ...res.data]);
        setLoading(false);
        setFetchLoading(false);
        if (!indexImg) {
          seIndexImg(res.data[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
   const OnSearch = (e) => {
    e.preventDefault();
    navigate({
      pathname: `/photos/${search}`,
    });
  };

  useEffect(() => {
    if (fetchLoading) {
      fetchPhotos();
    }
  }, [fetchLoading]);

  return (
    <div>
      {!loading && indexImg && (
        <div
          className="catindeximg"
          style={{
            backgroundImage: `url(${indexImg.urls.regular})`,
          }}
        >
          <div className="indeximg__content">
            <div className="indeximg__content__title">Unsplash</div>
            <div className="indeximg__content__">
             <div>The internet’s source for visuals.</div>
            <div>Powered by creators everywhere.</div>
            </div>
            <form onSubmit={(e) => OnSearch(e)}>
              <TextField
                sx={{
                  backgroundColor: "#eee",
                  width: "100%",
                  border: "none",
                  borderRadius: "5px",
                  "& .css-1gywuxd-MuiInputBase-root-MuiOutlinedInput-root": {
                    borderRadius: "inherit",

                    border: "none",
                    "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                      border: "none",

                      borderRadius: "inherit",
                    },
                  },
                }}
                fullWidth
                size={size>768?"large":"small"}
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

          </div>
          <div className="indeximg__content_bottom">
            <div
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#d9d4d4",
                width: "40%",
              }}
            >
              Photo by{" "}
              <span style={{ fontWeight: "bold", color: "#fff" }}>
                {indexImg.user.name}
              </span>
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#d9d4d4",
                width: "60%",
              }}
            >
              {" "}
              Read more about the Unsplash License on Unsplash
            </div>
          </div>
        </div>
      )}


      <LoadImages
        photos={photos}
        loading={loading}
        fetchLoading={fetchLoading}
        setFetchLoading={setFetchLoading}
      />
  
    </div>
  );
}

export default HomePage;
