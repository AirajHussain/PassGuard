import React from "react";
import CountUp from 'react-countup';
import { Button, Card, Flex, Typography,Col,  Row, Statistic, Space } from 'antd';

import passLogo from "../Assets/pass-logo.png";
import notesLogo from "../Assets/notes-logo.png";
import cardLogo from "../Assets/card-logo.png";
import addressLogo from "../Assets/address-logo.png";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function DashboardContent() {
  
  const loginInfo = useSelector((state) => state.loginReducer);
  const history = useHistory()
  //ant-d stuff 
  const formatter = (value) => <CountUp end={value} separator="," />;

  const cardStyle = {
    width: 620,
  };
  const imgStyle = {
    display: 'block',
    width: 273,
  };

  return ( 
    <div className="DashboardContent"> 
      <h1>Welcome Airaj Hussain!</h1>

      <div className="antstat">
        <Row gutter={16}>
          <Col span={5}>
            <Statistic
              title="Active Users"
              value={12340}
              formatter={formatter}
            />
            
          </Col>
          
          <Col span={5}>
            <Statistic
              title="Total Accounts Created"
              value={45780}
              precision={2}
              formatter={formatter}
            />
          </Col>

          <Col span ={5}>
            <Statistic
              title="Daily Login Today"
              value={8210}
              precision={2}
              formatter={formatter}
            />
          </Col>

          <Col span={5}>

            <Statistic
              title="Total Passwords Store"
              value={153200}
              precision={2}
              formatter={formatter}
            />
          </Col>

            <Col>

            <Statistic
              title="Number of Breaches Prevented"
              value={432}
              precision={2}
              formatter={formatter}
            />
          </Col>

        </Row>
      </div>

      <div className="antcard">
      <div class="col-sm">
            <div
              class="card dashboard-card"
              onClick={() => {
                history.push("/dashboard/passwords");
              }}
              style={{ width: "18rem" }}
            >
              <img src={passLogo} class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Passwords</h5>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div
              class="card dashboard-card"
              onClick={() => {
                history.push("/dashboard/credit-cards");
              }}
              style={{ width: "18rem" }}
            >
              <img src={cardLogo} class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Credit Cards</h5>
              </div>
            </div>
          </div>

          <div class="col-sm">
            <div
              class="card dashboard-card"
              onClick={() => {
                history.push("/dashboard/notes");
              }}
              style={{ width: "18rem" }}
            >
              <img src={notesLogo} class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Notes</h5>
              </div>
            </div>
          </div>
          <div class="col-sm">
            <div
              class="card dashboard-card"
              onClick={() => {
                history.push("/dashboard/addresses");
              }}
              style={{ width: "18rem" }}
            >
              <img src={addressLogo} class="card-img-top" alt="..."></img>
              <div class="card-body">
                <h5 class="card-title">Addresses</h5>
              </div>
            </div>
          </div>

     
     
        
      </div>

      <div className="other">
        <h2>Privacy policy</h2> <h2>| </h2><h2>Terms of Service</h2>
      </div>


    </div>
  );
}

export default DashboardContent;
