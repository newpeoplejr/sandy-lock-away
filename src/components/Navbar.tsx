
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, MapPin, Settings, Info, Help, MessageSquare, QrCode, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

const Navbar: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-beach-blue text-white w-8 h-8 rounded-md flex items-center justify-center">
            <MapPin size={18} />
          </div>
          <span className="font-bold text-lg text-beach-deep-blue">ПляжныеШкафчики</span>
        </Link>

        {/* Навигационное меню - видимо на десктопе */}
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/">Главная</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger>Информация</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4">
                    <li>
                      <Link 
                        to="/about"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-beach-light/50 to-beach-light p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Info size={18} className="text-beach-blue" />
                          <span className="text-sm font-medium">О нас</span>
                        </div>
                        <p className="text-sm leading-tight text-beach-gray">
                          Узнайте больше о компании "ПляжныеШкафчики" и нашей миссии
                        </p>
                      </Link>
                    </li>
                    <li className="grid grid-cols-2 gap-3">
                      <Link
                        to="/help"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-beach-light/50 to-white p-3 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Help size={16} className="text-beach-blue" />
                          <span className="text-sm font-medium">Помощь</span>
                        </div>
                        <p className="text-xs leading-tight text-beach-gray">
                          Инструкции и ответы на вопросы
                        </p>
                      </Link>
                      <Link
                        to="/contact"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-beach-light/50 to-white p-3 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <MessageSquare size={16} className="text-beach-blue" />
                          <span className="text-sm font-medium">Контакты</span>
                        </div>
                        <p className="text-xs leading-tight text-beach-gray">
                          Свяжитесь с нами
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/terminal"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-beach-blue/20 to-beach-blue/10 p-3 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <QrCode size={16} className="text-beach-blue" />
                          <span className="text-sm font-medium">Терминал</span>
                        </div>
                        <p className="text-xs leading-tight text-beach-gray">
                          Сканирование QR-кодов для доступа к шкафчикам
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Мобильное меню */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu />
          </Button>
          {isMenuOpen && (
            <div className="absolute top-16 left-0 w-full bg-white shadow-lg border-t border-slate-200 py-2">
              <Link to="/" className="block px-4 py-2 text-beach-deep-blue hover:bg-beach-light">
                Главная
              </Link>
              <Link to="/about" className="block px-4 py-2 text-beach-deep-blue hover:bg-beach-light">
                О нас
              </Link>
              <Link to="/help" className="block px-4 py-2 text-beach-deep-blue hover:bg-beach-light">
                Помощь
              </Link>
              <Link to="/contact" className="block px-4 py-2 text-beach-deep-blue hover:bg-beach-light">
                Контакты
              </Link>
              <Link to="/terminal" className="block px-4 py-2 text-beach-deep-blue hover:bg-beach-light">
                Терминал
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <>
              <Button 
                variant="outline" 
                onClick={() => setIsAuthModalOpen(true)}
                className="hidden sm:flex"
              >
                Вход
              </Button>
              <Button 
                onClick={() => setIsAuthModalOpen(true)}
                className="flex gap-2 items-center"
              >
                <User size={18} />
                <span className="hidden sm:inline">Регистрация</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/admin">
                <Button 
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Settings size={18} />
                  <span className="hidden sm:inline">Админ-панель</span>
                </Button>
              </Link>
              <Link to="/profile">
                <Button 
                  variant="ghost"
                  className="flex items-center gap-2"
                >
                  <User size={18} />
                  <span className="hidden sm:inline">Мой аккаунт</span>
                </Button>
              </Link>
              <Button 
                variant="ghost"
                className="flex items-center gap-2 text-red-500 hover:text-red-600"
                onClick={() => setIsLoggedIn(false)}
              >
                Выйти
              </Button>
            </div>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={() => {
          setIsLoggedIn(true);
          setIsAuthModalOpen(false);
        }}
      />
    </header>
  );
};

export default Navbar;
