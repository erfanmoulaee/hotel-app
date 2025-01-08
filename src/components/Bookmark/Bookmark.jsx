import React from "react";
import Map from "../Map/Map";

function Bookmark() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <div>Bookmark list</div>
      </div>
      <Map markerLocation={[]} />
    </div>
  );
}

export default Bookmark;
