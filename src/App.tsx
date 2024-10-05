import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "./assets/styles/main.scss";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
