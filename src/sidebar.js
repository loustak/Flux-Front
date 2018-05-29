import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './override.css'

export default class SideBar extends React.Component {

  render() {
    return(
      <nav id="community-sidebar">
        <ul className="list-unstyled components">
          <li className="active"><a href="#">Community 1</a></li>
          <li><a href="#">Community 2</a></li>
          <li><a href="#">Community 3</a></li>
        </ul>
      </nav>
    )
  }
}