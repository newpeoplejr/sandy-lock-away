
import Navbar from '@/components/Navbar';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Help as HelpIcon } from 'lucide-react';

const Help = () => {
  const faqs = [
    {
      question: "Как забронировать шкафчик?",
      answer: "Для бронирования шкафчика выберите локацию на карте, нажмите 'Подробнее', выберите удобный для вас шкафчик и заполните форму бронирования, указав время и дату. После оплаты вам будет выслан QR-код для доступа к шкафчику."
    },
    {
      question: "Как оплатить аренду шкафчика?",
      answer: "Оплата производится онлайн через систему безопасных платежей. Мы принимаем банковские карты Visa, MasterCard, МИР, а также электронные платежи через Яндекс.Деньги, QIWI и WebMoney."
    },
    {
      question: "Что делать, если я забыл/потерял QR-код?",
      answer: "Не беспокойтесь! Войдите в личный кабинет на нашем сайте или в приложении, найдите свое активное бронирование и повторно сгенерируйте QR-код. Вы также можете обратиться к администратору пляжа для помощи."
    },
    {
      question: "Можно ли продлить время аренды шкафчика?",
      answer: "Да, время аренды можно продлить через личный кабинет или приложение, если шкафчик не забронирован следующим клиентом. Продление доступно не менее чем за 30 минут до окончания текущего срока аренды."
    },
    {
      question: "Что делать, если шкафчик не открывается?",
      answer: "Убедитесь, что срок аренды не истек. Попробуйте повторно отсканировать QR-код. Если проблема остается, обратитесь к персоналу пляжа или позвоните в нашу службу поддержки по номеру +7 (800) 123-45-67."
    },
    {
      question: "Есть ли штраф за несвоевременное освобождение шкафчика?",
      answer: "Да, если вы не освободили шкафчик во время, указанное при бронировании, и не продлили аренду, может взиматься дополнительная плата в размере стоимости часа аренды за каждый дополнительный час."
    },
    {
      question: "Можно ли отменить бронирование?",
      answer: "Бронирование можно отменить не менее чем за 2 часа до начала срока аренды с полным возвратом средств. При отмене за меньший срок возвращается 50% от стоимости аренды."
    },
    {
      question: "Как защищены мои вещи в шкафчике?",
      answer: "Наши шкафчики оборудованы надежными электронными замками, которые открываются только с помощью уникального QR-кода. Также на всех локациях установлены камеры видеонаблюдения и присутствует персонал пляжа."
    },
    {
      question: "Водонепроницаемы ли шкафчики?",
      answer: "Да, все наши шкафчики имеют защиту от брызг и песка. Однако, мы рекомендуем хранить электронные устройства в дополнительных водонепроницаемых чехлах для максимальной защиты."
    },
    {
      question: "Есть ли у вас программа лояльности?",
      answer: "Да, у нас действует программа лояльности. После третьей аренды вы получаете скидку 10% на все последующие бронирования. Также у нас есть сезонные абонементы со значительной экономией для постоянных клиентов."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <HelpIcon size={28} className="text-beach-blue" />
            <h1 className="text-3xl font-bold text-beach-deep-blue">Помощь</h1>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-beach-deep-blue mb-6">Часто задаваемые вопросы</h2>
            
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-beach-gray">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="bg-beach-blue/10 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">Инструкция по использованию</h2>
            
            <ol className="space-y-6 relative border-l border-beach-blue/30 pl-8 py-4">
              <li className="relative">
                <div className="absolute -left-[34px] bg-beach-blue rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">1</div>
                <h3 className="font-medium text-beach-deep-blue mb-2">Выберите локацию</h3>
                <p className="text-beach-gray">Найдите ближайшую к вам точку с шкафчиками на интерактивной карте.</p>
              </li>
              
              <li className="relative">
                <div className="absolute -left-[34px] bg-beach-blue rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">2</div>
                <h3 className="font-medium text-beach-deep-blue mb-2">Выберите шкафчик</h3>
                <p className="text-beach-gray">Выберите подходящий размер и свободный шкафчик на выбранной локации.</p>
              </li>
              
              <li className="relative">
                <div className="absolute -left-[34px] bg-beach-blue rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">3</div>
                <h3 className="font-medium text-beach-deep-blue mb-2">Забронируйте время</h3>
                <p className="text-beach-gray">Укажите желаемое время начала и окончания аренды.</p>
              </li>
              
              <li className="relative">
                <div className="absolute -left-[34px] bg-beach-blue rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">4</div>
                <h3 className="font-medium text-beach-deep-blue mb-2">Оплатите бронирование</h3>
                <p className="text-beach-gray">Произведите оплату любым удобным способом через нашу систему безопасных платежей.</p>
              </li>
              
              <li className="relative">
                <div className="absolute -left-[34px] bg-beach-blue rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">5</div>
                <h3 className="font-medium text-beach-deep-blue mb-2">Получите QR-код</h3>
                <p className="text-beach-gray">После успешной оплаты вы получите уникальный QR-код для доступа к шкафчику.</p>
              </li>
              
              <li className="relative">
                <div className="absolute -left-[34px] bg-beach-blue rounded-full w-6 h-6 flex items-center justify-center text-white font-bold">6</div>
                <h3 className="font-medium text-beach-deep-blue mb-2">Отсканируйте QR-код на терминале</h3>
                <p className="text-beach-gray">Приложите QR-код к сканеру на терминале у выбранной локации, и шкафчик автоматически откроется.</p>
              </li>
            </ol>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-beach-deep-blue mb-4">Нужна дополнительная помощь?</h2>
            <p className="text-beach-gray mb-4">
              Если у вас остались вопросы или вам требуется помощь, пожалуйста, свяжитесь с нашей службой поддержки. Мы готовы помочь вам решить любую проблему!
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-center">
              <div className="bg-beach-light p-4 rounded-lg">
                <p className="font-medium">Телефон поддержки</p>
                <p className="text-beach-blue font-bold">+7 (800) 123-45-67</p>
              </div>
              <div className="bg-beach-light p-4 rounded-lg">
                <p className="font-medium">Электронная почта</p>
                <p className="text-beach-blue font-bold">support@beachlockers.ru</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
