import React from 'react';
import './Feature.css';

const Feature = ({ title, description, icon }) => {
  return (
    <div className="feature">
      <div className="feature-icon">
        <i className={`fa ${icon}`}></i>
      </div>
      <div className="feature-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Feature;
