import React from "react";
import '../styles/DocumentContainer.css';
import { useSelector } from 'react-redux';

export default function DocumentContainer() {
  const selectedId = useSelector(state => state.selectedDocId) ;
    //style={{ width: "500px", height: "1000px", backgroundColor: "purple", borderColor: "brown"}}
  return (
    <div className="container" style={{ /*width: "500px", height: "100vh",backgroundColor: "purple", borderColor: "brown"*/ }} >
      <h1 >Document Container</h1>
      { selectedId }
      
    </div>
  );
}
