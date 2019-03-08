import React from "react";
import {link} from "react-router";


export const header = (props) =>{
  return (
      <nav className = "navbar navbar-default">
        <div className = " Container">
          <div className = "navbar-header">
            <ul className = "nav navbar-nav">
              <li><Link to ={"/home"}>Home</Link></li>
              <li><Link to ={"/user"}>User</Link></li>
            </ul>
          </div>
        </div>
      </nav>
  );
}
default export header;
