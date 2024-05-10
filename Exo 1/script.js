const button = document.createElement('button');
const body = document.querySelector('body');


button.textContent = "Click me boy";
body.appendChild(button);
dataPading = 0;
button.style.cursor = 'pointer';

button.addEventListener('click', () => {
    button.textContent = "Oh yeah again !";
    dataPading += 5;
    button.style.paddingRight = `${dataPading}px`;
    const request = fetch("db.json");
    console.log("Making the request:", request);
    const response = request.then((response) => response.text());
    console.log("Treating the response", response);
    
    response.then((datas) => {
        console.log(datas);
        let searchUl = document.querySelectorAll('ul');
        searchUl.forEach(ulFind => {
            ulFind.remove()
        });
        let ul = document.createElement('ul');
        let arrays = [JSON.parse(datas)];
        console.log(arrays);

        body.appendChild(ul);
        console.log(arrays[0].members.length);
        let liTeams = document.createElement('li');
        let homeTownData = document.createElement('li');
        let dateCreationData = document.createElement('li');
        let secretBaseData = document.createElement('li');

        liTeams.textContent = arrays[0].squadName;
        homeTownData.textContent = arrays[0].homeTown;
        dateCreationData.textContent = arrays[0].formed;
        secretBaseData.textContent = arrays[0].secretBase;

        
        setTimeout(() => {
            button.textContent = "Click me again boy";
        }, 1000);
        
        ul.appendChild(liTeams);
        ul.appendChild(homeTownData);
        ul.appendChild(dateCreationData);
        ul.appendChild(secretBaseData);
        
        for (let i = 0; i < arrays[0].members.length; i++) {
            
            
            let members = arrays[0].members[i];
            let ul = document.createElement('ul');

            let liName = document.createElement('li');
            let liAge = document.createElement('li');
            let liSecretIdentity = document.createElement('li');


            liName.textContent = `Nom :  ${members.name}`;
            liAge.textContent = `${members.age} ans`;
            liSecretIdentity.textContent = `Identité secrète ${members.secretIdentity}`;
            let liPowers = document.createElement('li');

            
            
            liPowers.textContent = `Powers : `;
            for (let i = 0; i < members.powers.length; i++) {
                let pPowers = document.createElement('p');
                liPowers.textContent += members.powers[i] + ", ";
                
            }
           

            body.appendChild(ul);
            ul.appendChild(liName);
            ul.appendChild(liAge);
            ul.appendChild(liSecretIdentity);
            ul.appendChild(liPowers);
            
        }
        
    });
    
})


