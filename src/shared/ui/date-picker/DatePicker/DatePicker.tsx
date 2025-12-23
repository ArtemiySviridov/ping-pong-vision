import React, { useState } from 'react';
import { DayPicker, type DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { ru } from 'react-day-picker/locale';

type SingleProps = {
  mode: 'single';
  value?: Date;
  onChange: (date?: Date) => void;
};

type RangeProps = {
  mode: 'range';
  value?: DateRange;
  onChange: (range?: DateRange) => void;
};

type DatePickerProps = SingleProps | RangeProps;

function getLabel(props: DatePickerProps) {
  if (props.mode === 'single') {
    return props.value
      ? props.value.toLocaleDateString('ru-RU')
      : 'Выберите дату';
  }

  const from = props.value?.from;
  const to = props.value?.to;

  if (!from) return 'Выберите период';
  if (!to) return from.toLocaleDateString('ru-RU');

  return `${from.toLocaleDateString('ru-RU')} — ${to.toLocaleDateString('ru-RU')}`;
}

const popoverStyles: React.CSSProperties = {
  position: 'absolute',
  zIndex: 10,
  background: '#fff',
  border: '1px solid var(--color-border)',
  borderRadius: 10,
  padding: 8,
};

const DatePicker = (props: DatePickerProps) => {
  const [open, setOpen] = useState(false);

  const handleSingleSelect = (date: any) => {
    props.onChange(date);
    setOpen(false);
  };

  const handleRangeSelect = (range: any) => {
    props.onChange(range);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: '4px', flexDirection: 'column' }}>
        <span
          className="text-sm-regular"
          style={{ color: 'var(--color-gray)' }}
        >
          Дата(ы) проведения
        </span>
        <button
          style={{
            border: '1px solid var(--color-gray-light)',
            borderRadius: 'var(--border-radius-m)',
            padding: '14px 10px',
            cursor: 'pointer',
            fontSize: '12px',
            minWidth: '200px',
          }}
          onClick={() => setOpen((v) => !v)}
        >
          {getLabel(props)}
        </button>
      </div>

      {open && (
        <div style={popoverStyles}>
          {props.mode === 'single' ? (
            <DayPicker
              mode="single"
              locale={ru}
              selected={props.value}
              onSelect={handleSingleSelect}
              // disabled={{ before: new Date() }}
            />
          ) : (
            <DayPicker
              mode="range"
              locale={ru}
              selected={props.value}
              onSelect={handleRangeSelect}
              // numberOfMonths={2}
              // disabled={{ before: new Date() }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
