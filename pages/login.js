import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { toggleAuth } from "../store";
import { makeStore } from "../store";
import { Link, Router } from "../routes";
import Layout from "../components/layout";
import AuthCheckerSoft from "../components/authCheckerSoft";
import { loginUser } from "../lib/account";

class Login extends React.Component {
  static async getInitialProps({ store, isServer, pathname, query }) {
    return {};
  }
  constructor(props) {
    super(props);

    this.state = {
      user: "",
      password: "",
      error: ""
    };
  }

  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  login(event) {
    event.preventDefault();

    loginUser(this.state.user, this.state.password)
      .then(response => {
        if (response) {
          this.props.toggleAuth(true);
          Router.push("/dashboard");
        } else if (!response) {
          this.props.toggleAuth(false);
          this.setState({ error: "failure" });
        }
      })
      .catch(err => {
        throw err;
      });
  }

  componentDidMount() {
    if (this.props.authed) {
      Router.push("/dashboard");
    }
  }

  render() {
    return (
      <Layout>
        <section>
          <h1>Login now!</h1>
          <p>Hint: testuser, password12</p>
          <form onSubmit={this.login.bind(this)}>
            <label htmlFor="user">User: </label>
            <input
              type="text"
              name="user"
              onChange={this.handleChange.bind(this, "user")}
              required
            />
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              onChange={this.handleChange.bind(this, "password")}
              required
            />
            <button type="submit" id="submit">
              LOGIN
            </button>

            {this.state.error ? (
              <span className="login-fail-msg">Invalid login or password!</span>
            ) : (
              <span />
            )}

            <p>
              <Link to="/">
                <a>Back Home</a>
              </Link>
            </p>
            <p>
              <Link to="/dashboard">
                <a>Try Protected Route</a>
              </Link>
            </p>
          </form>
        </section>
        <style jsx>
          {`
            .login-fail-msg {
              width: 100%;
              background-color: red;
              border: 1px solid black;
              padding: 5px;
              margin-top: 30px;
              color: white;
              display: block;
              text-align: center;
              border-radius: 2px 2px;
            }
          `}
        </style>
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
  AuthCheckerSoft(Login)
);
