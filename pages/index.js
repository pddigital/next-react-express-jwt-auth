import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { toggleAuth } from "../store";
import { makeStore } from "../store";
import { Link } from "../routes";
import Layout from "../components/layout";
import AuthCheckerSoft from "../components/authCheckerSoft";
import { logoutUser } from "../lib/account";

class Index extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    return {};
  }

  logout() {
    logoutUser().then(response => {
      this.props.toggleAuth(false);
    });
  }

  render() {
    return (
      <Layout>
        <section>
          <h1>Hello from Node JS</h1>

          {this.props.authed ? 
            <span>
                <p>You are logged in. Try logging out!</p>
            <button onClick={this.logout.bind(this)}>LOGOUT</button>
            </span>
            :
            <span>
            <p>You are not logged in. Go forward and auth!</p>
            <Link to="/login">
            <a>
              <button>LOGIN!</button>
            </a>
          </Link>
          </span>
           }
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
  AuthCheckerSoft(Index)
);
