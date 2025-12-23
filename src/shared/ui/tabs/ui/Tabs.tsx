import './Tabs.scss';
import type { TabsProps } from '../model/types.ts';

const Tabs = ({ tabs, value, onChange }: TabsProps) => {
  return (
    <div className="tabs">
      <div className="tabs__header">
        {tabs.map((tab) => (
          <button
            className={`
              tabs__header__tab
              text-sm-medium
              ${tab.id === value ? 'tabs__header__tab--active' : ''}
            `}
            key={tab.id}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tabs__content">
        {tabs.find((tab) => tab.id === value)?.content}
      </div>
    </div>
  );
};

export default Tabs;
