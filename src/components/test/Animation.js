import React from "react";

const Animation = () => {
  return (
    <div id="outerContainer">
      <div id="container">
        <div class="item">
          <img src="https://www.kirupa.com/images/orange.png" />
        </div>
        <div class="circle" style={{ animationDelay: "0s" }}></div>
        <div class="circle" style={{ animationDelay: "1s" }}></div>
        <div class="circle" style={{ animationDelay: "2s" }}></div>
        <div class="circle" style={{ animationDelay: "3s" }}></div>
      </div>
    </div>
  );
};

export default Animation;
