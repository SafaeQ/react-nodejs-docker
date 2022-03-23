import React, { useState } from "react";
import { Image } from "react-bootstrap";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const enteredEmailHandler = ({ target }) => {
    setEmail(target.value);
  };
  const resetSubmitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost/owner/forget-password", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    const result = await response.json();
    if (response.ok === true) {
      Swal.fire({
        icon: "success",
        text: "The link was sent, please check your email acount!",
      });
      console.log(result);
    } else {
      const response2 = await fetch(
        "http://localhost/customer/forget-password",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );
      const result2 = await response2.json();
      if (response2.ok === true) {
        Swal.fire({
          icon: "success",
          text: "The link was sent, please check your email acount!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    }
  };
  return (
    <div>
      <section className="vh-100">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Forget Password
                      </p>

                      <form
                        onSubmit={resetSubmitHandler}
                        className="mx-1 mx-md-4"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Email</label>
                            <input
                              type="text"
                              name="text"
                              className="form-control"
                              onChange={enteredEmailHandler}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <Image
                        src="https://as2.ftcdn.net/v2/jpg/02/34/32/13/1000_F_234321332_znN7GKnrrOV3V9Ol4DTQW5LL24zZQ1oF.jpg"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetPassword;
