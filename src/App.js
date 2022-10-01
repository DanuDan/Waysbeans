import "bootstrap/dist/css/bootstrap.min.css";
import logo from './assets/Logo.svg';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Route, Routes} from 'react-router-dom';
import './App.css';
import './assets/styles.css'
import LandingPage from './pages/LandingPage';
import Cart from './pages/Cart';
import AddProduct from './pages/AddProduct'
import { UserContext } from "./context/userContext";
import Profile from "./pages/Profile";
import Detail from "./pages/Detail";
import EditProfile from "./pages/UpdateProfile";
import IncomeTransaction from "./pages/IncomeTransaction";
import ListProduct from "./pages/ListProduct";
import { API, setAuthToken } from "./config/api";


function App() {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect Auth
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (state.isLogin == false) {
      navigate("/");
    } else {
      if (state.user.status == "admin") {
        navigate("/IncomeTransaction");
        // history.push("/complain-admin");
      } else if (state.user.status == "customer") {
        navigate("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);

  return (
    <div className="App">
          <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
            <Route exact path="/cart" element={<Cart />}/>
            <Route exact path="/add-product" element={<AddProduct/>}/>
            <Route exact path="/profile" element={<Profile/>}/>
            <Route exact path="/edit/:id" element={<EditProfile/>}/>
            <Route exact path="/detail/:id" element={<Detail/>}/>
            <Route exact path="/IncomeTransaction" element={<IncomeTransaction/>}/>
            <Route exact path="/ListProduct" element={<ListProduct/>}/>
          </Routes>
    </div>
  );
}

export default App;
