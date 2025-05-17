import React from 'react';
import { screenshotPlugin } from '../plugins/screenshotPlugin';

// Тип для кнопки
interface UIButton {
  label: string;      // Эмодзи или текст
  title?: string;     // Подсказка
  onClick: () => void;
}

// Список кнопок интерфейса (можно расширять)
const buttons: UIButton[] = [
  {
    label: '📸',
    title: 'Сделать скриншот',
    onClick: screenshotPlugin,
  },
];

export const TopPanel: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '8px',
        padding: '6px 12px',
        display: 'flex',
        gap: '12px',
        zIndex: 1000,
        color: 'white',
        fontSize: '20px',
      }}
    >
      {buttons.map((btn, i) => (
        <button
          key={i}
          title={btn.title}
          onClick={btn.onClick}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            fontSize: '24px',
          }}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};
