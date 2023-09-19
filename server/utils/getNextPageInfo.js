// Parse the link header and extract the page_info param within the "next" and "previous" link
const getNextPageInfo = linkHeader => {
  try {
    const output = {
      next: null,
      previous: null,
    };

    const links = linkHeader.split(', ');
    for (const link of links) {
      const [url, rel] = link.split('; ');
      // Remove angle brackets from the URL
      const urlWithoutBrackets = url.slice(1, -1);
      // Isolate the query string
      const queryString = urlWithoutBrackets.split('?')[1] || '';
      const params = new URLSearchParams(queryString);
      const pageInfoParam = params.get('page_info');
      if (rel === 'rel="next"') {
        output.next = pageInfoParam;
      } else if (rel === 'rel="previous"') {
        output.previous = pageInfoParam;
      }
    }
    return output;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getNextPageInfo,
};
