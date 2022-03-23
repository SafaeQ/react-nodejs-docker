import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CustomerSignUp = () => {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const registerSubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(async () => {
    if (Object.keys(formErrors).length == 0 && isSubmit) {
      console.log(formValues);
      const response = await fetch("http://localhost/customer/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formValues),
      });
      const result = await response.json();
      if (response.ok) {
        console.log(result.output);
        Swal.fire({
          icon: "success",
          title: `You are registered`,
          showConfirmButton: false,
          timer: 2500,
        });
        navigate("/login/login-as-customer");
      } else {
        Swal.fire({
          title: "Error!",
          text: `${result.output}`,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Name is required!";
    } else if (values.name.length < 4) {
      errors.name = "Name too short!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.confirmEmail) {
      errors.confirmEmail = "confirmEmail is required!";
    } else if (values.confirmEmail !== values.email) {
      errors.confirmEmail = "ConfirmEmail does not match email!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 5 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "ConfirmPassword is required!";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "ConfirPassword does not match password!";
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
                        Customer Register
                      </p>

                      <form
                        onSubmit={registerSubmitHandler}
                        className="mx-1 mx-md-4"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Your Name</label>
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              value={formValues.name}
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>{formErrors.name}</p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Your Email</label>
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={formValues.email}
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>{formErrors.email}</p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <label className="form-label">Confirm Email</label>
                            <input
                              type="text"
                              name="confirmEmail"
                              className="form-control"
                              value={formValues.confirmEmail}
                              onChange={handleChange}
                            />
                            <p style={{ color: "red" }}>
                              {formErrors.confirmEmail}
                            </p>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
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
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
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
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <Image
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

export default CustomerSignUp;
