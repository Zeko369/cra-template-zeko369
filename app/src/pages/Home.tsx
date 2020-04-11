import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

const Home: React.FC = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Link to="/page">Page</Link>
      <br />
      <Button onClick={(): void => setCount((v) => v + 1)}>This is a button: {count}</Button>
    </div>
  );
};

export default Home;
