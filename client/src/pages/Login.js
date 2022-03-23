// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { Image } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

// const Login = (props) => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const enteredEmailHandler = ({ target }) => {
//     setEmail(target.value);
//   };
//   const enteredPasswordHandler = ({ target }) => {
//     setPassword(target.value);
//   };
//   const loginSubmitHandler = (event) => {
//     event.preventDefault();
//     const userCredential = {
//       email,
//       password,
//     };
//     sendInput(userCredential);
//   };
//   const urls = [
//     "http://localhost/owner/login",
//     "http://localhost/customer/login",
//   ];
//   const sendInput = async (userCredential) => {
//     for (const url of urls) {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(userCredential),
//       });
//       const result = await response.json();
//       if (response.ok == true) {
//         alert(result.output);
//         props.onLogin("true");
//         navigate("/profile");
//         break;
//       }
//     }
//     // const response = await fetch("http://localhost/owner/login", {
//     //   method: "POST",
//     //   headers: { "Content-type": "application/json" },
//     //   credentials: "include",
//     //   body: JSON.stringify(userCredential),
//     // });
//     // const result = await response.json();
//     // if (response.status === 200) {
//     //   alert(result.output);
//     //   props.onLogin("true");
//     //   navigate("/profile");
//     // } else {
//     //   const response2 = await fetch("http://localhost/customer/login", {
//     //     method: "POST",
//     //     headers: { "Content-type": "application/json" },
//     //     credentials: "include",
//     //     body: JSON.stringify(userCredential),
//     //   });
//     //   const result2 = await response2.json();
//     //   if (response2.status === 200) {
//     //     alert(result2.output);
//     //     props.onLogin("true");
//     //     navigate("/profile");
//     //   } else {
//     //     const response3 = await fetch("http://localhost/admin/login", {
//     //       method: "POST",
//     //       headers: { "Content-type": "application/json" },
//     //       credentials: "include",
//     //       body: JSON.stringify(userCredential),
//     //     });
//     //     const result3 = await response3.json();
//     //     if (response3.status === 200) {
//     //       alert(result3.output);
//     //       props.onLogin("true");
//     //       navigate("/profile");
//     //     } else {
//     //       alert(result.output);
//     //     }
//     //   }
//     // }
//   };
//   return (
//     <div>
//       <section className="vh-100">
//         <div className="container h-100">
//           <div className="row d-flex justify-content-center align-items-center h-100 ">
//             <div className="col-lg-12 col-xl-11">
//               <div className="card text-black">
//                 <div className="card-body p-md-5">
//                   <div className="row justify-content-center">
//                     <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
//                       <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
//                         Login
//                       </p>

//                       <form
//                         onSubmit={loginSubmitHandler}
//                         className="mx-1 mx-md-4"
//                       >
//                         <div className="d-flex flex-row align-items-center mb-4">
//                           <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
//                           <div className="form-outline flex-fill mb-0">
//                             <label className="form-label">Email</label>
//                             <input
//                               type="text"
//                               name="text"
//                               className="form-control"
//                               onChange={enteredEmailHandler}
//                             />
//                           </div>
//                         </div>

//                         <div className="d-flex flex-row align-items-center mb-4">
//                           <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
//                           <div className="form-outline flex-fill mb-0">
//                             <label className="form-label">Password</label>
//                             <input
//                               type="password"
//                               name="password"
//                               className="form-control"
//                               onChange={enteredPasswordHandler}
//                             />
//                           </div>
//                         </div>

//                         <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
//                           <button
//                             type="submit"
//                             className="btn btn-primary btn-lg"
//                           >
//                             Submit
//                           </button>
//                         </div>
//                         <NavLink to="/login/reset-password">
//                           Forget Password
//                         </NavLink>
//                       </form>
//                     </div>
//                     <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
//                       <Image
//                         src="https://as2.ftcdn.net/v2/jpg/02/34/32/13/1000_F_234321332_znN7GKnrrOV3V9Ol4DTQW5LL24zZQ1oF.jpg"
//                         className="img-fluid"
//                         alt="Sample image"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Login;
import React from "react";
import ChoseRole from "./login/ChoseRole";
const Login = () => {
  return <ChoseRole />;
};

export default Login;
