import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./pagination.css";

const Paginations = () => {
  const [products, setProduct] = useState([]);

  console.log("prod", products);
  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (data && data.products) {
      setProduct(data.products);
    }
    console.log("data pagination", data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h1>Pagination</h1>

      {products.length > 0 && (
        <div className="products">
          {products.map((el, index) => {
            return <span>{el.brand}</span>;
          })}
        </div>
      )}
    </div>
  );
};

export default Paginations;
