import  React from 'react'
import AddFishForm from './AddFishForm';
import PropTypes from 'prop-types';
import base from '../base';
import firebase from 'firebase';

class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object.isRequired,
        updateFish: PropTypes.func.isRequired,
        deleteFish: PropTypes.func.isRequired,
        loadSamples: PropTypes.func.isRequired,
        addFish: PropTypes.func.isRequired,
        storeId: PropTypes.string.isRequired
    };

    state = {
        uid: null,
        owner: null
    };

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }
    authenticate(provider) {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebase
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    }
    authHandler = async authData => {
      const store = await base.fetch(this.props.storeId, {context: this});
      console.log(authData);
      if(!store.owner){
          base.post(`${this.props.storeId}/owner`,{
              data: authData.user.uid,
          });
      }
      this.setState({
          uid: authData.user.uid,
          owner: store.owner || authData.user.uid,
      });

    };

    handleChange(e, key) {
        const fish = this.props.fishes[key];
        const updatedFish = {
            ...fish
            , [e.target.name]: e.target.value
        };
        this.props.updateFish(key, updatedFish);
    };

    logout = async () => {
        console.log("Logging out!");
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    renderLogin() {
        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Sign in</p>
                <button className="facebook" onClick={() => this.authenticate('Facebook')}>
                    Login with FB
                </button>
            </nav>
        );
    };

    renderInventory(key){
        const fish = this.props.fishes[key];

        return(
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name}
                    onChange={(e) => this.handleChange(e, key)}/>

                <input type="text" name="price" value={fish.price}
                       onChange={(e) => this.handleChange(e, key)}/>

                <select  name="status" value={fish.status}
                         onChange={(e) => this.handleChange(e, key)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>

                <input type="text" name="desc" value={fish.desc}
                       onChange={(e) => this.handleChange(e, key)}/>

                <input type="text" name="image" value={fish.image}
                       onChange={(e) => this.handleChange(e, key)}/>
                <button onClick={() => this.props.deleteFish(key)}>Remove Fish</button>
            </div>
        );
    }
    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;
        //check logged
        if(!this.state.uid){
            return <div>{this.renderLogin()}</div>
        }
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry u are't the owner of this store!</p>
                    {logout}
                </div>
            )
        }
        return (
            <div>
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes)
                    .map((key) =>this.renderInventory(key))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
            </div>

        )
    }
}
export default Inventory;