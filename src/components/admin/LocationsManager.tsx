
import { useState, useEffect } from 'react';
import { lockerLocations as initialLocations } from '@/data/lockers';
import { LockerLocation } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, MapPin, Plus, Trash } from 'lucide-react';
import LocationForm from './LocationForm';
import { useToast } from '@/components/ui/use-toast';

const LocationsManager = () => {
  const [locations, setLocations] = useState<LockerLocation[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<LockerLocation | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // В реальном приложении здесь был бы запрос к API
    setLocations(initialLocations);
  }, []);

  const handleAddLocation = () => {
    setCurrentLocation(null);
    setIsEditing(true);
  };

  const handleEditLocation = (location: LockerLocation) => {
    setCurrentLocation(location);
    setIsEditing(true);
  };

  const handleDeleteLocation = (id: string) => {
    // В реальном приложении здесь был бы запрос к API
    setLocations(locations.filter(location => location.id !== id));
    
    toast({
      title: "Локация удалена",
      description: "Локация была успешно удалена",
    });
  };

  const handleSaveLocation = (location: LockerLocation) => {
    // В реальном приложении здесь был бы запрос к API
    if (currentLocation) {
      // Обновление существующей локации
      setLocations(locations.map(loc => 
        loc.id === location.id ? location : loc
      ));
      
      toast({
        title: "Локация обновлена",
        description: "Локация была успешно обновлена",
      });
    } else {
      // Добавление новой локации с уникальным ID
      const newLocation = {
        ...location,
        id: `loc-${Date.now()}`
      };
      setLocations([...locations, newLocation]);
      
      toast({
        title: "Локация добавлена",
        description: "Новая локация была успешно добавлена",
      });
    }
    
    setIsEditing(false);
    setCurrentLocation(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentLocation(null);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Управление локациями</CardTitle>
        <Button onClick={handleAddLocation}>
          <Plus size={16} className="mr-2" />
          Добавить локацию
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <LocationForm 
            location={currentLocation}
            onSave={handleSaveLocation}
            onCancel={handleCancel}
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Название</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Шкафчики</TableHead>
                <TableHead>Цена/час</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell className="font-medium">{location.name}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>{location.availableLockers}/{location.totalLockers}</TableCell>
                  <TableCell>₽{location.pricePerHour}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditLocation(location)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleDeleteLocation(location.id)}>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {locations.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                    Нет добавленных локаций
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default LocationsManager;
