
import { useState, useEffect } from 'react';
import { QrCode, ScanQrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "@/hooks/use-toast";
import { Booking } from '@/types';
import { bookings } from '@/data/bookings';

const Terminal = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBooking, setScannedBooking] = useState<Booking | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const startScanning = () => {
    setIsScanning(true);
    
    // Имитация сканирования QR-кода
    setTimeout(() => {
      const randomBooking = bookings[Math.floor(Math.random() * bookings.length)];
      setScannedBooking(randomBooking);
      setIsScanning(false);
      setShowSuccess(true);
      
      toast({
        title: "QR-код успешно отсканирован",
        description: "Шкафчик открыт. Приятного отдыха!",
      });
    }, 3000);
  };
  
  const resetTerminal = () => {
    setScannedBooking(null);
    setShowSuccess(false);
  };
  
  // Автоматический сброс через 30 секунд после успеха
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        resetTerminal();
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="min-h-screen bg-beach-deep-blue text-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">Терминал шкафчиков</h1>
        
        <div className="bg-slate-800/50 rounded-xl p-8 w-full max-w-2xl backdrop-blur-sm shadow-xl">
          {!isScanning && !showSuccess ? (
            <div className="flex flex-col items-center space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold mb-4">Добро пожаловать!</h2>
                <p className="text-slate-300">Пожалуйста, отсканируйте QR-код вашего бронирования для доступа к шкафчику.</p>
              </div>
              
              <QrCode size={120} className="text-beach-blue mb-6" />
              
              <Button 
                onClick={startScanning} 
                size="lg" 
                className="bg-beach-blue hover:bg-beach-light hover:text-beach-deep-blue text-white px-8 py-6 text-xl flex items-center gap-3"
              >
                <ScanQrCode size={24} />
                Сканировать QR-код
              </Button>
            </div>
          ) : isScanning ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative">
                <ScanQrCode size={120} className="text-beach-blue animate-pulse" />
                <div className="absolute inset-0 bg-beach-blue/20 rounded-full animate-ping"></div>
              </div>
              <p className="text-xl mt-8 animate-pulse">Сканирование...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-6">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-beach-blue mb-2">Вот ваша кабинка!</h2>
                <p className="text-xl mb-6">№ {scannedBooking?.id.slice(-3)}</p>
                
                {/* Анимация шкафчика */}
                <div className="relative w-48 h-64 mx-auto mb-8">
                  <div className="absolute inset-0 bg-beach-sand rounded-md shadow-inner border-4 border-beach-deep-blue animate-[pulse_3s_ease-in-out_infinite]">
                    {/* Дверца шкафчика */}
                    <div className="absolute right-0 top-0 w-full h-full bg-beach-blue rounded-sm origin-left transform animate-[openDoor_2s_ease-in-out_forwards]">
                      <div className="absolute right-3 top-1/2 w-3 h-6 bg-yellow-400 rounded-sm"></div>
                    </div>
                    
                    {/* Внутренность */}
                    <div className="absolute inset-2 bg-slate-800 opacity-80 rounded-sm"></div>
                  </div>
                </div>
                
                <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6">
                  <p>Шкафчик успешно открыт!</p>
                  <p className="text-sm mt-2">Время аренды: {scannedBooking ? 
                    new Date(scannedBooking.startTime).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'}) +
                    ' - ' + 
                    new Date(scannedBooking.endTime).toLocaleTimeString('ru-RU', {hour: '2-digit', minute:'2-digit'})
                    : '--:-- - --:--'}
                  </p>
                </div>
              </div>
              
              <Button 
                onClick={resetTerminal}
                variant="outline"
                className="border-beach-blue text-beach-blue hover:bg-beach-blue hover:text-white"
              >
                Вернуться к началу
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <footer className="text-center p-4 text-slate-400 bg-slate-900/60">
        <p>Система терминалов пляжных шкафчиков &copy; 2023-2025</p>
      </footer>
      
      <style>{`
        @keyframes openDoor {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-120deg); }
        }
      `}</style>
    </div>
  );
};

export default Terminal;
