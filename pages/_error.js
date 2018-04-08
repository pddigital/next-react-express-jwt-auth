import Layout from "../components/layout";
import { Link } from "../routes";

export default () => (
  <Layout title="Page not found">
    <div className="container">
      <h1>Page not found!</h1>
      <span>
        <Link route="/">
          <a>Back Home</a>
        </Link>
      </span>
    </div>
    <style jsx>
      {`
        span {
          display: block;
          text-align: center;
        }
      `}
    </style>
  </Layout>
);
