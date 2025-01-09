import React, { useEffect } from "react";
import { useBookmark } from "../context/BookmarkListContext";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentBookmark, isLoadingCurrentBookmark, getBookmark } = useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;

  return (
    <div>
      <button className="btn btn--back" onClick={() => navigate(-1)}>
        &larr;Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <p>
        {currentBookmark.cityName} - {currentBookmark.country}
      </p>
    </div>
  );
}

export default SingleBookmark;
