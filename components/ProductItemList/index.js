import React from "react";
import './index.css';

export default function ProductItemList({ list }) {
  return (
    <div className="product-items">
      {list.map((item, index) => (
        <div key={index} className="product-item-text">
          <div className="square-item"></div>
          {item}
        </div>
      ))}
    </div>
  )
}
