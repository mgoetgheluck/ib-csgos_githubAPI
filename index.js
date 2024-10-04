const requeteGithub = function(){
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
};

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

const creerCompteButtonHandler = function(e){
    //Removing children of errorLoginContainer
    const errorLoginContainer = document.querySelector(".errorLoginContainer");
    clearContainer(errorLoginContainer);

    // Removing children of successLoginContainer
    const successLoginContainer = document.querySelector(".successLoginContainer");
    clearContainer(successLoginContainer);

    
    console.log("creerCompteButtonHandler", e);
    const login = document.querySelector("#login").value;
    console.log("creerCompteHandler", login);
    const password = document.querySelector("#password").value;
    console.log("creerCompteHandler", password);
    let isAccepted = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/.test(password);
    if(isAccepted){
        localStorage.setItem("login", login);
        localStorage.setItem("password", password);

        const successNode = createSuccessNode("Votre compte a bien été créé.");
        successLoginContainer.appendChild(successNode);
    }
    else {
        

        if(!/[A-Z]+/.test(password)) {
            needMajuscules = true;
            const errorNode = createErrorNode("Votre mot de passe doit contenir des majuscules.");
            errorLoginContainer.appendChild(errorNode);
        }
        if(!/[a-z]+/.test(password)){
            const errorNode = createErrorNode("Votre mot de passe doit contenir des minuscules.");
            errorLoginContainer.appendChild(errorNode);
        }
        if(!/^(?=.*?[0-9])$/.test(password)){
            const errorNode = createErrorNode("Votre mot de passe doit contenir des nombres.");
            errorLoginContainer.appendChild(errorNode);
        }
        if(password.length < 8){
            const errorNode = createErrorNode("Votre mot de passe doit contenir au moins 8 caractères.");
            errorLoginContainer.appendChild(errorNode);
        }
    }
}

const loginButtonHandler = function(e){
    //Removing children of errorLoginContainer
    const errorLoginContainer = document.querySelector(".errorLoginContainer");
    clearContainer(errorLoginContainer);
    // Removing children of successLoginContainer
    const successLoginContainer = document.querySelector(".successLoginContainer");
    clearContainer(successLoginContainer);


    const checkLogin = localStorage.getItem("login");
    console.log("localstorage", checkLogin);
    const checkPassword = localStorage.getItem("password");
    const login = document.querySelector("#login").value;
    const password = document.querySelector("#password").value;

    if(checkLogin == login && checkPassword == password){
        allowAccess();
    }
    else {
        const errorNode = createErrorNode("Votre login n'est pas correct.");
        errorLoginContainer.appendChild(errorNode);
    }

}

const allowAccess = function() {
    document.querySelector(".loginContainer").style.display = "none"
    requeteGithub();
}

const createErrorNode = function(errorMessage){
    const errorNode = document.createElement('div');
    const errorMessageNode = document.createElement("span");
    errorMessageNode.innerHTML = errorMessage;
    errorNode.appendChild(errorMessageNode);

    return errorNode;
}

const createSuccessNode = function(successMessage){
    const successNode = document.createElement('div');
    const successMessageNode = document.createElement("span");
    successMessageNode.innerHTML = successMessage;
    successNode.appendChild(successMessageNode);

    return successNode;
}

clearContainer = function(container){
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
}