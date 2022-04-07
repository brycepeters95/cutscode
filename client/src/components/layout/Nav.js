import React, { useRef, Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {  logout } from '../../actions/auth';
import moment from 'moment';

const Nav = ({ auth: {user, isAuthenticated,loading}, logout}) => {

  const [show, setShow] = useState(false);
  const [read, setRead] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authLinks = (
    <ul className="navbar-nav ms-auto flex-nowrap">
      <li className='nav-item'>
        {read === true ? (
          <i className = 'fas fa-bell read' onClick = {handleShow} />
        ):(
         <i className = 'far fa-bell' onClick = {handleShow} />
       
        )}
      </li>
      <li className='nav-item'>
        <Link to='/'>
         Home
        </Link>
      </li>
      <li className='nav-item'>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    
    <ul className="navbar-nav ms-auto flex-nowrap">
      <li className='nav-item'>
      <a href="/register" class="nav-link m-2 menu-item nav-active">Register</a>
      </li>
      <li className='nav-item'>
      <a href="/login" class="nav-link m-2 menu-item nav-active">Login</a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
        <a className="navbar-brand-left" href="/#!">CUTZ</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item"><a className="nav-link active" aria-current="page" href="#!">Home</a></li>
            
            </ul> */}

            {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
        </div>
    </div>
</nav>

  )
}
Nav.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Nav);