
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LockerLocation } from "@/types";
import { lockerSizes } from "@/data/lockers";
import { format } from "date-fns";
import { Calendar as CalendarIcon, QrCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface BookingFormProps {
  locker: LockerLocation;
  onSuccess: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ locker, onSuccess }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSize, setSelectedSize] = useState(lockerSizes[0].id);
  const [hours, setHours] = useState("2");
  const [showQRCode, setShowQRCode] = useState(false);

  const selectedSizeDetails = lockerSizes.find(size => size.id === selectedSize);
  const pricePerHour = locker.pricePerHour * (selectedSizeDetails?.priceMultiplier || 1);
  const totalPrice = pricePerHour * parseInt(hours);

  const handleBooking = () => {
    // In a real app, we would call an API to create a booking
    toast({
      title: "Booking Successful!",
      description: "Your locker has been reserved.",
    });
    setShowQRCode(true);
  };

  if (showQRCode) {
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-beach-deep-blue">
            Your Booking is Confirmed!
          </DialogTitle>
          <DialogDescription className="text-center">
            Show this QR code at the location to unlock your locker
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <QrCode size={200} className="text-beach-deep-blue" />
          </div>
          
          <div className="mt-6 w-full">
            <h3 className="font-semibold text-lg">Booking Details</h3>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-beach-gray">Location:</span>
                <span className="font-medium">{locker.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Date:</span>
                <span className="font-medium">{date ? format(date, "PPP") : "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Duration:</span>
                <span className="font-medium">{hours} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Locker Size:</span>
                <span className="font-medium">{selectedSizeDetails?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Total Price:</span>
                <span className="font-semibold text-beach-deep-blue">${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <Button className="mt-6 w-full" onClick={onSuccess}>
            Done
          </Button>
        </div>
      </DialogContent>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              disabled={(date) => date < new Date()}
              className="p-3"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="size">Locker Size</Label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger id="size">
            <SelectValue placeholder="Select size" />
          </SelectTrigger>
          <SelectContent>
            {lockerSizes.map((size) => (
              <SelectItem key={size.id} value={size.id}>
                <div className="flex flex-col">
                  <span>{size.name}</span>
                  <span className="text-xs text-beach-gray">{size.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="hours">Rental Hours</Label>
        <Input
          id="hours"
          type="number"
          min="1"
          max="24"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="pt-4 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-beach-gray">Price per hour:</span>
          <span>${pricePerHour.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <span>Total price:</span>
          <span className="text-beach-deep-blue">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Button 
        onClick={handleBooking}
        className="w-full bg-beach-blue hover:bg-beach-deep-blue"
      >
        Book Now
      </Button>
    </div>
  );
};

export default BookingForm;
