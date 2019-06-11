async function getHtml(url) {
  const html = document.createElement('div');
  const body = await fetch(url)
    .then(res => res.arrayBuffer())
    .then(buffer => {
      const decoder = new TextDecoder('iso-8859-1');
      return decoder.decode(buffer);
    });

  html.innerHTML = body;
  return html;
}

export default getHtml;
