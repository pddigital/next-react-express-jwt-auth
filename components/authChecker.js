import DashRedirect from "./dashRedirect";
import { checkAuth } from "../lib/account";

export default function AuthChecker(Child) {
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
      if (this.props.authed) {
        return <Child {...this.props} />;
      } else {
        return <DashRedirect />;
      }
    }
  };
}
