import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      Hello from Home
      <br />
      <Link to="/page">Page</Link>
    </div>
  );
};

export default Home;
