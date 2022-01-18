import styles from "./Card.module.scss";
import Cart from "../Buttons/cart/index";

const Card = (props) => {
  let { item } = props;
  let { categories, images } = item;

  let thumbnail = images[0].thumbnail;

  function createDescription() {
    return { __html: item.short_description };
  }
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={thumbnail} alt={"logo"} />
      </div>

      <div>{item.name}</div>
      <div>{item.prices.price}</div>

      <div
        className={styles.description}
        // kind of stupid to directly display what comes from the server here, but since I believe
        //the server should have proper validation agains xss attacsks, and on purpuse of
        //displaying the data for the task I am using it.
        dangerouslySetInnerHTML={createDescription()}
      ></div>

      <div className={styles.categoryContainer}>
        {categories &&
          categories.map((cat) => (
            <div className={styles.category} key={cat.id}>
              {cat.name}{" "}
            </div>
          ))}
      </div>

      <Cart
        text="Add to Cart"
        externalLink={true}
        address={`https://greet.bg/${item.add_to_cart.url}`}
      ></Cart>
    </div>
  );
};

export default Card;
