import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api";
import "./homePageStyles.css";
import { mockdata } from "../../mockdata";

import LoadImages from "../common/LoadImages";

function HomePage() {
  const [pageNo, setPageNo] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);

  const navigate = useNavigate();

  const go = () => {
    navigate({
      pathname: "/category/current-events",
    });
  };

  // data fetch
  const fetchPhotos = () => {
    setFetchLoading(true);
    //  API.get(
    //     `/photos?page=${pageNo}&per_page=${per_page}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    //   )

    const data = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockdata);
      }, 1000);
    });
    data  //res.data
      .then((res) => {
        setPageNo((p) => p + 1);
        console.log(pageNo);
        console.log(res);
        setPhotos((prev) => [...prev, ...res]);
        setLoading(false);
        setFetchLoading(false);
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
  }, [fetchLoading]);

  return (
    <div>
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
