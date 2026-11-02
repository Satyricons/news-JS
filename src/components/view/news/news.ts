import { Article } from '../../../types/news-api';
import './news.css';

class News {
    // data теперь строго массив статей
    draw(data: Article[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement | null;

        if (newsItemTemp) {
            news.forEach((item, idx) => {
                // Обрати внимание: мы говорим TypeScript, что newsItemTemp — это HTMLTemplateElement
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                if (idx % 2) {
                    newsClone.querySelector('.news__item')?.classList.add('news__item--alt');
                }

                // Заполняем данные (здесь используем опциональную цепочку ?. на случай, если элемента нет)
                const titleEl = newsClone.querySelector('.news__title');
                if (titleEl) titleEl.textContent = item.title || 'No title available';
                
                const dateEl = newsClone.querySelector('.news__date');
                if (dateEl && item.publishedAt) {
                    const date = new Date(item.publishedAt);
                    dateEl.textContent = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
                }

                const sourceEl = newsClone.querySelector('.news__source');
                if (sourceEl) sourceEl.textContent = item.source.name;

                const descEl = newsClone.querySelector('.news__description');
                if (descEl) descEl.textContent = item.description || 'No description available';

                const moreEl = newsClone.querySelector('.news__more');
                if (moreEl) moreEl.setAttribute('href', item.url);

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