// src/components/Spinner.tsx
import React from 'react';
import { ClipLoader } from 'react-spinners';
import './Spinner.css'; // Import the CSS for the spinner

interface SpinnerProps {
  loading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ loading }) => {
  return (
    <div className="spinner-container">
      <div className="spinner-wrapper">
        <ClipLoader className="spinner" color="#696969" loading={loading} size={50} />
      </div>
    </div>
  );
};

export default Spinner;