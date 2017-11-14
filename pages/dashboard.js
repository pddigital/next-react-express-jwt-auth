import withRedux from 'next-redux-wrapper';
import { bindActionCreators } from 'redux';
import { toggleAuth } from "../store";
import { makeStore } from '../store';
import { Link } from "../routes";
import Layout from '../components/layout';

class Dashboard extends React.Component {

  componentDidMount(){

  }

  render() {

    return (

        <Layout>
            <section>
            <h1>Hello from Dashboard</h1>

            <Link to="/login"><a><button>LOGIN!</button></a></Link>
            </section>
            
        </Layout>

    );
  }
}

const mapStateToProps = ({ authed }) => ({
  authed
});

const mapDispatchToProps = dispatch => ({
  toggleAuth: bindActionCreators(toggleAuth, dispatch),  
});

export default withRedux(makeStore, mapStateToProps, mapDispatchToProps)(Dashboard);