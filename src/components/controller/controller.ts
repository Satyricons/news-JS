import AppLoader from './appLoader';
import { CallbackFunction } from './loader';
import { NewsApiResponse, SourcesResponse } from '../../types/news-api';

class AppController {
    private loader: AppLoader;

    constructor() {
        this.loader = new AppLoader();
    }

    // Указываем <SourcesResponse> для колбэка
    getSources(callback: CallbackFunction<SourcesResponse>): void {
        this.loader.getResp<SourcesResponse>({ endpoint: 'sources' }, callback);
    }

    // Указываем <NewsApiResponse> для колбэка
    getNews(e: Event, callback: CallbackFunction<NewsApiResponse>): void {
        const target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;
        let sourceId = '';

        if (newsContainer.classList.contains('source__item')) {
            sourceId = newsContainer.getAttribute('data-source-id') || '';
        } else if (target.classList.contains('source__item')) {
            sourceId = target.getAttribute('data-source-id') || '';
        }

        this.loader.getResp<NewsApiResponse>(
            {
                endpoint: 'everything',
                options: { sources: sourceId },
            },
            callback
        );
    }
}

export { AppController };