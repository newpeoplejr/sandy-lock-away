
import { useEffect, useRef, useState } from 'react';
import { lockerLocations } from '@/data/lockers';
import { LockerLocation } from '@/types';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<LockerLocation | null>(null);
  
  // В реальном приложении мы бы использовали Mapbox или Google Maps
  // Сейчас мы симулируем карту с маркерами
  
  const handleMarkerClick = (locker: LockerLocation) => {
    setSelectedLocation(locker);
  };
  
  const handleViewDetailsClick = (id: string) => {
    navigate(`/lockers/${id}`);
  };

  // Имитация движения волн
  useEffect(() => {
    const interval = setInterval(() => {
      if (mapRef.current) {
        const waves = mapRef.current.querySelectorAll('.wave');
        waves.forEach((wave: any) => {
          const currentLeft = parseFloat(wave.style.left || '0');
          wave.style.left = `${(currentLeft + 0.2) % 100}%`;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-beach-light">
      <div ref={mapRef} className="w-full h-full bg-beach-light relative">
        {/* Симуляция карты с пинами */}
        <div className="absolute inset-0 bg-beach-light">
          {/* Анимированные волны для симуляции пляжа */}
          <div className="wave absolute bottom-0 left-0 w-[200%] h-[10%] bg-gradient-to-t from-beach-blue/20 to-transparent" style={{ animation: "wave 15s linear infinite", opacity: 0.3 }}></div>
          <div className="wave absolute bottom-0 left-[-50%] w-[200%] h-[8%] bg-gradient-to-t from-beach-blue/20 to-transparent" style={{ animation: "wave 10s linear infinite", opacity: 0.2, animationDelay: "-3s" }}></div>
          
          <div className="absolute w-full h-full">
            {/* Волны для симуляции пляжа */}
            <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-beach-blue/20 to-transparent"></div>
            
            {/* Песчаные островки */}
            {[1, 2, 3].map((i) => (
              <div 
                key={`island-${i}`}
                className="absolute bg-beach-sand/30 rounded-full"
                style={{
                  width: `${30 + Math.random() * 30}px`,
                  height: `${15 + Math.random() * 20}px`,
                  left: `${15 + Math.random() * 70}%`,
                  top: `${40 + Math.random() * 30}%`,
                }}
              ></div>
            ))}
            
            {/* Маркеры */}
            {lockerLocations.map((locker) => (
              <div 
                key={locker.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                  selectedLocation?.id === locker.id ? 'z-20' : 'z-10'
                }`}
                style={{
                  left: `${((locker.coordinates.lng + 118.25) * 100)}%`,
                  top: `${65 - ((locker.coordinates.lat - 34.05) * 100)}%`
                }}
                onClick={() => handleMarkerClick(locker)}
              >
                <div className={`flex flex-col items-center`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedLocation?.id === locker.id 
                      ? 'bg-beach-deep-blue text-white' 
                      : 'bg-beach-blue text-white'
                  }`}>
                    <MapPin size={18} />
                  </div>
                  {selectedLocation?.id === locker.id && (
                    <div className="absolute top-10 bg-white p-3 rounded-lg shadow-lg w-64 z-30">
                      <h3 className="font-semibold text-beach-deep-blue">{locker.name}</h3>
                      <p className="text-sm text-beach-gray mb-2">{locker.address}</p>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-beach-gray">Доступно: {locker.availableLockers}</span>
                        <span className="font-medium">{locker.pricePerHour}₽/час</span>
                      </div>
                      <button 
                        onClick={() => handleViewDetailsClick(locker.id)}
                        className="w-full bg-beach-blue hover:bg-beach-deep-blue text-white text-sm py-1.5 px-3 rounded-md transition-colors"
                      >
                        Подробнее
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-4 right-4 bg-white rounded-md shadow-md p-2 text-xs text-beach-gray">
          Примечание: Это демо-версия карты
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Map;
