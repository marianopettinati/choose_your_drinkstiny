import "./Modal.css";
import Drink from "../drink/Drink";

const Modal = ({isOpen,close}) => {
  const handleModalContainerClick = e => e.stopPropagation();
    return (
        <article className={`modal ${isOpen && "is-open"}`} onClick={close}>
          <div className="modal-container" onClick={handleModalContainerClick}>
            
            <h2 className="modal-header">
              <Drink campo="title"/>
            </h2>

            <div className="modal-content"> 
              <div className="recipe">
                <Drink campo="recipe" />
              </div>
              <div className="drink-pic">
                <Drink campo="pic" />
              </div>
            </div>
            
            <div className="modal-ingredients"> 
              <Drink campo="ingredients" />
            </div>

            <div className="modal-footer">
              <button className="modal-close" onClick={close}> cheers! </button> 
            </div>

          </div>
        </article>
    );
  };


export default Modal;