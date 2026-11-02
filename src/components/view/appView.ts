import { News } from './news/news';
import { Sources } from './sources/sources';
import { NewsApiResponse, SourcesResponse } from '../../types/news-api';

class AppView {
    // 1. Объявляем свойства и делаем их приватными
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    // 2. Типизируем параметр data как NewsApiResponse (ответ для новостей)
    drawNews(data: NewsApiResponse): void {
        // TypeScript теперь знает, что внутри data есть массив articles
        const values = data.articles ? data.articles : [];
        this.news.draw(values);
    }

    // 3. Типизируем параметр data как SourcesResponse (ответ для источников)
    drawSources(data: SourcesResponse): void {
        const values = data.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export { AppView };