import './BreadCrumbs.scss';
import { Link } from 'react-router';

type BreadCrumbsItem = {
  label: string;
  href?: string;
};

interface BreadCrumbsProps {
  items: BreadCrumbsItem[];
}

const BreadCrumbs = ({ items }: BreadCrumbsProps) => {
  return (
    <nav className="bread-crumbs">
      {items.map((item, index) => {
        const isLastItem = index === items.length - 1;

        return (
          <div className="bread-crumbs__item text-sm-regular" key={index}>
            {isLastItem ? (
              <span className="bread-crumbs__item__current">{item.label}</span>
            ) : item.href ? (
              <Link to={item.href} className="bread-crumbs__item__previous">
                {item.label}
              </Link>
            ) : (
              <span className="bread-crumbs__item__previous">{item.label}</span>
            )}
            {!isLastItem && <span className="bread-crumbs__separator">/</span>}
          </div>
        );
      })}
    </nav>
  );
};

export default BreadCrumbs;
