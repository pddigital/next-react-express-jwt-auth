import { checkAuth } from "../lib/account";
import { Link, Router } from "../routes";

export default function AuthCheckerSoft(Child) {
  return class WrappedComponent extends React.Component {
    static getInitialProps(context) {
      return Child.getInitialProps(context);
    }

    constructor(props) {
      super(props);
    }

    componentDidMount() {
      const user = JSON.parse(localStorage.getItem("user"));
      checkAuth(user)
        .then(response => {
          if (response) {
            localStorage.setItem("user", JSON.stringify(response));
            this.props.toggleAuth(true);
          } else {
            this.props.toggleAuth(false);
          }
        })
        .catch(err => {
          throw err;
        });
    }

    render() {
      return <Child {...this.props} />;
    }
  };
}