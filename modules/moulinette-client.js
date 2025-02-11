/**
 * Client for Moulinette server
 */
export class MoulinetteClient {
  
  //static SERVER_URL = "http://127.0.0.1:5000"
  //static SERVER_OUT = "http://127.0.0.1:5000/static/out/"
  //static GITHUB_SRC = "http://127.0.0.1:5000/static"
  static SERVER_URL = "https://boisdechet.org/moulinette"
  static SERVER_OUT = "https://boisdechet.org/moulinette/static/out/"
  static GITHUB_SRC = "https://raw.githubusercontent.com/SvenWerlen/moulinette-data"
  
  static HEADERS = { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  
  /*
   * Sends a request to server and returns the response
   */
  async fetch(URI, method, data) {
    let params = {
      method: method,
      headers: MoulinetteClient.HEADERS
    }
    if( data ) { params.body = JSON.stringify(data) }

    const response = await fetch(`${MoulinetteClient.SERVER_URL}${URI}`, params).catch(function(e) {
      console.log(`MoulinetteClient | Cannot establish connection to server ${MoulinetteClient.SERVER_URL}`, e)
    });
    return response
  }
  
  /*
   * Sends a request to server and return the response or null (if server unreachable)
   */
  async send(URI, method, data) {
    const response = await this.fetch(URI, method, data)
    if(!response) {
      return null;
    }
    return { 'status': response.status, 'data': await response.json() }
  }
  
  async get(URI) { return this.send(URI, "GET") }
  async put(URI) { return this.send(URI, "PUT") }
  async post(URI, data) { return this.send(URI, "POST", data) }
  async delete(URI, data) { return this.send(URI, "DELETE") }
}
