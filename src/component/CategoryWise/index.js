import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import API from "../../Api";
import "../HomePage/homePageStyles.css";
import {mockdata} from "../../mockdata";

import LoadImages from "../common/LoadImages";

function Category() {
  let { catId } = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [per_page, setPer_page] = useState(10);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchLoading, setFetchLoading] = useState(false);

  const navigate = useNavigate();

  const go = () => {
    navigate({
      pathname: "/photos/car",
    });
  };

  const fetchPhotos = () => {
    setFetchLoading(true);
    // API.get(
    //   `/search/photos/?page=${pageNo}&per_page=${per_page}&query=${catId}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    // )

      const data = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(mockdata);
        }, 1000);
      });
      data
      .then((res) => {
        setPageNo((p) => p + 1);
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
    if(fetchLoading){
      console.log("fetching")
      fetchPhotos();
    }
  }, [fetchLoading,catId]);

  useEffect(() => {
    setPhotos([]);
    setLoading(true);
    fetchPhotos();
  }, [catId]);
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

export default Category;
