import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import API from "../../containers/utils/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const notify = (text, status) => {

    if (status === 200 || status === 201) toast.success(`${text}`)
    if (status === 401) toast.error(`${text}`)
  }
  function Submit() {
    const resBody = {
      email: email,
      password: password,
    };
    API.post(`/login`, resBody)
      .then((res) => {
        notify(`Success`, res.status)
        localStorage.setItem("onlineShopUserToken", res.data.token);
        setTimeout(() => {
          navigate("/")
        }, 5500)

      })
      .catch(err => notify(err.response?.data.message, err.response?.status))
  }

  return (
    <div id="wrapper" className="wrapper-full ">
      <ToastContainer />
      <Navbar />
      <div className="main-container container">
        <ul className="breadcrumb">
          <li>
            <Link to="/">
              <i className="fa fa-home"> </i>
            </Link>
          </li>
          <li>
            <p>Login</p>
          </li>
        </ul>

        <div className="row">
          <div id="content" className="col-lg-6 ">
            <div>
              <div className="col-lg-12 customer-login">
                <div className="well">
                  <p>
                    <strong>Login</strong>
                  </p>
                  <div className="form-group">
                    <label className="control-label ">E-Mail Address</label>

                    <input
                      type="email"
                      className="form-control"
                      onChange={({ target }) => setEmail(target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={({ target }) => setPassword(target.value)}
                    />
                  </div>
                </div>
                <div className="bottom-form">
                  <Link to="/register" className="forgot">
                    Forgotten Password
                  </Link>
                  <button
                    className="btn btn-default pull-right"
                    onClick={() => {
                      Submit();
                      notify()
                    }}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
}

export default Login;
