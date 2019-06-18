export default class GotBooks {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  getAllBooks() {
    return this.getResource('/books?pageSize=10')
  }
  getBooks(id) {
    return this.getResource(`/books/${id}`);
  }
}

// const got = new GotBooks();

// got.getAllBooks()
//   .then(res => console.log(res));
// got.getBooks(1)
//   .then(res => console.log(res));