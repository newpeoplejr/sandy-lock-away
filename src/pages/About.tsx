
import Navbar from '@/components/Navbar';
import { MapPin, Info, Mail, Phone, Clock } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Info size={28} className="text-beach-blue" />
            <h1 className="text-3xl font-bold text-beach-deep-blue">О нас</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="h-64 bg-beach-light relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-beach-deep-blue/80 text-white p-8 rounded-lg backdrop-blur-sm max-w-lg text-center">
                  <h2 className="text-2xl font-bold mb-3">ПляжныеШкафчики</h2>
                  <p className="text-beach-light/90">
                    Инновационное решение для безопасного хранения ваших вещей на пляже
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">Наша миссия</h2>
              <p className="text-beach-gray mb-6">
                Мы создаем беззаботный отдых для всех посетителей пляжей. Наша система шкафчиков обеспечивает надежное хранение ваших личных вещей, позволяя вам наслаждаться каждой минутой на побережье без забот о сохранности ценностей.
              </p>
              
              <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">История компании</h2>
              <p className="text-beach-gray mb-6">
                Компания "ПляжныеШкафчики" была основана в 2020 году группой энтузиастов, которые сами столкнулись с проблемой хранения вещей во время пляжного отдыха. За три года мы выросли из небольшого стартапа до сети современных шкафчиков на десятках пляжей по всей стране.
              </p>
              
              <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">Наши преимущества</h2>
              <ul className="list-disc list-inside text-beach-gray mb-6 pl-4 space-y-2">
                <li>Удобное бронирование через мобильное приложение</li>
                <li>Надежная система безопасности с электронными замками</li>
                <li>Защита от воды и песка</li>
                <li>Различные размеры шкафчиков для разных потребностей</li>
                <li>Доступные цены и система скидок для постоянных клиентов</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">Наша команда</h2>
              <p className="text-beach-gray mb-6">
                Мы – команда профессионалов, объединенных общей идеей сделать пляжный отдых максимально комфортным. В нашей компании работают специалисты с опытом в сфере клиентского сервиса, инженерии и разработки программного обеспечения.
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-beach-deep-blue mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-beach-blue" />
                Где нас найти
              </h2>
              <ul className="space-y-3 text-beach-gray">
                <li>Пляж "Солнечный", г. Сочи</li>
                <li>Пляж "Лазурный", г. Анапа</li>
                <li>Пляж "Золотой", г. Геленджик</li>
                <li>Пляж "Центральный", г. Ялта</li>
                <li>Пляж "Маяк", г. Севастополь</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-beach-deep-blue mb-4 flex items-center gap-2">
                <Clock size={20} className="text-beach-blue" />
                Часы работы
              </h2>
              <div className="space-y-3 text-beach-gray">
                <p><strong>Летний сезон (май-сентябрь)</strong>: 8:00 - 22:00</p>
                <p><strong>Межсезонье (март-апрель, октябрь)</strong>: 9:00 - 19:00</p>
                <p><strong>Зимний сезон (ноябрь-февраль)</strong>: по запросу</p>
                <p className="text-sm mt-4">* Время работы может различаться в зависимости от локации</p>
              </div>
            </div>
          </div>
          
          <div className="bg-beach-blue/10 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">Свяжитесь с нами</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-beach-blue shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Телефон службы поддержки</p>
                  <p className="text-beach-gray">+7 (800) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail size={20} className="text-beach-blue shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Электронная почта</p>
                  <p className="text-beach-gray">info@beachlockers.ru</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
