import Select, { type SingleValue } from 'react-select';

const SimpleSelect = ({
  value,
  onChange,
  options,
  label,
}: {
  value?: string | number | null;
  options: { id: string; name: string }[];
  onChange: (value: string | number | null) => void;
  label?: string;
}) => {
  const selectOptions = options.map((o) => ({
    value: o.id,
    label: o.name,
  }));

  const selectedValue =
    selectOptions.find((o) => o.value === String(value)) || null;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        maxWidth: '200px',
        minWidth: '150px',
        display: 'flex',
        gap: '4px',
        flexDirection: 'column',
      }}
    >
      <label className="text-sm-regular" style={{ color: 'var(--color-gray)' }}>
        {label}
      </label>
      <Select
        placeholder="Выберите"
        options={selectOptions}
        value={selectedValue}
        onChange={(option: SingleValue<any>) =>
          onChange(option ? option.value : null)
        }
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        }}
      />
    </div>
  );
};

export default SimpleSelect;
