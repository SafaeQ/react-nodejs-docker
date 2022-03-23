import React from "react";
import { Link } from "react-router-dom";
import {Image, Button } from 'react-bootstrap'
import './ChoseRole.css';

const ChoseRole = () => {
  return (
    <div class="container">
      <form>

        <div className="d-flex justify-content-between">
          <div className="card 1">
            <div className="card-image">
            <Image src="https://www.websfarm.net/wp-content/uploads/2020/08/landing-page.png" className="mx-auto d-block card-img-top" alt="Sample image"/>
            <div className="card-body col-md-12 text-center">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Link to="/sign-up/sign-up-as-owner"><Button className="btn btn-warning">signUp as Owner</Button></Link>
            </div>
            </div>
          </div>

          <div className="card 2">
            <div className="card-image">
            <Image src="https://www.websfarm.net/wp-content/uploads/2020/08/landing-page.png" className="card-img-top" alt="Sample image"/>
            <div className="card-body col-md-12 text-center">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Link to="/sign-up/sign-up-as-customer"> <Button className="btn btn-warning">signUp as Customer</Button></Link>
            </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChoseRole;
