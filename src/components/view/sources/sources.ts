import { Source } from '../../../types/news-api';
import './sources.css';

class Sources {
    draw(data: Source[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement | null;

        if (sourceItemTemp) {
            data.forEach((item) => {
                const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

                const nameEl = sourceClone.querySelector('.source__name');
                if (nameEl) {
                    nameEl.textContent = item.name;
                }

                const itemEl = sourceClone.querySelector('.source__item');
                if (itemEl) {
                    // TypeScript знает, что item.id может быть string | null, приводим к строке
                    itemEl.setAttribute('data-source-id', item.id || '');
                }

                fragment.appendChild(sourceClone);
            });
        }

        const sourcesContainer = document.querySelector('.sources');
        if (sourcesContainer) {
            sourcesContainer.innerHTML = '';
            sourcesContainer.appendChild(fragment);
        }
    }
}

export { Sources };