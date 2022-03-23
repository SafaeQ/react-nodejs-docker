import React from "react";
import { NavLink } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

const ChoseRole = () => {
  return (
    <div>
      <form>
        <div className="card-group">
          <div className="card">
            <Image
              src="https://www.websfarm.net/wp-content/uploads/2020/08/landing-page.png"
              className="mx-auto d-block card-img-top"
              alt="Sample image"
            />
            <div className="card-body col-md-12 text-center">
              <Button className="btn btn-warning">
                <NavLink to="/login/login-as-owner">login as Owner</NavLink>
              </Button>
            </div>
          </div>

          <div className="card">
            <Image
              src="https://www.seopro.ae/wp-content/uploads/2020/12/Asset-3-1024x716.png"
              className="card-img-top"
              alt="Sample image"
            />
            <div className="card-body col-md-12 text-center">
              <Button className="btn btn-warning">
                <NavLink to="/login/login-as-customer">
                  login as Customer
                </NavLink>
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChoseRole;
