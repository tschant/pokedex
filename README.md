# Pokedex 

## Made With:
* [PokeApi](https://pokeapi.co/) and the node-ts wrapper: [pokenode-ts](https://github.com/Gabb-c/pokenode-ts)
* [NextJS](https://nextjs.org) 
* [TailwindCSS](https://tailwindcss.com/)
* [React-query](https://tanstack.com)
* eslint + prettier for code standards 


## Running 
* Clone repo 
* Run `npm i`
* Run `npm run dev` for dev work/modifying code 
* or Run `npm run build` and then `npm run start`


## Working 
* Grid view of all pokemon (paged)
* Search of pokemon opening into a detailed view
* history of viewed pokemon is in browser history as each pokemon is a new "page"

## TO-DO 
* Tests using Cypress
* Add moves to details pokemon display
* Update search for fuzzy searching -> 'gron' -> 'Aggron'
* Create a cache of recently searched pokemon using localstorage and that to suggestion list
* Add in error handling when searching for invalid pokemon - better error handling then plain message
* Fix Evolution request and display
* Limitations due to the API:
  * Update search to be able to search other attributes 
  * Add in ability to filter pokemon
