
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { lockerLocations } from '@/data/lockers';
import { MapPin, Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import BookingForm from '@/components/BookingForm';
import Navbar from '@/components/Navbar';

const LockerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const locker = lockerLocations.find(locker => locker.id === id);
  
  if (!locker) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-beach-deep-blue mb-4">Locker Not Found</h1>
          <p className="text-beach-gray mb-6">The locker you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/')}>Return to Home</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container pt-20 pb-10">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 text-beach-gray hover:text-beach-deep-blue"
        >
          &larr; Back
        </Button>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <img 
                src={`${locker.image}?w=800&h=500&fit=crop`}
                alt={locker.name} 
                className="w-full h-72 object-cover"
              />
              
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h1 className="text-2xl font-bold text-beach-deep-blue">{locker.name}</h1>
                  <Badge className="bg-beach-blue">${locker.pricePerHour}/hour</Badge>
                </div>
                
                <div className="flex items-center gap-1 text-yellow-500 mt-1">
                  <Star size={16} className="fill-yellow-500" />
                  <span className="font-medium">{locker.rating}</span>
                </div>
                
                <div className="flex items-center gap-2 text-beach-gray mt-3">
                  <MapPin size={16} />
                  <span>{locker.address}</span>
                </div>
                
                <div className="flex items-center gap-2 text-beach-gray mt-2">
                  <Clock size={16} />
                  <span>{locker.hours}</span>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-beach-deep-blue">Description</h2>
                  <p className="text-beach-gray">{locker.description}</p>
                  
                  <div className="bg-beach-light rounded-md p-4">
                    <h3 className="font-medium text-beach-deep-blue mb-2">Availability</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-slate-200 rounded-full h-2.5">
                        <div 
                          className="bg-beach-blue h-2.5 rounded-full" 
                          style={{ width: `${(locker.availableLockers / locker.totalLockers) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">
                        {locker.availableLockers}/{locker.totalLockers} available
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-beach-deep-blue mb-4">Reserve a Locker</h2>
              
              <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full mb-4">Book Now</Button>
                </DialogTrigger>
                <BookingForm 
                  locker={locker} 
                  onSuccess={() => {
                    setIsBookingOpen(false);
                    navigate('/');
                  }} 
                />
              </Dialog>
              
              <div className="text-sm text-beach-gray">
                <p>Select your preferred date, time, and locker size. Payment is processed securely once you confirm your booking.</p>
                <p className="mt-2">Need help? Contact us at support@beachlockers.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockerDetails;
