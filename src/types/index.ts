
export interface User {
  id: string;
  email: string;
  name?: string;
}

export interface LockerLocation {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: string;
  availableLockers: number;
  totalLockers: number;
  pricePerHour: number;
  rating: number;
}

export interface LockerSize {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
}

export interface Booking {
  id: string;
  userId: string;
  lockerId: string;
  lockerName: string;
  lockerSize: LockerSize;
  startTime: Date;
  endTime: Date;
  totalPrice: number;
  isPaid: boolean;
  qrCode?: string;
  status: 'active' | 'completed' | 'cancelled';
}
