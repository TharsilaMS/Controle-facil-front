import React from 'react';


const Feature = ({ title, description }) => {
  return (
    <div className="feature">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default Feature;
