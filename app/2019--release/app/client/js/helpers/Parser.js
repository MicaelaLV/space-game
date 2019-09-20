
class Parser {
  constructor() {}

  parseJSON(response, callback) {
    const responseParsed = JSON.parse(response);
    if(!!callback) callback(responseParsed);
    return responseParsed;
  }

  parseToHTML(string, callback) {
    // WARNING: String should contain a root tag element,
    // siblings must be manage in different calls
    const doc = new DOMParser().parseFromString(string, 'text/html');
    const tag = doc.body.firstChild;
    if(!!callback) callback(tag);
    return tag;
  }
}


export default Parser;
