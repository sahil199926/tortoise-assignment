import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./categorywise.css";
import { useNavigate } from "react-router-dom";
import API from "../../Api";
import "../HomePage/homePageStyles.css";
import LoadImages from "../common/LoadImages";

function Category() {
  let { catId } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [indexImg, seIndexImg] = useState(null);
  const fetchPhotos = () => {
    setFetchLoading(true);
    API.get(
      `/search/photos/?page=${pageNo}&per_page=${per_page}&query=${catId}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    )
      .then((res) => {
        setPageNo((p) => p + 1);
        setPhotos((prev) => [...prev, ...res.data.results]);
        setLoading(false);
        setFetchLoading(false);
        if (!indexImg) {
          seIndexImg(res.data.results[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (fetchLoading) {
      fetchPhotos();
    }
  }, [fetchLoading, catId]);

  useEffect(() => {
    setPhotos([]);
    setPageNo(1);
    setFetchLoading(true);
    seIndexImg(null)
    setLoading(true);
    fetchPhotos();
  }, [catId]);
  return (
    <div>
      {!loading && indexImg && (
        <div
          className="catindeximg"
          style={{
            backgroundImage: `url(${indexImg.urls.regular})`,
          }}
        >
          <div className="catindeximg__content">
            <div className="catindeximg__content__title">{catId}</div>
            <div className="catindeximg__content__desc">
              Covering the latest important events, news-worthy moments and
              movements from around the world — from political protests to
              cultural celebrations. When submitting, please provide a photo
              description so we understand the full context of the image.
            </div>
            <div className="catindeximg__content__btn">
              <button
                style={{
                  width: "200px",
                  height: "40px",
                  fontSize: "15px",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                {" "}
                submit to <span style={{ fontWeight: "bold" }}>{catId}</span>
              </button>
            </div>
          </div>
          <div className="catindeximg__content_bottom">
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

export default Category;
