
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockBookings } from '@/data/bookings';
import { mockUsers } from '@/data/users';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, MapPinIcon, Clock, User, CreditCard, QrCode, CheckCircle2, XCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Демонстрационные данные - в реальном приложении будут загружаться из API
  const user = mockUsers[0];
  const userBookings = mockBookings.filter(booking => booking.userId === user.id);
  const activeBookings = userBookings.filter(booking => booking.status === 'active');
  const pastBookings = userBookings.filter(booking => booking.status !== 'active');
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активно';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container pt-24 pb-10">
        <h1 className="text-3xl font-bold text-beach-deep-blue mb-6">Личный кабинет</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Профиль пользователя */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-beach-gray flex items-center gap-2">
                      <User size={16} />
                      ID пользователя
                    </span>
                    <span className="text-sm font-medium">#{user.id.split('_')[1]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-beach-gray flex items-center gap-2">
                      <CreditCard size={16} />
                      Способ оплаты
                    </span>
                    <Button variant="outline" size="sm">Добавить</Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-beach-gray flex items-center gap-2">
                      <Clock size={16} />
                      Бронирований
                    </span>
                    <span className="text-sm font-medium">{userBookings.length}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Редактировать профиль</Button>
              </CardFooter>
            </Card>
          </div>
          
          {/* Бронирования и настройки */}
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 grid w-full grid-cols-2">
                <TabsTrigger value="bookings">Мои бронирования</TabsTrigger>
                <TabsTrigger value="settings">Настройки</TabsTrigger>
              </TabsList>
              
              {/* Бронирования */}
              <TabsContent value="bookings" className="space-y-6">
                {/* Активные бронирования */}
                <div>
                  <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">Активные бронирования</h2>
                  
                  {activeBookings.length > 0 ? (
                    <div className="space-y-4">
                      {activeBookings.map(booking => (
                        <Card key={booking.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="relative md:w-1/3 h-48 md:h-auto">
                              <div className="absolute top-3 left-3 z-10">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(booking.status)}`}>
                                  {getStatusText(booking.status)}
                                </span>
                              </div>
                              {booking.qrCode ? (
                                <div className="h-full w-full flex items-center justify-center bg-white">
                                  <img 
                                    src={booking.qrCode} 
                                    alt="QR-код" 
                                    className="max-h-full max-w-full p-4" 
                                  />
                                </div>
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-beach-light">
                                  <QrCode size={64} className="text-beach-deep-blue opacity-50" />
                                </div>
                              )}
                            </div>
                            <div className="p-6 md:w-2/3">
                              <h3 className="text-lg font-semibold mb-2">{booking.lockerName}</h3>
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-beach-gray">
                                  <CalendarIcon size={16} />
                                  <span>
                                    {formatDate(booking.startTime)} — {formatDate(booking.endTime)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-beach-gray">
                                  <MapPinIcon size={16} />
                                  <span>Шкафчик #{booking.lockerId}, {booking.lockerSize.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  {booking.isPaid ? (
                                    <span className="flex items-center gap-1 text-green-600">
                                      <CheckCircle2 size={16} />
                                      Оплачено: {booking.totalPrice} ₽
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-amber-600">
                                      <XCircle size={16} />
                                      К оплате: {booking.totalPrice} ₽
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => navigate(`/lockers/${booking.lockerId}`)}>
                                  Подробнее
                                </Button>
                                <Button variant="destructive" size="sm">
                                  Отменить
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-6 text-center">
                      <p className="text-beach-gray mb-4">У вас нет активных бронирований</p>
                      <Button onClick={() => navigate('/')}>Забронировать шкафчик</Button>
                    </Card>
                  )}
                </div>
                
                {/* История бронирований */}
                <div>
                  <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">История бронирований</h2>
                  
                  {pastBookings.length > 0 ? (
                    <div className="space-y-4">
                      {pastBookings.map(booking => (
                        <Card key={booking.id} className="overflow-hidden">
                          <div className="flex flex-col md:flex-row">
                            <div className="p-6 w-full">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-semibold">{booking.lockerName}</h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusClass(booking.status)}`}>
                                  {getStatusText(booking.status)}
                                </span>
                              </div>
                              <div className="space-y-2 mb-4">
                                <div className="flex items-center gap-2 text-sm text-beach-gray">
                                  <CalendarIcon size={16} />
                                  <span>
                                    {formatDate(booking.startTime)} — {formatDate(booking.endTime)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-beach-gray">
                                  <MapPinIcon size={16} />
                                  <span>Шкафчик #{booking.lockerId}, {booking.lockerSize.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-medium">
                                  {booking.isPaid ? (
                                    <span className="flex items-center gap-1 text-green-600">
                                      <CheckCircle2 size={16} />
                                      Оплачено: {booking.totalPrice} ₽
                                    </span>
                                  ) : (
                                    <span className="flex items-center gap-1 text-amber-600">
                                      <XCircle size={16} />
                                      Не оплачено: {booking.totalPrice} ₽
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => navigate(`/lockers/${booking.lockerId}`)}>
                                Забронировать снова
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-6 text-center">
                      <p className="text-beach-gray">У вас нет истории бронирований</p>
                    </Card>
                  )}
                </div>
              </TabsContent>
              
              {/* Настройки */}
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки аккаунта</CardTitle>
                    <CardDescription>
                      Управляйте настройками своего аккаунта
                    </CardDescription>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Уведомления по email</span>
                        <Button variant="outline" size="sm">Настроить</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Сменить пароль</span>
                        <Button variant="outline" size="sm">Изменить</Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Удалить аккаунт</span>
                        <Button variant="destructive" size="sm">Удалить</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
