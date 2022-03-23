import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const initialValues = { password: "", confirmPassword: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  console.log(params.token);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const resetPasswordSubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  useEffect(async () => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
      const response = await fetch(
        `http://localhost:80/owner/reset-password/${params.userId}/${params.token}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formValues),
        }
      );
      const result = await response.json();
      if (response.ok === true) {
        Swal.fire({
          icon: "success",
          text: `${result.output}`,
        });
        navigate("/login/login-as-owner");
      } else {
        const response2 = await fetch(
          `http://localhost:80/customer/reset-password/${params.userId}/${params.token}`,
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            credentials: "include",
            body: JSON.stringify(formValues),
          }
        );
        const result2 = await response2.json();
        if (response2.ok === true) {
          Swal.fire({
            icon: "success",
            text: `${result.output}`,
          });
          navigate("/login/login-as-customer");
        } else {
          Swal.fire({
            icon: "error",
            text: `${result.output}`,
          });
        }
      }
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "ConfirmPassword does not match password!";
    }
    return errors;
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
                        Reset Password
                      </p>

                      <form
                        onSubmit={resetPasswordSubmitHandler}
                        className="mx-1 mx-md-4"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              name="password"
                              className="form-control"
                              value={formValues.password}
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>
                              {formErrors.password}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              name="confirmPassword"
                              className="form-control"
                              value={formValues.confirmPassword}
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>
                              {formErrors.confirmPassword}
                            </p>
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

export default ResetPassword;
