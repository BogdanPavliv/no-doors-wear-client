# 🧢 No Doors Wear — Client

**No Doors Wear** — це клієнтська частина сучасного eCommerce-застосунку для бренду одягу. Побудовано на базі **Next.js 14**, з інтеграцією мап від TomTom, функціональністю онлайн-магазину, поштою, завантаженням зображень, SEO-оптимізацією та повноцінною інтеграцією з back-end (MongoDB + JWT).

## ⚙️ Технологічний стек

- **Next.js 14**
- **React 18 + TypeScript**
- **Effector**
- **MongoDB + Mongoose**
- **Multer, Nodemailer**
- **TomTom Maps SDK**
- **Framer Motion, Swiper, React Slick**
- **React Hook Form, React Share**
- **JWT Auth**

## 🚀 Основні особливості

- 🛒 Повноцінний інтерфейс магазину з пагінацією та категоріями
- 🔐 Авторизація через JWT (`jsonwebtoken` + `bcryptjs`)
- 🌍 **TomTom Maps SDK** — пошук і відображення мап у формі доставки
- 📤 Завантаження зображень через `multer` та серверне збереження
- 📩 Відправка пошти за допомогою `nodemailer`
- 🎥 Анімовані елементи за допомогою `framer-motion`
- 🔄 Нескінченний скролінг / пагінація через `react-paginate`
- 📱 Кнопки поширення в соцмережах через `react-share`
- 🧩 UI-компоненти на базі FontAwesome, Swiper, React Slick
- 📝 Форми з валідацією на базі `react-hook-form`
- 🔥 Нотифікації через `react-hot-toast`
- 🧠 Ефективний state-менеджмент через `effector` і `effector-react`

## 📦 Встановлення

bash
git clone https://github.com/BogdanPavliv/no-doors-wear-client.git
cd no-doors-wear-client
npm install
npm run dev

## 🚀 Команди

| Скрипт          | Опис                                           |
| --------------- | ---------------------------------------------- |
| `npm run dev`   | Запускає локальний сервер Next.js для розробки |
| `npm run build` | Створює продакшен-білд за допомогою Next.js    |
| `npm run start` | Запускає продакшен-версію сервера              |
| `npm run lint`  | Запускає аналіз коду за допомогою ESLint       |

## 🛠️ Розгортання

[Watch demo](https://no-doors-shop-client.netlify.app/)

👨‍💻 Автор
Богдан Павлів — Frontend Developer
📧 [bogdan.pavliv@gmail.com]
🌐 [My portfolio](https://bogdan-pavliv.netlify.app)