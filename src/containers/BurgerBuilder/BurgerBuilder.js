import { Component } from "react";

import React from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENTS_PRICES ={
    salad : 0.5,
    cheese:0.4,
    meat: 0.3,
    bacon:0.7
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state ={...}
    // }
    state = {
        ingredients :{
            salad:0 ,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing : false
    }
    
    updatePurchaseState(ingredients) {
        
        const sum = Object.keys(ingredients)   //Array of strings - 'salad'bacon''cheese''meat'
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum ,el )=> {
            return sum + el;
        },0);
        this.setState( {purchasable: sum > 0});
    }
    
    addIngredientHandler = (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngrdients ={
            ...this.state.ingredients
        };
        updatedIngrdients[type]=updatedCount;
        const priceAddition =INGREDIENTS_PRICES[type];
        const  oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngrdients});
        this.updatePurchaseState(updatedIngrdients);
    }
      
    removeIngredientHandler = (type) => {
        // if(oldCount <= 0){   Can also be used but button wont be disabled
        //     return;
        // }
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount - 1;
        const updatedIngrdients ={
            ...this.state.ingredients
        };
        updatedIngrdients[type]=updatedCount;
        const priceDeduction =INGREDIENTS_PRICES[type];
        const  oldPrice =  this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngrdients});
        this.updatePurchaseState(updatedIngrdients);
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler = () => {
        alert('You Continue!');
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad:true ,meat :false , ...}
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients ={this.state.ingredients}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice} />
                </Modal>
                <Burger ingredients ={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved ={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable ={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;