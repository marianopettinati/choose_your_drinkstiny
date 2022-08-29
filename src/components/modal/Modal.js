import "./Modal.css";
import React, { useEffect, useState } from "react";

const Modal = ({isOpen,close}) => {
  const handleModalContainerClick = e => e.stopPropagation();

  //hago el fetch acá pq si lo hago en el componente Drink.js y lo llamo
  //repito el fetch cada vez que lo llamo 
  const [newDrink, setNewDrink] = useState (true);
  const [drink, setDrink] = useState(0);
  const [recipe, setRecipe] = useState (0);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState ([]);
  const [pic, setPic] = useState(0);

  useEffect (() => {
    if (newDrink) {
      setNewDrink(false)
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
          .then(response => response.json())
          .then(data => {                
              setDrink(data.drinks[0].strDrink);            
              setRecipe(data.drinks[0].strInstructions);            
              setPic(data.drinks[0].strDrinkThumb);

              let strIngredientsArray = [];
              let strMeasuresArray = [];
              let ingredientsArray = [];
              let measuresArray = [];

              for (let i=0; i<15; i++) {
                  strIngredientsArray[i] = "strIngredient"+ (i+1);
                  strMeasuresArray[i] = "strMeasure"+ (i+1);
              }
              strIngredientsArray.forEach(element => {                  
                  if (data.drinks[0][element] !== null) {
                      ingredientsArray.push(data.drinks[0][element])
                  }
              })       
              strMeasuresArray.forEach(element => {                  
                if (data.drinks[0][element] !== null) {
                    measuresArray.push(data.drinks[0][element])
                }
            })
             
              setIngredients(ingredientsArray);
              setMeasures(measuresArray);
              
          })
          .catch(err => console.log(err))
    }
  }, [newDrink]);

  const cheers = () => {
    setNewDrink(true);
    close();
  };
  
    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={cheers}>
          <div className="modal-container" onClick={handleModalContainerClick}>            
            
            <h2 className="modal-header">
              {drink}
            </h2>
           
           
              <div className="recipe">
                  {recipe}
                </div>
              <div className="modal-content"> 
                <div className="modal-ingredients"> 
                    {ingredients.map((element, index) => 
                        <li> {measures[index]} { element } </li>)
                    } 
                </div>
                <div className="drink-pic">
                  <img src= {pic} alt="drink pic" width={150} height={150}/>
                </div>
              </div>           
          


            <div className="modal-footer">
              <button className="modal-close"  onClick={cheers}> cheers! </button> 
            </div>
          </div>
        </article>
    );
  };


export default Modal;