import { Router } from "../routes";

export default class DashRedirect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    Router.push("/login");
  }
  render() {
    return <div />;
  }
}