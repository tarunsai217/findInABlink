import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import Comedy from "./Pages/Comedy/Comedy";
import Main from "./Pages/Main/Main";
import NotFound from "./Pages/NotFound/NotFound";
import Layout from "./Layout/Layout";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import { Fragment } from "react";
function App() {
  return (
    <Fragment>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              path="/main"
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />
            <Route
              path="/main"
              element={
                <PrivateRoute>
                  <Main />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer />
    </Fragment>
  );
}

export default App;
