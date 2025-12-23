import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useEffect } from 'react';
import './Carousel.scss';
interface Props {
  items: React.ReactNode[];
}

const SpacingSlider: React.FC<Props> = ({ items }) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 'auto',
      spacing: 10,
    },
  });
  useEffect(() => {
    instanceRef.current?.update();
  }, [items]);

  return (
    <div ref={sliderRef} className="keen-slider">
      {items.map((item, index) => (
        <div key={index} className="keen-slider__slide carousel__slide">
          {item}
        </div>
      ))}
    </div>
  );
};

export default SpacingSlider;
