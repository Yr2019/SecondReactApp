export default class GotHouses {
  constructor() {
    this._apiBase = 'https://www.anapioficeandfire.com/api';
  }
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json();
  };
  getAllHouses() {
    return this.getResource('/houses?page=5&pageSize=10');
  }
  getHouses(id) {
    return this.getResource(`/houses/${id}`);
  }
}


// const got = new GotHouses();

// got.getAllHouses()
//   .then(res => console.log(res));
// got.getHouses(130)
//   .then(res => console.log(res));