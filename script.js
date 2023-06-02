document.addEventListener('DOMContentLoaded', () => {
    let quantidade = document.getElementById('quantidade');
    quantidade.addEventListener('keyup', () => {
        pegaPokemons(quantidade.value);
    })

    const pegaPokemons = (quantidade) => {

        fetch(`https://pokeapi.co/api/v2/pokemon?limit=${quantidade}`)
            .then(response => response.json())
            .then(aLLpokemon => {

                const pokemons = [];

                aLLpokemon.results.map((val) => {

                    fetch(val.url)
                        .then(response => response.json())
                        .then(pokemonSingle => {

                            pokemons.push({ nome: val.name, imagem: pokemonSingle.sprites.front_default })

                            if (pokemons.length == quantidade) {

                                var pokemonBoxes = document.querySelector('.pokemon-boxes');
                                pokemonBoxes.innerHTML = "";

                                pokemons.map((vaL) => {
                                    pokemonBoxes.innerHTML += `
                            
                            <div class="pokemon-box">
                            <img src="${vaL.imagem}" alt="" />
                            <p>${vaL.nome}</p>
                            </div><!--pokemon-box-->
                            
                            `;

                                });
                            }
                        });
                });
            });
    }
    pegaPokemons(3);
});

