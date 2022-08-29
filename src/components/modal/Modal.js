import "./Modal.css";
import React, { useEffect, useState } from "react";
import Drink from "../drink/Drink";

const Modal = ({isOpen,close}) => {
  const handleModalContainerClick = e => e.stopPropagation();

  //hago el fetch acá pq si lo hago en el componente Drink.js y lo llamo
  //repito el fetch cada vez que lo llamo 
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
              for (let i=0; i<15; i++) {
                  strIngredientsArray[i] = "strIngredient"+ (i+1);
              }

              strIngredientsArray.forEach(element => {
                  console.log("e-> ",element);                 
                  console.log("a->", data.drinks[0].element)
                  if (data.drinks[0].element !== null) {
                      ingredientsArray.push(data.drinks[0].element)
                  }
              })
             
              console.log("1", data.drinks[0].strIngredient1)
              console.log("2", data.drinks[0].strIngredient2)
              console.log("A", ingredientsArray)

              setIngredients(ingredientsArray)
            
          })
          .catch(err => console.log(err))
  }, [])
  



    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={close}>
          <div className="modal-container" onClick={handleModalContainerClick}>
            
            <h2 className="modal-header">
              {drink}
            </h2>

            <div className="recipe">
                {recipe}
              </div>
            
            <div className="modal-content"> 
              <div className="modal-ingredients"> 
                  {ingredients.map((element) => 
                      <li> { element } </li>)
                  }  
              </div>
              <div className="drink-pic">
                <img src= {pic} alt="drink pic" width={150} height={150}/>
              </div>
            </div>
            
            {/* <div className="modal-ingredients"> 
              <Drink campo="ingredients" />
            </div> */}

            <div className="modal-footer">
              <button className="modal-close" onClick={close}> cheers! </button> 
            </div>

          </div>
        </article>
    );
  };


export default Modal;