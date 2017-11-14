import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { toggleAuth } from "../store";
import { makeStore } from "../store";
import { Link } from "../routes";
import Layout from "../components/layout";

class Login extends React.Component {
  componentDidMount() {}

  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  login(event) {
    event.preventDefault();

    
  }

  render() {
    return (
      <Layout>
        <section>
        <h1>Login now!</h1>
        <p>Hint: testuser, password12</p>
        <form onSubmit={this.login.bind(this)}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            onChange={this.handleChange.bind(this, "email")}
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

          <p><Link to="/"><a>Back Home</a></Link></p>
          <p><Link to="/dashboard"><a>Try Protected Route</a></Link></p>

        </form>
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

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Login);
