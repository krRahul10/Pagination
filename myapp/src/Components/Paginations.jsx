import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import "./pagination.css";

const Paginations = () => {
  //'https://dummyjson.com/products?limit=10&skip=10&select=title,price'
  // slice(page * 10 - 10, page * 10)

  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchData = async () => {
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await res.json();

    if (data && data.products) {
      setProduct(data.products);
      setTotalPages(data.total / 10);
    }
  };

  const setPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <div>
      <h1>Pagination</h1>

      {products.length > 0 && (
        <div className="products">
          {products.map((el, index) => {
            return (
              <span className="products__single" key={el.id}>
                <img src={el.thumbnail} alt={el.title} />
                <span>{el.title}</span>
              </span>
            );
          })}
        </div>
      )}

      {products.length && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => setPageHandler(page - 1)}
          >
            ◀️
          </span>
          {[...Array(totalPages)].map((_, index) => {
            return (
              <span
                className={page === index + 1 ? "pagination__selected" : ""}
                key={index}
                onClick={() => setPageHandler(index + 1)}
              >
                {index + 1}
              </span>
            );
          })}
          <span
            className={page < totalPages ? "" : "pagination__disable"}
            onClick={() => setPageHandler(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </div>
  );
};

export default Paginations;
