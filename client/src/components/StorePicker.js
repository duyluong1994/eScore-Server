import React from "react";
import {getFunName} from '../helpers';
import PropTypes from 'prop-types';
class StorePicker extends React.Component {
    // constructor() {
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }
    goToStore(event) {
        event.preventDefault();
        console.log('U changed the URL');

        const storeId = this.storeInput.value;
        this.context.router.history.replace(`/store/${storeId}`);
    }
    render() {
        //return React.createElement('p', {className: 'testing '}, 'I love Chang');
        //return single element
        return (
            <form action="" className='store-selector' onSubmit={this.goToStore.bind(this)}>
                {/*Comment*/}
                <h2>Please Enter A Store</h2>
                <input type="text" required placeholder='StoreName'
                   defaultValue={getFunName()} ref={(input) => {this.storeInput = input}}/>
                <button type="submit" > Visit Store</button>
            </form>
        )
    }
}

StorePicker.contextTypes  = {
    router: PropTypes.object
};
export default StorePicker;