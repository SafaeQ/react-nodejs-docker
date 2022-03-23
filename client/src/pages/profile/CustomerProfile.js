import React, { useEffect, useState } from "react";
import SideBar from "../admin/components/SideBar";

const CustomerProfilePage = () => {
  const [result, setResult] = useState("");
  useEffect(async () => {
    const response = await fetch("http://localhost/customer/profile", {
      method: "GET",
      credentials: "include",
    });
    const result = await response.json();
    if (response.ok === true) {
      setResult(result.output.customer);
    } else {
      alert(result.output);
    }
  }, []);
  return (
    <>
    <SideBar/>
    <div class="container">
      <h1 className="text-center">customer</h1>
      <br/>
      <h1>{result.name}</h1>
      <div class="container h-100" >

      <div class="row justify-content-center h-100">
      <div class="col-md-8">
            <table class="table table-striped table-dark table-hover" >
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>
              <a className="btn btn-outline-primary">Edit</a>
              <a className="btn btn-outline-danger">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      </div>
      </div>
    </div>
    </>
  );
};

export default CustomerProfilePage;
