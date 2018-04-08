const env = require('../env');
import AuthCheckerSoft from "../components/authCheckerSoft";
import withRedux from "next-redux-wrapper";
import { bindActionCreators } from "redux";
import { makeStore } from "../store";

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
    return (
      <div>
        <h1>Star Wars Films</h1>
        <style jsx>{``}</style>
      </div>
    );
  }
}

const mapStateToProps = ({ authed }) => ({
  authed
});

const mapDispatchToProps = dispatch => ({
});

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(
  AuthCheckerSoft(Content)
);

