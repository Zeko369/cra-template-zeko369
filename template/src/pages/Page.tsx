import React from "react";
import { Link } from "react-router-dom";

const Page: React.FC = () => {
  return (
    <div>
      Hello from page
      <br />
      <Link to="/">Home</Link>
    </div>
  );
};

export default Page;
