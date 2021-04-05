import { Component } from "react";

import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
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
        totalPrice: 4
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
                <Burger ingredients ={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded = {this.addIngredientHandler} 
                    ingredientRemoved ={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}/>
            </Aux>
        );
    }
}
export default BurgerBuilder;