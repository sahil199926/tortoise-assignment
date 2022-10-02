import React, { useState, useEffect } from "react";
import Masonry from "@mui/lab/Masonry";
import Idp from "../Idp";
import "./loadImg.css";
import useCheckSize from "../../../Hooks/useChecksize";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";
function LoadImages(props) {
  const { photos, loading, fetchLoading, setFetchLoading } = props;
  const [selectImage, setSelectImage] = useState(null);
  const [openIdp, setOpenIdp] = useState(false);
  const size = useCheckSize();
  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 5 >=
      e.target.documentElement.scrollHeight
    ) {
      setFetchLoading(true);
    }
  };
  useEffect(() => {
    setFetchLoading(true);
    window.addEventListener("scroll", handleScroll);
  }, []);

  const openModal = (item) => {
    setOpenIdp(true);
    setSelectImage(item);
  };
  const likeImage = (e) => {
    e.stopPropagation();
    alert("like");
  };
  const downloadImage = (e, item) => {
    e.stopPropagation();
    var link = document.createElement("a");
    link.href = item.urls.raw;
    link.target = "_blank";
    link.download = "Download.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const favoriteImage = (e, item) => {
    e.stopPropagation();

    alert("favorite");
  };
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : !loading && photos.length == 0 ? (
        <div>No data found</div>
      ) : (
        <div
          style={{
            maxWidth: "1300px",
            margin: "auto",
          }}
        >
          <Masonry
            sx={{ margin: "auto" }}
            columns={size < 768 ? 1 : size < 1024 ? 2 : 3}
            spacing={2}
          >
            {photos.map((item, index) => {
              let liked=Math.random() > 0.5;
              return (
                <div onClick={() => openModal(item)} className="container">
                  <img
                    className="image"
                    style={{
                      width: "100%",
                    }}
                    key={index}
                    src={item.urls.small}
                    alt={item.alt_description}
                  />

                  <div class="overlay">
                    <div className="topoverlay">
                      <div className="topoverlaycontainer">
                        <button
                        style={{ backgroundColor: liked?"#f14747":'#ffff' }}
                          className="button"
                          onClick={(e) => likeImage(e)}
                        >
                         
                          <FavoriteIcon sx={{color:liked?'white':'black'}} fontSize="small" />
                        </button>
                        <button
                          className="button"
                          onClick={(e) => downloadImage(e, item)}
                        >
                          <AddIcon fontSize="small" />
                        </button>
                      </div>
                    </div>

                    <div className="bottomoverlay">
                      <div>
                        <div
                          style={{
                            display: "flex",
                            color: "white",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "15px",
                            fontSize: "clamp(10px, 1.5vw, 13px)",
                          }}
                        >
                          <div className="leftoverlaycontainer">
                            <div>
                              <img
                                src={item.user.profile_image.small}
                                alt={item.user.first_name}
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                            <div>
                              <div>{`${item.user.first_name} ${item.user.last_name}`}</div>
                              <div
                                style={{
                                  display: item.user.for_hire ? "flex" : "none",
                                }}
                              >
                                <span>avalable for hire</span>
                                <span style={{ padding: "1px 1px" }}>
                                  <CheckCircleIcon
                                    sx={{ fontSize: 10 }}
                                    size="small"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            className="button"
                            onClick={(e) => downloadImage(e, item)}
                          >
                            <ArrowDownwardIcon fontSize="small" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Masonry>
          {/* <ImagesColumns
            gridSize={size<768?1:size<1200?2:3}
            RowStyle={{
              display: "flex",
              flexDirection: "column",
              rowGap: "10px",
            }}
            photos={photos}
          /> */}
          {fetchLoading && <div>Loading more images...</div>}
          <div
            style={{
              width: "100%",
              height: "500px",
            }}
          ></div>
        </div>
      )}

      {openIdp && (
        <Idp
          open={openIdp}
          setOpen={setOpenIdp}
          imageData={selectImage}
          setImage={setSelectImage}
        />
      )}
    </div>
  );
}

export default LoadImages;
