import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { toggleAuth } from "../store";
import { makeStore } from "../store";
import { Link, Router } from "../routes";
import Layout from "../components/layout";
import { getProtectedContent } from "../lib/account";
import AuthChecker from "../components/authChecker";

class Dashboard extends React.Component {
  static async getInitialProps({ req, query }) {
    return {
    };
  }
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }
  componentDidMount() {
    getProtectedContent()
      .then(response => {
        this.setState({ content: response.stuff });
      })
      .catch(err => {
        Router.push("/login");
      });
  }

  render() {
    return (
      <Layout>
        <section>
          <h1>Hello from Dashboard</h1>

          <p>{this.state.content}</p>

          <center>
            <p>
              <Link to="/">
                <a>Back Home</a>
              </Link>
            </p>
          </center>
        </section>
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
  AuthChecker(Dashboard)
);
