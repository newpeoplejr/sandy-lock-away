
import { LockerLocation, LockerSize } from "@/types";

export const lockerSizes: LockerSize[] = [
  {
    id: "size1",
    name: "Small",
    description: "Fits a small bag, phone, wallet, and keys",
    priceMultiplier: 1,
  },
  {
    id: "size2",
    name: "Medium",
    description: "Fits a backpack and personal items",
    priceMultiplier: 1.5,
  },
  {
    id: "size3",
    name: "Large",
    description: "Fits a large beach bag and accessories",
    priceMultiplier: 2,
  },
];

export const lockerLocations: LockerLocation[] = [
  {
    id: "1",
    name: "Sunny Beach Lockers",
    description: "Convenient beach lockers near the main entrance",
    address: "123 Coastal Highway, Beach City",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
    coordinates: {
      lat: 34.0522,
      lng: -118.2437,
    },
    hours: "8:00 AM - 8:00 PM",
    availableLockers: 12,
    totalLockers: 20,
    pricePerHour: 5,
    rating: 4.7,
  },
  {
    id: "2",
    name: "Palm View Storage",
    description: "Secure lockers with a beautiful view of palm trees",
    address: "456 Palm Avenue, Seaside",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    coordinates: {
      lat: 34.0531,
      lng: -118.2422,
    },
    hours: "7:00 AM - 9:00 PM",
    availableLockers: 8,
    totalLockers: 15,
    pricePerHour: 6,
    rating: 4.5,
  },
  {
    id: "3",
    name: "Boardwalk Safes",
    description: "Easy access lockers right on the boardwalk",
    address: "789 Boardwalk, Beachfront",
    image: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151",
    coordinates: {
      lat: 34.0547,
      lng: -118.2450,
    },
    hours: "9:00 AM - 7:00 PM",
    availableLockers: 15,
    totalLockers: 25,
    pricePerHour: 4,
    rating: 4.2,
  },
];
