import AppLoader from './appLoader';
import { CallbackFunction } from './loader';
import { NewsApiResponse, SourcesResponse } from '../../types/news-api';

class AppController {
    private loader: AppLoader;

    constructor() {
        this.loader = new AppLoader();
    }

    // Используем мок-эндпоинт для источников
    getSources(callback: CallbackFunction<SourcesResponse>): void {
        this.loader.getResp<SourcesResponse>({ endpoint: 'mocks/sources' }, callback);
    }

    // Используем мок-эндпоинт для новостей
    getNews(e: Event, callback: CallbackFunction<NewsApiResponse>): void {
        const target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;
        let sourceId = '';

        // Ищем data-source-id на элементе, по которому кликнули, или на его родителе
        if (newsContainer.classList.contains('source__item')) {
            sourceId = newsContainer.getAttribute('data-source-id') || '';
        } else if (target.classList.contains('source__item')) {
            sourceId = target.getAttribute('data-source-id') || '';
        }

        this.loader.getResp<NewsApiResponse>(
            {
                endpoint: 'mocks/everything',
                options: { sources: sourceId },
            },
            callback
        );
    }
}

export { AppController };