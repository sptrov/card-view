import "./CardView.module.scss";
import styles from "./CardView.module.scss";
import CategorySelector from "../CategorySelector/index";
import { getProducts } from "../../api/greetHttpClient";
import { useEffect, useState } from "react";
import Card from "../Card/index";

import _ from "lodash";

const CardView = () => {
  let [products, setProducts] = useState([]);
  let [filteredProducts, setFilteredProducts] = useState([]);

  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getProducts(page).then((res) => {
      const prods = _.map(res, (p) => {
        return { ...p, totalPrice: +p.prices.price };
      });
      const combined = [...products, ...prods];
      const sortedProduct = _.orderBy(combined, [sortBy], [sortOrder]);

      setProducts(sortedProduct);
      setFilteredProducts([]);

      const categories = _.uniqBy(
        _.flatMap(combined, (p) => p.categories),
        "id"
      );
      setCategories(categories);
      window.addEventListener("scroll", loadMore, false);
    });

    const loadMore = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.scrollingElement.scrollHeight
      ) {
        const newPage = page + 1;
        setPage(newPage);
        window.removeEventListener("scroll", loadMore);
      }
    };

    return () => {
      window.removeEventListener("scroll", loadMore);
    };
  }, [page]);

  const categorySelect = (catId) => {
    if (catId) {
      let filteredProducts =
        //_.orderBy(
        _.filter(products, (p) => {
          return _.includes(_.map(p.categories, "id"), catId);
        });
      // ,
      // [sortBy],
      // [sortOrder]
      // );

      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts([]);
      return;
    }
  };

  //Code below should go into a sorting component
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("name");

  const changeSortOrder = () => {
    if (sortOrder === "asc") {
      sortProducts(sortBy, "desc");
    } else {
      sortProducts(sortBy, "asc");
    }
  };
  const sortProducts = (sortVerb, order) => {
    if (sortVerb) {
      setSortBy(sortVerb);
    }
    if (order) {
      setSortOrder(order);
    }

    if (filteredProducts && filteredProducts.length > 0) {
      const sortedProduct = orderProducts(filteredProducts, sortVerb, order);
      setFilteredProducts(sortedProduct);
    }
    const sortedProduct = orderProducts(products, sortVerb, order);

    setProducts(sortedProduct);
  };

  const orderProducts = (products, sortVerb, order) => {
    return _.orderBy(products, [sortVerb || sortBy], [order || sortOrder]);
  };

  return (
    <div className={styles.container}>
      <CategorySelector
        categories={categories}
        onChange={categorySelect}
      ></CategorySelector>
      {/* Should go into a sorting component */}
      <div className={styles.sortContainer}>
        <div>Sort By:</div>
        <div
          onClick={() => sortProducts("name")}
          className={`${styles.sortElement} + ${
            sortBy === "name" && styles.selected
          }`}
        >
          Name
        </div>
        <div
          onClick={() => sortProducts("totalPrice")}
          className={`${styles.sortElement} + ${
            sortBy === "totalPrice" && styles.selected
          }`}
        >
          Price
        </div>
        <div className={styles.sortOrder} onClick={changeSortOrder}>
          {sortOrder}
        </div>
      </div>
      <div className={styles.containerMain}>
        {filteredProducts &&
          filteredProducts.length > 0 &&
          filteredProducts.map((product, index) => {
            return <Card key={product.id} item={product} />;
          })}
        {(!filteredProducts || filteredProducts.length === 0) &&
          products &&
          products.map((product, index) => {
            return <Card key={product.id} item={product} />;
          })}
      </div>
    </div>
  );
};

export default CardView;
