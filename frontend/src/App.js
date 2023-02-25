import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

//Pages-------------------
import LogIn from "./pages/login";
import Register from "./pages/signup";
import Recipe from "./pages/recipe";
import NoPage from "./pages/nopage";

const APIUrl = process.env.REACT_APP_APIURL;

function App() {

  //Environment Variables Configured Message
  console.log(process.env.REACT_APP_ENV_STATUS);

  //Initializing backend connection
  axios
    .post(`${APIUrl}/init`)
    .then((res) => {
      if (res.data.status === "Connected") {
        console.log(res.data.message);
      }
      else {
        console.log("Error Connecting Backend");
      }
    }).catch((e) => {
      console.log("Error Connecting Backend :", e)
    }).finally(() => {
      console.log("Backend Connection finished")
    })

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/reg" element={<Register />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
