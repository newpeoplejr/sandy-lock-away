
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Phone, MessageSquare } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении здесь был бы API запрос
    console.log('Форма отправлена:', formData);
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время!",
    });
    
    // Очистка формы
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <MessageSquare size={28} className="text-beach-blue" />
            <h1 className="text-3xl font-bold text-beach-deep-blue">Контакты</h1>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold text-beach-deep-blue mb-6">Наши контакты</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-beach-light rounded-full p-3">
                      <Phone size={24} className="text-beach-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-beach-deep-blue">Телефон</h3>
                      <p className="text-beach-gray">+7 (800) 123-45-67</p>
                      <p className="text-beach-gray">+7 (495) 987-65-43</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-beach-light rounded-full p-3">
                      <Mail size={24} className="text-beach-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-beach-deep-blue">Электронная почта</h3>
                      <p className="text-beach-gray">info@beachlockers.ru</p>
                      <p className="text-beach-gray">support@beachlockers.ru</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-beach-light rounded-full p-3">
                      <MapPin size={24} className="text-beach-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium text-beach-deep-blue">Главный офис</h3>
                      <p className="text-beach-gray">г. Сочи, ул. Приморская 123, офис 45</p>
                      <p className="text-sm text-beach-gray mt-1">Пн-Пт: 9:00-18:00</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-beach-blue/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">Представительства</h2>
                <ul className="space-y-3 text-beach-gray">
                  <li>г. Анапа, ул. Морская 78</li>
                  <li>г. Геленджик, пр-т Приморский 45</li>
                  <li>г. Ялта, ул. Набережная 12</li>
                  <li>г. Севастополь, ул. Черноморская 34</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-beach-deep-blue mb-6">
                Напишите нам
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-beach-gray mb-1">
                    Ваше имя
                  </label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Иван Иванов"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-beach-gray mb-1">
                    Электронная почта
                  </label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="ivanov@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-beach-gray mb-1">
                    Телефон
                  </label>
                  <Input 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-beach-gray mb-1">
                    Сообщение
                  </label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Напишите ваше сообщение здесь..."
                    rows={5}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-beach-blue hover:bg-beach-deep-blue"
                >
                  Отправить сообщение
                </Button>
                
                <p className="text-xs text-beach-gray text-center mt-4">
                  Нажимая кнопку "Отправить сообщение", вы соглашаетесь с нашей 
                  <a href="#" className="text-beach-blue hover:underline"> политикой конфиденциальности</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
