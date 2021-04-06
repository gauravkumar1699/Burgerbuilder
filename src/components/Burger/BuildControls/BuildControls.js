import React from 'react';
import classes from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';

const controls =[
    {label: 'Salad', type:'salad'},
    {label: 'Meat', type:'meat'},
    {label: 'Cheese', type:'cheese'},
    {label: 'Bacon', type:'bacon'},
];

const buildControls =(props)=>(
    <div className ={classes.BuildControls}>
        <p>Current Price : ${props.price.toFixed(2)}</p>
        {controls.map(ctrl=>(
            <BuildControl
             added={()=>props.ingredientAdded(ctrl.type)}
             key ={ctrl.label}  
             label ={ctrl.label}
             removed={()=>props.ingredientRemoved(ctrl.type)}
             disabled ={props.disabled[ctrl.type]}
              /> 
        ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW
        </button>
    </div>
);
export default buildControls; 