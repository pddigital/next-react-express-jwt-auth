import { Link } from "../routes";

export default ({ data }) => (
  <div>
    <p>
      <a>{data.title}</a>
    </p>
    <style jsx>
      {`
        p {
          text-align: center;
          font-weight: bold;
          color: red;
        }
      `}
    </style>
  </div>
);
