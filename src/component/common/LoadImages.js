import React, { useState, useEffect } from "react";
import Masonry from "@mui/lab/Masonry";
import Idp from "./Idp";
import useCheckSize from "../../Hooks/useChecksize";

function LoadImages(props) {
  const { photos, loading, fetchLoading,setFetchLoading } = props;
  const [selectImage, setSelectImage] = useState(null);
  const [openIdp, setOpenIdp] = useState(false);
  const size = useCheckSize();
  const handleScroll = (e) => {
    if (
      window.innerHeight + e.target.documentElement.scrollTop + 5 >=
      e.target.documentElement.scrollHeight
    ) {
      setFetchLoading(true)
    }
  };
  useEffect(() => {
    setFetchLoading(true)
    window.addEventListener("scroll", handleScroll);
  }, []);

  const openModal = (item) => {
    setOpenIdp(true);
    setSelectImage(item);
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
          <Masonry sx={{margin:'auto'}} columns={size < 768 ? 1 : size < 1024 ? 2 : 3} spacing={2}>
            {photos.map((item, index) => {
              return (
                <div className="container" onClick={() => openModal(item)}>
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
                      <div>
                        <button>like</button>
                        <button>faverot</button>
                      </div>
                    </div>

                    <div className="bottomoverlay">
                      <div>
                        <div>
                          <div>
                            <div>pic</div>
                            <div>name</div>
                            <div>avalable for hire</div>
                          </div>
                          <button>Download</button>
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
