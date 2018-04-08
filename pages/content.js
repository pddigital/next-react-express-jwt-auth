import env from "../env";
import AuthCheckerSoft from "../components/authCheckerSoft";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { makeStore } from "../store";
import { toggleAuth } from "../store";
import OneFilm from "../components/oneFilm";
import Layout from "../components/layout";
import { Link, Router } from "../routes";

class Content extends React.Component {
  static async getInitialProps({ req, query }) {
    const content = await fetch(`${env.apiUrl}/api/content/`);
    const contentJson = await content.json();

    return {
      content: contentJson
    };
  }
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {

    const pageColor = 'navy';

    const films = this.props.content.results.map(one => (
      <OneFilm key={one.episode_id} data={one} />
    ));

    return (
      <Layout title="Welcome to the Star Wars Movie List!">
        <div className="container">
          <h1>Star Wars Films</h1>
          {films}

          <p>
            {this.props.authed ? 'You are logged in!' : 'You are not logged in!'}
            <br />
            <Link route="/"><a>Go Home</a></Link>
          </p>

          <style jsx>{`
            h1 {
              color: ${pageColor}
            }
            p {
              margin-top: 30px;
              text-align: center;
            }
          `}</style>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = ({ authed }) => ({
  authed
});

const mapDispatchToProps = dispatch => ({
  toggleAuth: bindActionCreators(toggleAuth, dispatch)
});

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(
  AuthCheckerSoft(Content)
);
