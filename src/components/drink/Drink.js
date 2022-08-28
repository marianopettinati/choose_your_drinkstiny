import React, { useEffect, useState } from "react";

//pasar como prop algun parámetro para que haga el fetch cada vez que el modal lo llama
const Drink = ({
    campo
}) => {
    const [drink, setDrink] = useState(0)
    const [recipe, setRecipe] = useState (0)
    const [ingredients, setIngredients] = useState([])
    const [pic, setPic] = useState(0)

    useEffect (() => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then(data => {                
                setDrink(data.drinks[0].strDrink);            
                setRecipe(data.drinks[0].strInstructions);            
                setPic(data.drinks[0].strDrinkThumb);

                let strIngredientsArray = [];
                let ingredientsArray = []
                for (let i=0; i<16; i++) {
                    strIngredientsArray[i] = "strIngredient"+ (i+1);
                }
                // strIngredientsArray.forEach(element => {
                //     if (data.drink[0].element != null) {
                //         ingredientsArray.push(element)
                //     }
                // })
               
                setIngredients(strIngredientsArray)
                console.log("ingredientes",ingredientsArray)
            })
            .catch(err => console.log(err))
    }, [])
    
    const info = () => {
        if (campo === "title") {
            return {content : drink};
        };
        if (campo === "recipe") {
            return {content : recipe};
        }
        if (campo ==="pic"){
            return {content: <img src= {pic} alt="drink pic" width={150} height={150}/>}
        }
        if (campo ==="ingredients"){
            return {content : ingredients.map((element) => 
                <li> { element } </li>)}        
        }
    }

    return (
        <div>
            {info().content}
        </div>
    )
}

export default Drink;