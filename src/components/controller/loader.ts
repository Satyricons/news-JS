// Описываем, какие настройки передаются при создании загрузчика
export interface LoaderOptions {
  apiKey?: string;
  sources?: string;
}

// Описываем, что принимает метод getResp
export interface LoaderParameters {
  endpoint: string;
  options?: Partial<LoaderOptions>; // Используем Utility Type Partial!
}

// Описываем, что принимает метод load
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'; // Union Type

// Описываем, что возвращает fetch
export type CallbackFunction = (data: unknown) => void; 


class Loader {
    private baseLink: string;
    private options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        { endpoint, options = {} }: LoaderParameters,
        callback: CallbackFunction = () => {}
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): Response { // Типизируем как Response из стандартной библиотеки браузера
        if (!res.ok) {
            // ...
        }
        return res;
    }

    makeUrl(options: LoaderOptions, endpoint: string): string {
        const urlOptions: LoaderOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        
        // ... логика формирования url

        return url;
    }

    load(
        method: HttpMethod, 
        endpoint: string, 
        callback: CallbackFunction, 
        options: LoaderOptions = {}
    ): void {
       
    }
}

export default Loader;
