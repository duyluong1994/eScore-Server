import  React from 'react'
import {formatPrice} from '../helpers';
import { TransitionGroup, CSSTransition  } from 'react-transition-group'
import "../css/_animations.css"
import PropTypes from 'prop-types';
class Order extends React.Component {
    constructor() {
        super();
        this.renderOrder = this.renderOrder.bind(this);
    }
    renderOrder (key) {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const transitionOptions = {
            classNames: "order",
            key,
            timeout: { enter: 500, exit: 500 }
        };

        const deleteButton = <button onClick={() => this.props.deleteFromOrder(key)}>&times;</button>;

        if(!fish || fish.status === 'unavailable') {
            return ( <CSSTransition {...transitionOptions}>
                    <li key={key}>
                        Sorry, {fish? fish.name : ''} is no longer avaiable!{deleteButton}
                    </li>
                </CSSTransition>
            );
        }
        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                    <TransitionGroup
                        component="span"
                        className="count">
                        <CSSTransition
                            classNames="count"
                            key={count}
                            timeout={{enter:500, exit:500}}>
                        <span>{count}</span>
                        </CSSTransition>
                    </TransitionGroup>
                    lbs {fish.name} {deleteButton}
                    </span>
                    <span className="price">{formatPrice(count * fish.price)}</span>
                </li>
            </CSSTransition>

        );
    }
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status ==='available';
            if(isAvailable) {
                return prevTotal + (count * fish.price)
            }
            return prevTotal;
        }, 0) ;
        return (
            <div className="order-wrap">
                <h2>Your Order</h2>
                <TransitionGroup
                    className="order"
                    component="ul">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                    <li className="total">
                        <strong>Total:</strong>
                        {formatPrice(total)}
                    </li>
            </div>
        )
    }
}
Order.propTypes = {
    deleteFromOrder: PropTypes.func.isRequired,
    order: PropTypes.object.isRequired,
    fishes: PropTypes.object.isRequired,
};

export default Order;