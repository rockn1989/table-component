class Api {
  constructor() {
    this._api = `https://jsonplaceholder.typicode.com`;
  }

  async getPost() {
    const response = await fetch(`${this._api}/posts`);
    const result = await response.json();
    return result;
  }

  async getFilterPost(userId) {
    const response = await fetch(`${this._api}/posts?userId=${userId}`);
    const result = await response.json();
    return result;
  }
}

export default Api;
