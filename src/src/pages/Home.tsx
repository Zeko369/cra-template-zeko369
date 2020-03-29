import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home = () => {
  return (
    <div>
      Hello from Home
      <br />
      <Button>This is a button</Button>
      <br />
      <Link to="/page">Page</Link>
    </div>
  );
};

export default Home;
