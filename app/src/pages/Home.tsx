import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Input } from "@chakra-ui/core";

const Home: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Link to="/page">Page</Link>
      <br />
      <i className="material-icons">delete</i>
      <Button onClick={(): void => setCount((v) => v + 1)}>This is a button: {count}</Button>
      <Input />
    </div>
  );
};

export default Home;
