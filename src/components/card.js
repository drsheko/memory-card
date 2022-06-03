import React ,{useState} from 'react';

export default  function Card ({
    imgSrc ,
    
    incrementScore,
    resetCardStatus,
    resetScore,
    shuffleCards }) {
    const [ clicked , setClicked] = useState(false) ;
    
    const handleCardClick = () =>{
        if (clicked === false){
            setClicked(true) ;
            incrementScore()
        }
        else {
            resetCardStatus() ;
            resetScore()
        }
        shuffleCards()
    }
    return (
        <div  onClick={handleCardClick}>
            <div></div>
            <img  src={imgSrc} alt={imgSrc} width={120} height = {95}/>
        </div>
    )

}
