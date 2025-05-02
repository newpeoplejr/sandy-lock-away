
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Database, ChartBar, Settings, FileText, MapPin } from "lucide-react";
import { mockBookings } from "@/data/bookings";
import { mockUsers } from "@/data/users";
import LocationsManager from "@/components/admin/LocationsManager";

// Имитация авторизации для админ-панели
const isAdmin = true; // В реальном приложении это должно быть основано на проверке ролей пользователя

const AdminDashboard: React.FC = () => {
  // Перенаправление, если пользователь не админ
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const renderContent = () => {
    switch(activeSection) {
      case "locations":
        return <LocationsManager />;
      case "dashboard":
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Всего пользователей
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUsers.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Активные бронирования
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockBookings.filter(b => b.status === 'active').length}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Доход
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₽{mockBookings.reduce((sum, b) => sum + b.totalPrice, 0)}</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Последние бронирования</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Пользователь</TableHead>
                        <TableHead>Локер</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Начало</TableHead>
                        <TableHead>Конец</TableHead>
                        <TableHead>Сумма</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-mono">{booking.id.slice(0, 8)}</TableCell>
                          <TableCell>{booking.userId}</TableCell>
                          <TableCell>{booking.lockerName}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              booking.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.status === 'completed'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {booking.status === 'active' ? 'Активно' : 
                               booking.status === 'completed' ? 'Завершено' : 'Отменено'}
                            </span>
                          </TableCell>
                          <TableCell>{new Date(booking.startTime).toLocaleString('ru')}</TableCell>
                          <TableCell>{new Date(booking.endTime).toLocaleString('ru')}</TableCell>
                          <TableCell>₽{booking.totalPrice}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Пользователи</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Имя</TableHead>
                        <TableHead>Бронирований</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-mono">{user.id.slice(0, 8)}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.name || '—'}</TableCell>
                          <TableCell>
                            {mockBookings.filter(b => b.userId === user.id).length}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center px-2">
              <div className="bg-beach-blue text-white w-8 h-8 rounded-md flex items-center justify-center mr-2">
                <Settings size={18} />
              </div>
              <span className="font-bold text-lg">Админ-панель</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Управление</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Панель управления"
                      onClick={() => setActiveSection("dashboard")}
                      className={activeSection === "dashboard" ? "bg-accent text-accent-foreground" : ""}
                    >
                      <ChartBar />
                      <span>Статистика</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Пользователи"
                      onClick={() => setActiveSection("users")}
                      className={activeSection === "users" ? "bg-accent text-accent-foreground" : ""}
                    >
                      <Users />
                      <span>Пользователи</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Бронирования"
                      onClick={() => setActiveSection("bookings")}
                      className={activeSection === "bookings" ? "bg-accent text-accent-foreground" : ""}
                    >
                      <FileText />
                      <span>Бронирования</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      tooltip="Точки локеров"
                      onClick={() => setActiveSection("locations")}
                      className={activeSection === "locations" ? "bg-accent text-accent-foreground" : ""}
                    >
                      <MapPin />
                      <span>Точки локеров</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="outline" className="w-full" asChild>
              <a href="/">Вернуться на сайт</a>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <header className="bg-white border-b p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <SidebarTrigger className="mr-2" />
                <h1 className="text-xl font-bold">
                  {activeSection === "dashboard" && "Панель управления"}
                  {activeSection === "users" && "Управление пользователями"}
                  {activeSection === "bookings" && "Управление бронированиями"}
                  {activeSection === "locations" && "Управление локациями"}
                </h1>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Администратор</span>
              </div>
            </div>
          </header>

          <div className="p-6">
            {renderContent()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
