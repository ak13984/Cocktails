import React,{useEffect,useState} from 'react'
import {useParams, Link} from "react-router-dom"




export default function SingleCocktail() {
    
const {number}=useParams();

const [loading,setLoading]=useState(false);
const [cocktail,setCocktail]=useState(null);

const getInfo = async () =>{

const resp = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${number}`
);    
const data=await resp.json();

if(data.drinks){

const {
	strDrink,
    strAlcoholic,
	strDrinkThumb,
	strGlass,
	strCategory,
	strInstructions,
	strIngredient1,
	strIngredient2,
	strIngredient3,
	strIngredient4
} = data.drinks[0];

const newCocktail = {
	name: strDrink,
	image: strDrinkThumb,
	ingredients: [
		strIngredient1,
		strIngredient2,
		strIngredient3,
		strIngredient4
	],
	category: strCategory,
	instrs: strInstructions,
	glass: strGlass,
	info: strAlcoholic,
};

setCocktail(newCocktail);
console.log(cocktail, newCocktail, strDrink, strDrinkThumb);
}else{
setCocktail(null);
}

setLoading(false);
}

useEffect(()=>{
    setLoading(true);
getInfo();
},[number])

if(loading){
    return <h2 className="section-title">Loading...</h2>
}

if(!cocktail){
    return <h2 className="section-title">no cocktail to display</h2>
}else{

    // console.log(loading);
const {name,image,category,info,instrs,ingredients}=cocktail;

return (
	<section className="section cocktail-section">
		<Link to="/" className="btn btn-primary">
			Back Home
		</Link>
		<h2 className="section-title">{name}</h2>
		<div className="drink">
			<img src={image} alt={name} />
			<div className="drink-info">
				<p>name: {name}</p>
				<p>category: {category}</p>
				<p>info: {info}</p>
				<p>instructions: {instrs}</p>
                <p>
                    ingredients: {
                        ingredients.map((item,index)=>{
                            return item?<span key={index}>{item}</span>:null;
                        })
                    }
                </p>
			</div>
		</div>
	</section>
);
}

}
