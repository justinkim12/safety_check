import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
//
function Test() {
    const a=2;
    const Results = () => (
        <div id="results" className="search-results">
          Some Results
        </div>
      )
    return (
        <div>
            {a==2?(
        <div id="results" className="search-results">
          Some Results
        </div>
      ):null}
        </div>
    );
};

export default Test;