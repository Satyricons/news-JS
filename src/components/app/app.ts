import { AppController } from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsApiResponse, SourcesResponse } from '../../types/news-api';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const sourcesBtn = document.querySelector('.sources');
        if (sourcesBtn) {
            sourcesBtn.addEventListener('click', (e) => 
                this.controller.getNews(e, (data) => this.view.drawNews(data as NewsApiResponse))
            );
        }
        this.controller.getSources((data) => this.view.drawSources(data as SourcesResponse));
    }
}

export default App;