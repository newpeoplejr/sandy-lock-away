
import { Booking } from "@/types";
import { lockerSizes } from "@/data/lockers";

// Функция для генерации QR-кода (имитация)
const generateQRCode = (id: string): string => {
  // В реальном приложении здесь бы генерировался настоящий QR-код
  // Для целей демонстрации используем фиксированные строки
  return `data:image/png;base64,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${id}`;
};

export const mockBookings: Booking[] = [
  {
    id: "book_123456789",
    userId: "usr_123456789",
    lockerId: "1",
    lockerName: "Sunny Beach Lockers",
    lockerSize: lockerSizes[0],
    startTime: new Date(2025, 3, 28, 10, 0),
    endTime: new Date(2025, 3, 28, 14, 0),
    totalPrice: 20,
    isPaid: true,
    qrCode: generateQRCode("book_123456789"),
    status: "active"
  },
  {
    id: "book_987654321",
    userId: "usr_456789123",
    lockerId: "2",
    lockerName: "Palm View Storage",
    lockerSize: lockerSizes[1],
    startTime: new Date(2025, 3, 27, 9, 0),
    endTime: new Date(2025, 3, 27, 18, 0),
    totalPrice: 54,
    isPaid: true,
    qrCode: generateQRCode("book_987654321"),
    status: "completed"
  },
  {
    id: "book_456789123",
    userId: "usr_789123456",
    lockerId: "3",
    lockerName: "Boardwalk Safes",
    lockerSize: lockerSizes[2],
    startTime: new Date(2025, 3, 29, 12, 0),
    endTime: new Date(2025, 3, 29, 17, 0),
    totalPrice: 40,
    isPaid: false,
    status: "cancelled"
  },
  {
    id: "book_789123456",
    userId: "usr_123456789",
    lockerId: "1",
    lockerName: "Sunny Beach Lockers",
    lockerSize: lockerSizes[0],
    startTime: new Date(2025, 3, 25, 8, 0),
    endTime: new Date(2025, 3, 25, 20, 0),
    totalPrice: 60,
    isPaid: true,
    qrCode: generateQRCode("book_789123456"),
    status: "completed"
  },
  {
    id: "book_321654987",
    userId: "usr_321654987",
    lockerId: "2",
    lockerName: "Palm View Storage",
    lockerSize: lockerSizes[1],
    startTime: new Date(2025, 4, 1, 10, 0),
    endTime: new Date(2025, 4, 1, 16, 0),
    totalPrice: 36,
    isPaid: true,
    qrCode: generateQRCode("book_321654987"),
    status: "active"
  }
];

// Экспортируем QR-код генератор и массив бронирований
export { generateQRCode, mockBookings as bookings };
