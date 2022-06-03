import React ,{useState, useEffect}from "react";
import { ReactDOM } from "react";
import Card from "./card";
import _ from "lodash";

//const images = require.context('/src/img')
//const imagePath = (name)=>images(name ,true)




export default function Photos (){


    const [score , setScore] = useState(0) ;
    const [imagesList , setImagesList] = useState([]);
    const [bestScore , setBestScore] =useState(0)
    const [imgSrc , setImgSrc] = useState([]);
    const [cardKey ,setCardKey] =  useState(0)
    const [search , setSearch] = useState('')
    const [link , setLink] = useState('')

    const shuffleCards = () =>{
        setImagesList(_.shuffle(imagesList))
    }
   
  
    
    const incrementScore = () => {
        setScore(score + 1)
    }
    const resetScore = () => {
        setScore(0);
        alert('game over')
    }

    const resetCardStatus = () =>{
        setCardKey(cardKey +1)
    }

    useEffect( ()=>{
        if (bestScore< score){
            setBestScore(score)
        }
    },[score])

    
    const handleSearch =(e) =>{
         let text = e.target.value ;
         setSearch(text)
         
        
        
       
    }

    useEffect(()=>{
        
        let searchURL = `https://pixabay.com/api/?key=27818144-b35666e63fd37e75787508770&q=${search}&image_type=photo`
        setLink(searchURL)
        
    },[search])

    const handleConfirm = () =>{
        receiveData()
    } 

    const receiveData =async () =>{
        console.log(link)
     try{
       const response = await fetch(link,{mode:'cors'})
       const  photoData = await response.json()
        const dataArr = [] 
       photoData.hits.map((hit)=>{
                dataArr.push(hit.webformatURL)
            
       })
         setImagesList(dataArr)
        console.log(dataArr[1])
     }
     catch{}
    }



    return (<div>


              <input  type="text" className="search"  onChange={handleSearch} />
              <button type="button "  onClick={handleConfirm} >Confirm</button> 
            <div>score :{score}  best Score : {bestScore}</div>
            <div >
            {imagesList.map(ele =>
              < Card 
              incrementScore={incrementScore}
              shuffleCards={shuffleCards}
              resetCardStatus = {resetCardStatus}
              resetScore = {resetScore}

              imgSrc={ele}
              key = {ele }/>  
                
                
                )}
            </div>
    </div>)

            
}
