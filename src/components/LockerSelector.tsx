
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LockerSelectorProps {
  totalLockers: number;
  availableLockers: number;
  onLockerSelect: (id: string) => void;
  selectedLockerId: string | null;
}

const LockerSelector: React.FC<LockerSelectorProps> = ({
  totalLockers,
  availableLockers,
  onLockerSelect,
  selectedLockerId
}) => {
  // Создаем массив шкафчиков, часть из которых недоступна
  const [lockers] = useState(() => {
    const lockers = Array.from({ length: totalLockers }, (_, i) => ({
      id: `locker-${i + 1}`,
      number: i + 1,
      isAvailable: i < availableLockers // Первые N шкафчиков доступны
    }));
    
    // Перемешиваем шкафчики для реалистичности
    return lockers.sort(() => Math.random() - 0.5);
  });
  
  // Разбиваем на ряды по 5 шкафчиков
  const rows = [];
  for (let i = 0; i < lockers.length; i += 5) {
    rows.push(lockers.slice(i, i + 5));
  }
  
  return (
    <div className="rounded-md border p-4 bg-slate-50">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-beach-blue rounded-sm"></div>
          <span className="text-sm text-beach-gray">Доступно</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-300 rounded-sm"></div>
          <span className="text-sm text-beach-gray">Занято</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-beach-deep-blue rounded-sm"></div>
          <span className="text-sm text-beach-gray">Выбрано</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {rows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex gap-2 justify-center">
            {row.map((locker) => (
              <TooltipProvider key={locker.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className={`w-10 h-10 rounded-md flex items-center justify-center shadow-sm text-sm font-medium transition-colors
                        ${locker.isAvailable 
                          ? selectedLockerId === locker.id
                            ? 'bg-beach-deep-blue text-white' 
                            : 'bg-beach-blue text-white hover:bg-beach-blue/90' 
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
                      onClick={() => locker.isAvailable && onLockerSelect(locker.id)}
                      disabled={!locker.isAvailable}
                    >
                      {locker.number}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Шкафчик #{locker.number}</p>
                    <p className="text-xs">
                      {locker.isAvailable ? 'Доступен для бронирования' : 'Уже забронирован'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        ))}
      </div>
      
      {selectedLockerId && (
        <div className="mt-4 p-2 bg-beach-light rounded text-sm text-center text-beach-deep-blue">
          Выбран шкафчик #{lockers.find(l => l.id === selectedLockerId)?.number}
        </div>
      )}
    </div>
  );
};

export default LockerSelector;
