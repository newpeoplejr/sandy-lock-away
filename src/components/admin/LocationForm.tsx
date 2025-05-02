
import { useState, useEffect } from 'react';
import { LockerLocation } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import MapLocationPicker from './MapLocationPicker';

interface LocationFormProps {
  location: LockerLocation | null;
  onSave: (location: LockerLocation) => void;
  onCancel: () => void;
}

const LocationForm = ({ location, onSave, onCancel }: LocationFormProps) => {
  const [formData, setFormData] = useState<Partial<LockerLocation>>({
    name: '',
    description: '',
    address: '',
    image: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21', // Значение по умолчанию
    hours: '8:00 AM - 8:00 PM',
    availableLockers: 0,
    totalLockers: 0,
    pricePerHour: 0,
    rating: 4.0,
    coordinates: {
      lat: 34.0522,
      lng: -118.2437
    }
  });

  useEffect(() => {
    if (location) {
      setFormData(location);
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'pricePerHour' || name === 'availableLockers' || name === 'totalLockers' || name === 'rating'
        ? parseFloat(value)
        : value
    }));
  };

  const handleCoordinatesChange = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      coordinates: { lat, lng }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.address && formData.description) {
      onSave(formData as LockerLocation);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Название</Label>
            <Input
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="address">Адрес</Label>
            <Input
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              required
              rows={3}
            />
          </div>
          
          <div>
            <Label htmlFor="hours">Часы работы</Label>
            <Input
              id="hours"
              name="hours"
              value={formData.hours || ''}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="availableLockers">Доступно шкафчиков</Label>
              <Input
                id="availableLockers"
                name="availableLockers"
                type="number"
                min="0"
                value={formData.availableLockers || 0}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="totalLockers">Всего шкафчиков</Label>
              <Input
                id="totalLockers"
                name="totalLockers"
                type="number"
                min="0"
                value={formData.totalLockers || 0}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricePerHour">Цена за час (₽)</Label>
              <Input
                id="pricePerHour"
                name="pricePerHour"
                type="number"
                min="0"
                step="0.5"
                value={formData.pricePerHour || 0}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="rating">Рейтинг</Label>
              <Input
                id="rating"
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={formData.rating || 4.0}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="image">URL изображения</Label>
            <Input
              id="image"
              name="image"
              value={formData.image || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <Label className="mb-2 block">Выберите местоположение на карте</Label>
              <MapLocationPicker 
                initialLat={formData.coordinates?.lat || 34.0522}
                initialLng={formData.coordinates?.lng || -118.2437}
                onChange={handleCoordinatesChange}
              />
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="lat">Широта</Label>
                  <Input
                    id="lat"
                    value={formData.coordinates?.lat || 0}
                    readOnly
                  />
                </div>
                <div>
                  <Label htmlFor="lng">Долгота</Label>
                  <Input
                    id="lng"
                    value={formData.coordinates?.lng || 0}
                    readOnly
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button type="submit">
          {location ? 'Сохранить изменения' : 'Добавить локацию'}
        </Button>
      </div>
    </form>
  );
};

export default LocationForm;
