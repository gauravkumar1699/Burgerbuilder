import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';


class  OrderSummary extends Component {

    componentDidUpdate(){
        console.log('[OrderSummar] DidUpdate');
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map( igKey => {
                return (
                <li key={igKey}>
                    <span style = {{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>);
            });
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A deliciuous buger with the following ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong> </p>
            <p>Continue with Checkout ?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued} >CONTINUE</Button>
        </Aux>
        );
    }
};
export default OrderSummary;