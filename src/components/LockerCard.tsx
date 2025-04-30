
import React from 'react';
import { LockerLocation } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LockerCardProps {
  locker: LockerLocation;
}

const LockerCard: React.FC<LockerCardProps> = ({ locker }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={locker.image} 
          alt={locker.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-white py-1 px-2 rounded text-sm font-medium text-beach-deep-blue">
          {locker.pricePerHour}₽/час
        </div>
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-beach-deep-blue">{locker.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{locker.rating}</span>
          </div>
        </div>
        
        <div className="mt-2 text-sm text-beach-gray flex items-start gap-1">
          <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
          <span>{locker.address}</span>
        </div>
        
        <div className="mt-1 text-sm text-beach-gray flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>{locker.hours}</span>
        </div>
        
        <div className="mt-3 bg-beach-light rounded-md p-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-beach-gray">Доступно:</span>
            <span className="font-medium">{locker.availableLockers} из {locker.totalLockers}</span>
          </div>
          <div className="mt-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-beach-blue rounded-full" 
              style={{ width: `${(locker.availableLockers / locker.totalLockers) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full"
          onClick={() => navigate(`/lockers/${locker.id}`)}
        >
          Забронировать
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LockerCard;
