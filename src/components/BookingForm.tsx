
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
import { generateQRCode } from "@/data/bookings";
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
  const [bookingId, setBookingId] = useState("");
  
  const selectedSizeDetails = lockerSizes.find(size => size.id === selectedSize);
  const pricePerHour = locker.pricePerHour * (selectedSizeDetails?.priceMultiplier || 1);
  const totalPrice = pricePerHour * parseInt(hours);

  const handleBooking = () => {
    // Генерируем уникальный ID бронирования
    const newBookingId = `book_${Math.floor(Math.random() * 1000000000)}`;
    setBookingId(newBookingId);
    
    // В реальном приложении здесь был бы API-запрос для создания бронирования
    toast({
      title: "Бронирование успешно!",
      description: "Ваш шкафчик зарезервирован.",
    });
    setShowQRCode(true);
  };

  if (showQRCode) {
    return (
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-beach-deep-blue">
            Ваше бронирование подтверждено!
          </DialogTitle>
          <DialogDescription className="text-center">
            Покажите этот QR-код в терминале, чтобы открыть шкафчик
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center p-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            {bookingId && (
              <img 
                src={generateQRCode(bookingId)} 
                alt="QR код бронирования"
                width={200}
                height={200}
                className="block"
              />
            )}
          </div>
          
          <div className="mt-6 w-full">
            <h3 className="font-semibold text-lg">Детали бронирования</h3>
            <div className="mt-2 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-beach-gray">ID бронирования:</span>
                <span className="font-medium">{bookingId.slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Локация:</span>
                <span className="font-medium">{locker.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Дата:</span>
                <span className="font-medium">{date ? format(date, "PPP") : "Не выбрана"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Длительность:</span>
                <span className="font-medium">{hours} часов</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Размер шкафчика:</span>
                <span className="font-medium">{selectedSizeDetails?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-beach-gray">Общая сумма:</span>
                <span className="font-semibold text-beach-deep-blue">{totalPrice.toFixed(2)}₽</span>
              </div>
            </div>
          </div>
          
          <Button className="mt-6 w-full" onClick={onSuccess}>
            Готово
          </Button>
        </div>
      </DialogContent>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="date">Дата</Label>
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
              {date ? format(date, "PPP") : <span>Выберите дату</span>}
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
        <Label htmlFor="size">Размер шкафчика</Label>
        <Select value={selectedSize} onValueChange={setSelectedSize}>
          <SelectTrigger id="size">
            <SelectValue placeholder="Выберите размер" />
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
        <Label htmlFor="hours">Часы аренды</Label>
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
          <span className="text-beach-gray">Цена за час:</span>
          <span>{pricePerHour.toFixed(2)}₽</span>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <span>Общая стоимость:</span>
          <span className="text-beach-deep-blue">{totalPrice.toFixed(2)}₽</span>
        </div>
      </div>

      <Button 
        onClick={handleBooking}
        className="w-full bg-beach-blue hover:bg-beach-deep-blue"
      >
        Забронировать
      </Button>
    </div>
  );
};

export default BookingForm;
