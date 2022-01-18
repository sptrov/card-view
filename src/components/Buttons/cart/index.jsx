import styles from "./cart.module.scss";

const Cart = (props) => {
  const { text, externalLink = false, address } = props;
  const handleNavigation = () => {
    if (externalLink) {
      window.location.href = address;
    } else {
      //TODO
    }
  };

  return (
    <div className={styles.base} onClick={handleNavigation}>
      {text}
    </div>
  );
};

export default Cart;
