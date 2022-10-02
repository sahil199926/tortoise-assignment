import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../../Api";
import "../HomePage/homePageStyles.css";

import LoadImages from "../common/LoadImages";

function SearchImg() {
  let { search } = useParams();

  const [pageNo, setPageNo] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);


  // data fetch
  const fetchPhotos = () => {
     setFetchLoading(true);
     API.get(
      `/search/photos?page=${pageNo}&per_page=${per_page}&query=${search}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    )
      .then((res) => {
        setPageNo((p) => p + 1);
        setPhotos((prev) => [...prev, ...res.data.results]);
        setLoading(false);
        setFetchLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    if(fetchLoading){
      fetchPhotos();
    }
  }, [fetchLoading]);

  useEffect(() => {
    setLoading(true);
    setPhotos([]);
    fetchPhotos();
  }, [search]);
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

export default SearchImg;
