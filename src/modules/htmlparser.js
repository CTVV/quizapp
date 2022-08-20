export function decodeHTMLEntities(text) {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      return doc.querySelector('body').textContent;
    }
    catch {}
   
    return null;
  }
