const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonWeight = document.querySelector('.pokemon__weight');
const pokemonHeight = document.querySelector('.pokemon__height');
const pokemonType1 = document.querySelector('.pokemon__type1');
const pokemonType2 = document.querySelector('.pokemon__type2');





const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;
let type2 = pokemonType2
 

const fetchPokemon = async (pokemon) =>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;

    }
    
}

const renderPokemon = async (pokemon) => {

pokemonName.innerHTML = 'Loading...' 
    
const data = await fetchPokemon(pokemon);

    if(data){
         
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src= data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonHeight.innerHTML = `Altura: ${ data.height/10}m`;
        pokemonWeight.innerHTML = `Peso: ${data.weight/10}kg`;
        pokemonType1.innerHTML = data['types']['0']['type']['name'];
        if(data['types']['1']){
            pokemonType2.innerHTML = `/ ${data['types']['1']['type']['name']}`;
        }else{
            pokemonType2.innerHTML = '';
        }
        
        
        

        input.value = '';
        searchPokemon = data.id;
    }else{
        pokemonImage.src = "./Imagens/int.png"
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
        pokemonHeight.innerHTML = `Altura:???`;
        pokemonWeight.innerHTML = `Peso:???`;
        
    }
   
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase( ));
    
});

buttonPrev.addEventListener('click', () => {
   if(searchPokemon > 1){
        searchPokemon -=1;
        renderPokemon(searchPokemon);
   }
    
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);