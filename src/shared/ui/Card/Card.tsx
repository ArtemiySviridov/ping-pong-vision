import './Card.scss';

interface CardProps {
  type: 'stats-s' | 'stats-l' | 'stats-list';
  title: string;
  text: number | string | string[];
  color?: 'light-blue' | 'turquoise' | 'light-orange' | 'pink';
}

const Card = ({ type, title, text, color }: CardProps) => {
  return (
    <>
      <div className={`card card--${type} ${color ? `card--${color}` : ''}`}>
        <h3 className="card__title">{title}</h3>
        <p className="card__text text-xl-bold">{text}</p>
      </div>
    </>
  );
};

export default Card;
