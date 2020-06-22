import React, { useState } from "react";

function PublicResult() {
  const [score, setScore] = useState([53, 23, 30]);
  score.sort(function (a, b) {
    return a - b;
  });
  console.log(score);
  return (
    <div>
      {/* {score.map((res) => (
        <div>{res.score}</div>
      ))} */}
      {score}
      {}
    </div>
  );
}

export default PublicResult;
