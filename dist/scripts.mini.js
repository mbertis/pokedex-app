let pokemonRepository=function(){let t=[],e="https://pokeapi.co/api/v2/pokemon/?limit=150";function n(e){return t.push(e)}function o(t){i(t).then(function(){let e=$(".modal-body"),n=$(".modal-title");n.empty(),e.empty();let o=$("<h1>"+t.name+"<h1>"),i=$("<img class = 'modal-image' style = 'width:38%'>");i.attr("src",t.imageUrl);let l=$("<p>Height: "+t.height+"</p>"),a=$("<p>Type(s): "+t.types+"</p>");n.append(o),e.append(i),e.append(l),e.append(a)})}function i(t){let e=t.detailsUrl;return fetch(e).then(function(t){return t.json()}).then(function(e){t.imageUrl=e.sprites.front_default,t.height=e.height,t.types=[],e.types.forEach(function(e){t.types.push(e.type.name)})}).catch(function(t){console.error(t)})}return{add:n,getAll:function(){return t},showDetails:o,addListItem:function(t){let e=document.querySelector(".pokemon-list"),n=document.createElement("li"),i=document.createElement("button");i.innerText=t.name,i.classList.add("btn-outline-info"),i.setAttribute("data-toggle","modal"),i.setAttribute("data-target","#pokemonModal"),n.appendChild(i),n.classList.add("group-list-item"),n.classList.add("list"),e.appendChild(n),i.addEventListener("click",function(){o(t)})},loadList:function(){return fetch(e).then(function(t){return t.json()}).then(function(t){t.results.forEach(function(t){n({name:t.name,detailsUrl:t.url})})}).catch(function(t){console.error(t)})},loadDetails:i}}();function search(){let t,e,n,o,i,l,a;for(e=(t=document.getElementById("myInput")).value.toUpperCase(),o=(n=document.getElementById("myUL")).querySelectorAll(".list"),l=0;l<o.length;l++)(a=(i=o[l].getElementsByTagName("button")[0]).textContent||i.innerText).toUpperCase().indexOf(e)>-1?o[l].style.display="":o[l].style.display="none"}pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});