//В этом проекте гиперссылки не используются все сделано как одностраничный документ
//Поэтому данная программа генерирует и меняет (при различных выборах меню навигации) главное содержимое нашего одностраничного проекта.
//Также все повторяющиеся теги не прописываются в HTML, а генерируются в этой программе...


//Сколько авто в рейтинге
const top_auto = 10;

//Номер выбранного элемента
var variant = 0;

//Размер окна пользователя
var wh = document.documentElement.clientHeight;
var ww = document.documentElement.clientWidth;
var divMain = document.querySelector('main');
document.querySelector('body').style.height = wh*0.96 + 'px';
if  (wh > ww) {
  divMain.style.flexDirection = 'column-reverse';
}

//Добавляем "кнопки" меню навигации для выбора авто из рейтинга и список авто, а также устанавливаем обработчики на них
var nav = document.querySelector('ul');
for (var i = 0; i <= top_auto; i++) {
  var li_check = document.createElement('li');
  if ( i != 0) {
    li_check.setAttribute('class', 'unselected');
  }
  else {
    li_check.setAttribute('class', 'selected');
  }
  li_check.textContent = i;
  var marg = 0.1 * ww * (1 - 0.6 * Math.sin(Math.PI / 180 * (i * 180 / top_auto)));
  marg = marg + 'px';
  li_check.style.marginLeft = marg;
  nav.appendChild(li_check);
  li_check.addEventListener('click', selectedLi);    
  li_check.addEventListener('click', changedAuto);
  li_check.addEventListener('hover', waveEd);
}
//обеспечиваем доступ к нашим "кнопкам меню"
var navLi = document.querySelectorAll('nav ul li');

//обеспечиваем доступ к таблицам характеристик автомобилей
var tables = document.querySelectorAll('table');


//Функции

//Меняется предоставляемый контент...(заполняет содержимым главную область)
function changedAuto() {
  //выбираем объект авто
  var auto =changeObject(variant);

  //вставляем фото и подпись
  var fig = document.querySelector('#img_auto');
  fig.firstElementChild.setAttribute('src', 'foto/top' + variant + '.png');
  fig.lastElementChild.textContent = auto.brand + ' ' + auto.model + ' максимальная скорость - ' + auto.speed + ' км/ч, $' + auto.price;

  //отображаем и заполняем таблицы характеристик
  if (variant > 0) {
    tables[0].style.display = 'table';
    tables[1].style.display = 'table';

    //табллица - двигатель
    document.getElementById('capacity').lastElementChild.textContent = auto.capacity;
    document.getElementById('power').lastElementChild.textContent = auto.power;
    document.getElementById('torque').lastElementChild.textContent = auto.torque;
    //таблица - динамика
    document.getElementById('dynamics').lastElementChild.textContent = auto.dynamics;
    document.getElementById('speed').lastElementChild.textContent = auto.speed;
  } else {
    tables[0].style.display = 'none';
    tables[1].style.display = 'none';
  }
  //добавляем описание
  document.querySelector('#description p').textContent = auto.description;
  document.querySelector('#description img').setAttribute('src', 'foto/logo' + variant + '.png');
}

//Определяет выбранный элемент и меняет его класс. Также заменяется клас ранее выбранного элемента
function selectedLi(e) {
  if (e.target != navLi[variant]) {
    navLi[variant].setAttribute('class', 'unselected');
    e.target.setAttribute('class', 'selected');
    variant = getNum(e.target);
  }   
}

//Сообщает "какой по счету сестринский элемент".
function getNum(el) {
  var i = 0;
  while (el = el.previousSibling) {
    el.nodeType == 1 && i++;
  }
  return i;
}

//Выбирает нужный объект
function changeObject(index) {
    switch (index) {
    case 1: 
      auto = auto1;
      return auto;
      break;
    case 2: 
      auto = auto2;
      return auto;
      break;
    case 3: 
      auto = auto3;
      return auto;
      break;
    case 4: 
      auto = auto4;
      return auto;
      break;
    case 5: 
      auto = auto5;
      return auto;
      break;
    case 6: 
      auto = auto6;
      return auto;
      break;
    case 7: 
      auto = auto7;
      return auto;
      break;
    case 8: 
      auto = auto8;
      return auto;
      break;
    case 9: 
      auto = auto9;
      return auto;
      break;    
    case 10:
      auto = auto10;
      return auto;
      break;  
    default:
      auto = home;
      return auto;
  }
}
//Эффект волны при наведении на элементы меню
function waveEd(e) {
  var num = getNum(e.target);
  
}


//Объекты
var home = {
  brand: 'ТОП-10 серийных автомобилей',
  model: 'у которых',
  speed: 'более 300',
  price: ''
}
home['description'] = 'В данный рейтинг попали лишь серийные автомобили, на которых можно ездить по дорогам общего пользования. А это значит, что в ТОП-10 нет спортивных болидов, тестовых прототипов и суперкаров, извготовленных под заказ. При подготовке рейтинга использовались: данные автомобильных компаний, данные “Книги рекордов Гиннеса”, исследования профильных изданий. “Десятка” получилась весьма неожиданной. В  ней оказалось немало автомобилей неизвестных широкой публике. Впрочем, это делает рейтинг  лишь интереснее. Среди самых быстрых машин в мире нет ни одного японского автомобиля. Зато есть шведы. В основном же поделили места между собой американцы, итальянцы и британцы.';

//Карточки авто
//Конструктор
function Auto(brand, model, capacity, power, torque, dynamics, speed, price) {
  this.brand = brand;
  this.model = model;
  this.capacity = capacity;
  this.power = power;
  this.torque = torque;
  this.dynamics = dynamics;
  this.speed = speed;
  this.price = price;
}
//Наполняем объекты содержимым
var auto1 = new Auto('Koenigsegg', 'Agera', '5.0', '1348', '1370', '2.8', '447', '1 500 000');
auto1['description'] = 'Koenigsegg Agera — гиперкар шведской компании Koenigsegg Automotive AB, выпущенный к празднованию 15-летия со дня её основания. Является продолжением ранее выпущенной модели Koenigsegg CCX. Официальный релиз состоялся на автосалоне в Женеве в 2010 году. Название Agera переводится со шведского языка как действие.';

var auto2 = new Auto('Bugatti', 'Veyron Super Sport', '8.0', '1183', '1500', '2.46', '435', '2 000 000');
auto2['description'] = 'Bugatti Veyron — гиперкар компании Bugatti, производившийся с 2005 по 2015 год. Назван в честь французского легендарного гонщика Пьера Вейрона, победителя 1939 года в гонках 24 часа Ле-Мана. Модификация Super Sport в 2010 году побила мировой рекорд скорости и стала самым быстрым серийным автомобилем в мире. Производство Veyron на данный момент завершено, всего было продано 450 автомобилей: 300 купе и 150 родстеров.';

var auto3 = new Auto('Hennessey', 'Venom GT', '7.0', '1244', '1566', '2.8', '435', '1 000 000');
auto3['description'] = 'Hennessey Venom GT — спортивный автомобиль американской тюнинговой компании Hennessey Performance Engineering, производившийся с 2010 по 2016 года. Автомобиль основан на базе кузова Lotus Exige с использованием двигателя LS9 от Chevrolet Corvette ZR1. Всего произведено двенадцать экземпляров: шесть купе и шесть родстеров.Автомобиль имеет несколько рекордов скорости, в том числе с 2013 года купе удерживает рекорд Книги рекордов Гиннеса в разгоне до 300 км/ч за 13,63 секунды.';

var auto4 = new Auto('SSC', 'Ultimate Aero TT', '6.3', '1183', '1483', '2.8', '414', '860 000');
auto4['description'] = 'SSC Ultimate Aero — суперкар производства американской компании Shelby Super Cars. SSC Ultimate Aero TT является заряжённой версией SSC Ultimate Aero, в которую установлена система двойного турбонаддува Twin Turbo (сокращённо TT). Первый серийный SSC Ultimate Aero TT 2007 года был продан на eBay за $431 100 В 2009 вышла обновленная версия Благодаря применению новой системы питания от компании Aeromotive мощность того же двигателя Twin Turbocharged V8 Chevrolet повысилась примерно на 19%. Также были пределаны экстерьер и интерьер спорткара.';

var auto5 = new Auto('McLaren', 'F1', '6.1', '672', '705', '3.2', '390', '715 000');
auto5['description'] = 'McLaren F1 — серийная модель спортивного автомобиля британской фирмы McLaren, с 1993 по 2005 года считался самым быстрым в мире. Был спроектирован и произведён компанией McLaren Cars. Всего было выпущено 106 машин, 65 из которых были дорожными вариантами (F1), 5 — LM (прототипы Ле-Мана), 3 — эксклюзивными (GT), 5 — прототипами (XP), 28 — гоночными версиями (GTR) и 1 — прототипом LM (XP LM).';

var auto6 = new Auto('Pagani', 'Huayra', '6.0', '738', '1000', '3', '365', '1 000 000');
auto6['description'] = 'Pagani Huayra (произносится «пагани уа́йра») — эксклюзивный среднемоторный спортивный автомобиль итальянской марки Pagani. Начало производства — весна 2012 года. Huayra означает «ветер» в переводе с языка кечуа, древнего языка инков. Как и Zonda, Huayra использует V12 от Mercedes-AMG с углом развала цилиндров 60° и двумя турбокомпрессорами. По просьбе заказчика компания Mercedes-AMG, внесла в конструкцию некоторые изменения, в результате которых был нивелирован турбопровал на низких оборотах.';

var auto7 = new Auto('Noble', 'M600', '4.4', '650', '838', '3', '362', '265 000');
auto7['description'] = 'Noble M600 — британский суперкар, выпускаемый автопроизводителем Noble Automotive с 2010 года. Впервые был представлен 19 сентября 2009 года на фестивале скорости в Гудвуде. На M600 используется двигатель Volvo B8444S V8, цилиндры которого расположены под углом 60 градусов друг к другу. Разработчиком его является компания Yamaha Motor Company, однако на сам автомобиль ставится версия от Volvo XC90, оборудованная при этом битурбонаддувом от Garrett.';

var auto8 = new Auto('Aston Martin', 'One-77', '7.3', '750', '750', '3.5', '355', '1 500 000');
auto8['description'] = 'Aston Martin One-77 — элитный суперкар английской компании Aston Martin. Всего выпущено 77 экземпляров. Все One-77 были распроданы ещё за год до премьеры.';

var auto9 = new Auto('Ferrari', 'LaFerrari', '6.3', '790', '900', '2.4', '350', '1 000 000');
auto9['description'] = 'LaFerrari (также известен как Ferrari F70/F150) — гибридный гиперкар итальянской фирмы Ferrari, первый серийный гибридный автомобиль компании. Выпущен ограниченной серией в 2013 году. LaFerrari - преемник знаменитого Ferrari Enzo В основе LaFerrari лежит монокок из 4 видов карбонового материала и массой 70 кг, что на 20 % легче Enzo. Силовую установку LaFerrari получил от Ferrari FXX, однако, вкупе с 12-ти цилиндровым атмосферным бензиновым двигателем, работают 2 электромотора.';

var auto10 = new Auto('Lamborghini', 'Aventador', '6.5', '700', '690', '2.9', '350', '350 000');
auto10['description'] = 'Lamborghini Aventador — спортивный автомобиль, выпускающийся компанией Lamborghini. Автомобиль пришёл на смену Lamborghini Murciélago в 2011 году. Как и с моделью Murciélago, материнская компания Audi эксплуатировала тему корриды. В рекламных материалах Lamborghini утверждалось, что Aventador — это знаменитый бык, выращенный сыновьями дона Челестино Куадри Видеса, прославившийся после одного из самых кровопролитных боёв в Сарагосе, за который получил престижную награду «Trofeo de la Peña La Madroñera» за выдающуюся храбрость на арене';



//наполняем содержимым страницу при старте
var start = changedAuto();