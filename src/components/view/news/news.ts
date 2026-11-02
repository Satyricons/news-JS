import { Article } from '../../../types/news-api';
import './news.css';

class News {
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        if (newsItemTemp) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                // Чередование цветов карточек (опционально)
                if (idx % 2) {
                    newsClone.querySelector('.news__item')?.classList.add('news__item--alt');
                }

                // Заголовок
                const titleEl = newsClone.querySelector('.news__title');
                if (titleEl) titleEl.textContent = item.title || 'No title available';
                
                // Дата
                const dateEl = newsClone.querySelector('.news__meta-date');
                if (dateEl && item.publishedAt) {
                    const date = new Date(item.publishedAt);
                    dateEl.textContent = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
                }

                // Источник
                const sourceEl = newsClone.querySelector('.news__source');
                if (sourceEl) sourceEl.textContent = item.source.name;

                // Описание
                const descEl = newsClone.querySelector('.news__description-text');
                if (descEl) descEl.textContent = item.description || 'No description available';

                // Ссылка "Read More"
                const moreEl = newsClone.querySelector('.news__more a');
                if (moreEl) moreEl.setAttribute('href', item.url);

                // Картинка (используем backgroundImage для блока)
                const imgEl = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                if (imgEl && item.urlToImage) {
                    imgEl.style.backgroundImage = `url(${item.urlToImage})`;
                }

                fragment.appendChild(newsClone);
            });
        }

        const newsContainer = document.querySelector('.news');
        if (newsContainer) {
            newsContainer.innerHTML = '';
            newsContainer.appendChild(fragment);
        }
    }
}

export { News };