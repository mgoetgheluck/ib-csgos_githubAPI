(function(){
    console.log("REQ START");
    var req = new XMLHttpRequest();
    req.open('GET', 'https://api.github.com/users?per_page=8');
    req.addEventListener('load', function(){
        console.log("res", this.responseText);
        
        if(req.status >= 200 && req.status < 400) {
            handleResponse(this.responseText);
        }
    });

    req.send();
})();

const handleResponse = function(responseString) {
    console.log("handleResponse", responseString);
    const response = JSON.parse(responseString);
    if(response != null && typeof response != "undefined"){
        console.log("handleResponse not null", response);
        for(user of response){
            console.log("user", user);
            createGitHubUserCard(user);
        }
    }

}

const createGitHubUserCard = function(user){
        console.log("createGitHubUserCard", user);
    
        const divCard = document.createElement("div");
        divCard.className = "card";
        const firstContainer = document.createElement("div");
        firstContainer.className = "firstContainer";
        const descriptionContainer = document.createElement("div");
        descriptionContainer.className = "descriptionContainer";

        //Login container
        const loginContainer = document.createElement("div");
        const loginSpan = document.createElement("span");
        loginSpan.innerHTML = user.login;
        loginContainer.appendChild(loginSpan);

        //Appending to firstContainer
        firstContainer.appendChild(loginContainer);
        
        if(user.avatar_url){
            const imageContainer = document.createElement("div");
            imageContainer.className = "imageContainer";
            const image = document.createElement("img");
            image.setAttribute("src", user.avatar_url);
            image.setAttribute("alt", "image of "+user.login);
            image.setAttribute("width", "150px");
            imageContainer.appendChild(image);
            firstContainer.appendChild(imageContainer);
        }
        
        //Description
        const descriptionSpan = document.createElement("span");
        user.description ? descriptionSpan.innerHTML = user.description : descriptionSpan.innerHTML = "Pas de description accessible";
        descriptionContainer.appendChild(descriptionSpan);

        

        divCard.appendChild(firstContainer);
        divCard.appendChild(descriptionContainer);
        const root = document.querySelector("#root");
        root.appendChild(divCard);

}