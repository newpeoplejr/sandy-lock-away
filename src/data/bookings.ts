
import { Booking } from "@/types";
import { lockerSizes } from "@/data/lockers";

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
    qrCode: "data:image/png;base64,iVBORw0KG90...",
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
    qrCode: "data:image/png;base64,hgtFRw456Th...",
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
    qrCode: "data:image/png;base64,JkiUyTrE3d9...",
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
    qrCode: "data:image/png;base64,LmNbVcXz5t7...",
    status: "active"
  }
];

export { mockBookings as bookings };
