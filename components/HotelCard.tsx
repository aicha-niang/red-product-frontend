// components/HotelCard.tsx
import styles from '../styles/HotelCard.module.css';

interface HotelCardProps {
  name: string;
  address: string;
  price: number;
  imageUrl: string;
}

const HotelCard = ({ name, address, price, imageUrl }: HotelCardProps) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={name} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.address}>{address}</p>
        <p className={styles.price}>{price.toLocaleString()} FCFA</p>
      </div>
    </div>
  );
};

export default HotelCard;
