// Описываем, какие настройки передаются при создании загрузчика
export interface LoaderOptions {
  apiKey?: string; // apiKey может быть, а может и не быть (поэтому ?)
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



// class Loader {
//     constructor(baseLink, options) {
//         this.baseLink = baseLink;
//         this.options = options;
//     }

//     getResp(
//         { endpoint, options = {} },
//         callback = () => {
//             console.error('No callback for GET response');
//         }
//     ) {
//         this.load('GET', endpoint, callback, options);
//     }

//     errorHandler(res) {
//         if (!res.ok) {
//             if (res.status === 401 || res.status === 404)
//                 console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
//             throw Error(res.statusText);
//         }

//         return res;
//     }

//     makeUrl(options, endpoint) {
//         const urlOptions = { ...this.options, ...options };
//         let url = `${this.baseLink}${endpoint}?`;

//         Object.keys(urlOptions).forEach((key) => {
//             url += `${key}=${urlOptions[key]}&`;
//         });

//         return url.slice(0, -1);
//     }

//     load(method, endpoint, callback, options = {}) {
//         fetch(this.makeUrl(options, endpoint), { method })
//             .then(this.errorHandler)
//             .then((res) => res.json())
//             .then((data) => callback(data))
//             .catch((err) => console.error(err));
//     }
// }



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
