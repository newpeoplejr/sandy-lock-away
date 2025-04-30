
import { LockerLocation } from '@/types';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star } from 'lucide-react';

interface LockerCardProps {
  locker: LockerLocation;
}

const LockerCard: React.FC<LockerCardProps> = ({ locker }) => {
  return (
    <Link 
      to={`/lockers/${locker.id}`}
      className="group flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src={`${locker.image}?w=600&h=400&fit=crop`} 
          alt={locker.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-md text-sm font-medium flex items-center gap-1">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          {locker.rating}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-beach-deep-blue">{locker.name}</h3>
        
        <div className="flex items-center gap-1 text-beach-gray text-sm mt-1">
          <MapPin size={14} />
          <span className="truncate">{locker.address}</span>
        </div>
        
        <div className="flex items-center gap-1 text-beach-gray text-sm mt-1">
          <Clock size={14} />
          <span>{locker.hours}</span>
        </div>
        
        <div className="mt-3 pt-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-beach-gray">Available:</span>
            <span className="font-medium text-sm">
              {locker.availableLockers}/{locker.totalLockers}
            </span>
          </div>
          <div className="text-beach-deep-blue font-semibold">
            ${locker.pricePerHour}/hour
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LockerCard;
