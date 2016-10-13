// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// https://github.com/iliakan/ts-course/blob/master/ts-lesson-3/demo-flikr-app/scripts/fetch.ts

//`${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`

// uri: 'https://api.flickr.com/services/rest/?',
//     queryMethod: 'flickr.photos.search',
//     apiKey: '7fbc4d0fd04492d32 fa9a2f718c6293e'

interface RequestInit {
    mode: string;
    method: string;
}


interface Request {
    method: string;
    url: string;
    context: string;
}

declare let Request: {
    prototype: Request;
    new (input: string|Request, init: RequestInit): Request;
};


interface ResponseInit {
    status: string;
    statusText: string;
}

interface ResponseBody {
    blob: Blob;
    formData: FormData
}
interface Response {
    blob: ()=> Promise<Blob>
    formData: ()=> Promise<FormData>
    json: ()=>any;
}

declare let Response: {
    prototype: Response;
    new (input: ResponseBody, init: ResponseInit): Response;
};


declare function fetch(input: string|Request): Promise<Response>


type opt={
    elem: HTMLElement;
    uri: string;
    queryMethod: string;
    apiKey: string;
}

interface IPhoto {
    farm: number;
    id: string;
    isfamily: number;
    ispublic: number;
    owner: string;
    secret: string;
    server: string;
    title: string
}

class Flickr {
    protected elem: HTMLElement;
    protected input: HTMLInputElement;
    protected searchButton: HTMLButtonElement;
    protected imagesBox: HTMLDivElement;
    protected uri: string;
    protected queryMethod: string;
    protected apiKey: string;

    protected photos: IPhoto[];

    public constructor(opt: opt) {
        this.elem = opt.elem;
        this.uri = opt.uri;
        this.queryMethod = opt.queryMethod;
        this.apiKey = opt.apiKey;

        this.input = <HTMLInputElement>this.elem.querySelector(".flickr-search-input");
        this.imagesBox = <HTMLDivElement>this.elem.querySelector(".image-area");
        this.searchButton = <HTMLButtonElement>this.elem.querySelector(".flickr-search-button");
        this.searchButton.addEventListener('click',this.search.bind(this,this.render.bind(this)))
    }


    protected render(body: any): void {
        this.photos = body.photos.photo;
        let content = '';
        for (let photo of this.photos) {
            content += `<div class='image-box'>
<img src='https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg' />
<p>${photo.title}</p></div>`
        }
        this.imagesBox.innerHTML = content;
    }


    protected search(cb: (body: any)=>any): void {
        if (!this.input.value) {
            return;
        }
        let text = this.input.value;
        let url = `${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`
        this.getPhoto(url, cb)
    }


    protected getPhoto(input: string|Request, cb: (body: any)=>any): void {
        fetch(input)
            .then((response: Response): Promise<any> => response.json())
            .then(cb)
    }
}

let elem =document.querySelector('.flikr-box') as HTMLDivElement;

let flickr = new Flickr({
    elem,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
})