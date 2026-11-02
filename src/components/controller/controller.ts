import AppLoader from './appLoader';
import { CallbackFunction } from './loader';

class AppController {
    private loader: AppLoader;

    constructor() {
        this.loader = new AppLoader();
    }

    getSources(callback: CallbackFunction): void {
        this.loader.getResp({ endpoint: 'sources' }, callback);
    }

    getNews(e: Event, callback: CallbackFunction): void {
        const target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;
        let sourceId = '';

        if (newsContainer.classList.contains('source__item')) {
            sourceId = newsContainer.getAttribute('data-source-id') || '';
        } else if (target.classList.contains('source__item')) {
            sourceId = target.getAttribute('data-source-id') || '';
        }

        this.loader.getResp(
            {
                endpoint: 'everything',
                options: { sources: sourceId },
            },
            callback
        );
    }
}

export { AppController };