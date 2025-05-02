
import { useState, useRef, useEffect } from 'react';
import { MapPin } from 'lucide-react';

interface MapLocationPickerProps {
  initialLat: number;
  initialLng: number;
  onChange: (lat: number, lng: number) => void;
}

const MapLocationPicker = ({ initialLat, initialLng, onChange }: MapLocationPickerProps) => {
  const [markerPos, setMarkerPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef<HTMLDivElement>(null);

  // Преобразуем координаты в позицию на карте и обратно
  const coordsToPosition = (lat: number, lng: number) => {
    // Карта показывает область примерно от 34.04 до 34.07 по широте
    // и от -118.26 до -118.22 по долготе
    const latRange = [34.04, 34.07];
    const lngRange = [-118.26, -118.22];
    
    const x = ((lng - lngRange[0]) / (lngRange[1] - lngRange[0])) * 100;
    const y = (1 - ((lat - latRange[0]) / (latRange[1] - latRange[0]))) * 100;
    
    return { x, y };
  };
  
  const positionToCoords = (x: number, y: number) => {
    const latRange = [34.04, 34.07];
    const lngRange = [-118.26, -118.22];
    
    const lng = lngRange[0] + (x / 100) * (lngRange[1] - lngRange[0]);
    const lat = latRange[1] - (y / 100) * (latRange[1] - latRange[0]);
    
    return { lat, lng };
  };
  
  // Инициализация позиции маркера
  useEffect(() => {
    setMarkerPos(coordsToPosition(initialLat, initialLng));
  }, [initialLat, initialLng]);
  
  // Обработка клика по карте
  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mapRef.current) return;
    
    const rect = mapRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMarkerPos({ x, y });
    
    const { lat, lng } = positionToCoords(x, y);
    onChange(parseFloat(lat.toFixed(4)), parseFloat(lng.toFixed(4)));
  };
  
  return (
    <div className="relative w-full h-[240px] rounded-lg overflow-hidden border border-input">
      <div 
        ref={mapRef}
        className="w-full h-full bg-beach-light cursor-crosshair"
        onClick={handleMapClick}
      >
        {/* Симуляция карты без API ключа */}
        <div className="absolute inset-0 bg-beach-light">
          {/* Волны */}
          <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-beach-blue/20 to-transparent"></div>
          
          {/* Песчаные островки */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div 
              key={`island-${i}`}
              className="absolute bg-beach-sand/30 rounded-full"
              style={{
                width: `${25 + Math.random() * 20}px`,
                height: `${12 + Math.random() * 15}px`,
                left: `${10 + Math.random() * 80}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
            ></div>
          ))}
          
          {/* Сетка координат */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-20 pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <div key={`grid-${i}`} className="border border-beach-gray"></div>
            ))}
          </div>
          
          {/* Маркер */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10"
            style={{ left: `${markerPos.x}%`, top: `${markerPos.y}%` }}
          >
            <div className="flex flex-col items-center pointer-events-none">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-beach-deep-blue text-white">
                <MapPin size={18} />
              </div>
              <div className="mt-1 w-2 h-2 rounded-full bg-beach-deep-blue"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-2 right-2 bg-white rounded px-2 py-1 text-xs text-beach-gray">
          Кликните для выбора местоположения
        </div>
      </div>
    </div>
  );
};

export default MapLocationPicker;
