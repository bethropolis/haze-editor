export function createTemplate(html, css, js) {
  return `
      <html>
        <head>
          <style>
          body,html{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          ${css}</style>
        </head>
        <body>${html}
          <script>${js}</script>
        </body>
      </html>
    `;
}
