import styles from "./CategorySelector.module.scss";
import { useState } from "react";

import { useEffect } from "react";

const CategorySelector = (props) => {
  let [selectedCategory, setSelectedCategory] = useState(null);

  const { categories, onChange } = props;

  useEffect(() => {
    setSelectedCategory(null);
  }, [categories]);

  const categorySelect = (el) => {
    if (selectedCategory && selectedCategory.id === el.id) {
      setSelectedCategory(null);
      onChange(null);
      return;
    }
    setSelectedCategory(el);
    onChange(el.id);
  };

  return (
    <div className={styles.container}>
      {categories.map((c, index) => {
        return (
          <div
            className={
              selectedCategory && selectedCategory.id === c.id
                ? styles.selectedCategory
                : styles.category
            }
            onClick={() => categorySelect(c)}
            key={c.id}
          >
            {c.name}
          </div>
        );
      })}
    </div>
  );
};

export default CategorySelector;
