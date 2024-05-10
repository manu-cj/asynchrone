const body = document.querySelector('body');
let inputText = document.createElement('input');
const submit = document.createElement('input');


inputText.type = 'text';
inputText.setAttribute = 'required';
submit.type = 'submit';

body.appendChild(inputText);
body.appendChild(submit);




let pokeName = '';

let section = document.createElement('section');

async function getName(name) {
    section.innerHTML = "";
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/${name}`)
    .then(response => {
        console.log("Making the request:", response);

        if (!response.ok) {
            // Si la réponse n'est pas OK (status >= 400), lance une erreur avec le statut de la réponse
            throw new Error('Erreur ' + response.status);
        }
        if (response.status === 500) {
            console.log(response.status);
            inputText.setCustomValidity("Ce pokèmon n'existe pas");
        }

        
        return response.json();
    })
    .then(data => {
        let datas = data.name;

        const article = document.createElement('article');
        const divImg = document.createElement('div');
        const divName = document.createElement('div');
        const nameData = document.createElement('h2');
        

        divImg.style.backgroundImage = `url(${data.image})`;
        divImg.style.backgroundSize = 'cover';
        nameData.textContent = data.name;

        article.style.width = '300px';
        article.style.height = '400px';
        article.style.border = '2px teal solid';
        article.style.borderRadius = '15px';

        divImg.style.width = '100%';
        divImg.style.height = '80%';

        section.style.display = 'flex';
        section.style.flexDirection = 'row';
        section.style.justifyContent = 'space-around';
        section.style.flexWrap = 'wrap';

        body.appendChild(section);
        section.appendChild(article);
        article.appendChild(divImg);
        article.appendChild(divName);
        divName.appendChild(nameData);

        console.log(datas);
        // Traiter les données ici
    })
    .catch(error => {
        // Afficher un message d'erreur à l'utilisateur en fonction du code d'erreur
        if (error === 500) {
            inputText.setCustomValidity("Ce pokèmon n'existe pas");
        }
        inputText.setCustomValidity("Ce pokèmon n'existe pas");
        console.error("There was an error!", error);
    });
}

submit.addEventListener('click', () => {
    getName(inputText.value);
})


let allPokemon = [];
let collectName = [];

function getPokename() {
    fetch(`https://pokebuildapi.fr/api/v1/pokemon/`)
    .then(response => {
        console.log("Making the request:", response);

        if (!response.ok) {
            // Si la réponse n'est pas OK (status >= 400), lance une erreur avec le statut de la réponse
            throw new Error('Erreur ' + response.status);
        }
        if (response.status === 500) {
            console.log(response.status);
            inputText.setCustomValidity("Ce pokèmon n'existe pas");
        }

        
        return response.json();
    })
    .then(datas => {
        console.log(datas);
        allPokemon= datas;
        datas.forEach(data => {
            collectName.push(data.name);
            console.log(collectName);
            
        });

    }).catch(error => {
        console.log(error);
    })
}



getPokename();

let sectionPokeTri = document.createElement('section');
body.appendChild(sectionPokeTri);

const ul = document.createElement('ul');
body.appendChild(ul);
inputText.addEventListener('keyup', () => {
    pokeName = inputText.value;
    ul.innerHTML = '';
    let result = collectName.filter((word) => word.includes(pokeName.charAt(0).toUpperCase() + pokeName.slice(1)));
    console.log(result.length);
    sectionPokeTri.innerHTML = "";
    result.forEach(nom => {
        section.remove();

        let li = document.createElement('li');
        li.innerText = nom;

        li.style.listStyleType = 'none';
        li.style.borderBottom = '1px grey solid';
        li.style.width = '250px';
        li.style.borderRadius = '15px';
        ul.style.border = '1px black solid';
        ul.style.borderRadius = '15px';
        ul.style.width = '250px';
        ul.style.textAlign = 'center';
        
        ul.appendChild(li);
        li.addEventListener('click', () => {
            pokeName = li.textContent;
            inputText = li.textContent;
            getName(li.textContent);
            console.log(pokeName);
        })

        

        // getName(nom);

        

    });
    
    console.log(result);


    
})


