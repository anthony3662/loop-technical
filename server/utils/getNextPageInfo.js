// Parse the link header and extract the "next" link
const getNextPageInfo = linkHeader => {
  try {
    const output = {
      next: null,
      previous: null,
    };

    const links = linkHeader.split(', ');
    // Iterate through the links to find the "next" link
    for (const link of links) {
      const [url, rel] = link.split('; ');
      // Remove angle brackets from the URL
      const urlWithoutBrackets = url.slice(1, -1);
      const params = new URLSearchParams(urlWithoutBrackets);
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
