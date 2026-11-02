import './global.css';
import logo from './rs_school_js.png'; // Импортируем картинку
import App from './components/app/app';

const app = new App();
app.start();

// Находим картинку в футере и подставляем ей путь из Webpack
const logoImg = document.querySelector('#rs-logo') as HTMLImageElement;
if (logoImg) {
    logoImg.src = logo;
}