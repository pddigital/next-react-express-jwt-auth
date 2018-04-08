import Document, { Head, Main, NextScript } from "next/document";
import flush from "styled-jsx/server";

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage();
    const styles = flush();
    return { html, head, errorHtml, chunks, styles };
  }

  render() {
    return (
      <html>
        <noscript><h1>THIS WEBSITE REQUIRES JAVASCRIPT! PLEASE ENABLE IT!</h1></noscript>
        <Head />
        <body>
          <Main />

          <NextScript />
        </body>
      </html>
    );
  }
}