const formulaire    = document.querySelector('.formulaire');
const info          = document.querySelector('.info');
const resultat      = document.querySelector('.affiche');
const btns          = document.querySelectorAll('button');
const inputs        = document.querySelectorAll("input");
let dejaFait        = false;

const today = new Date();
const nextWeek = new Date(today.getTime()+ 7*24*60*60*1000);
let day = ('0' + nextWeek).slice(9,11);
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let year = today.getFullYear();


document.querySelector('input[type=date]').value = `${year}-${month}-${day}`;

btns.forEach(btn=>{
    btn.addEventListener('click',btnAction);
})

function btnAction(e){
    e.preventDefault();
    let nvObj ={};

    inputs.forEach(input =>{

        let attrName    = input.getAttribute('name');
        let attrValeur  = attrName !== "cookieExpire"? input.value : input.valueAsDate;
        nvObj[attrName] = attrValeur;

    });
    // console.log(nvObj);
    let description = e.target.getAttribute('data-cookie');

    if(description === "creer"){

        creerCookie(nvObj.cookieName,nvObj.cookieValue,nvObj.cookieExpire);

    }
    else if (description === "toutAfficher"){

        listeCookiees();

    };
};


function creerCookie(nom,valeur,date){


    info.innerText="";
    resultat.childNodes.forEach(child=>{
        child.remove();
    })
    let cookies = document.cookie.split(';');
    cookies.forEach((cookie)=>{

        cookie=cookie.trim();
        let formatCookie = cookie.split('=');
        if( formatCookie[0] === encodeURIComponent(nom)){
            dejaFait = true;
        }

    });

    if(dejaFait){

        info.innerText = "un Cookie possède deja ce nom!"
        dejaFait=false;
        return;

    };


    if(nom.length === 0){

        info.innerText = 'impossible de definir un cookie sans nom';
        info.style.color='red';
        return;

    }

    document.cookie = `${encodeURIComponent(nom)}=${encodeURIComponent(valeur)}; expires=${date.toUTCString()}`;

    let inFo  = document.createElement("li");
    inFo.innerText = `Cookie ${nom} créé !`;
    info.appendChild(inFo);

    setTimeout(()=>{
        inFo.remove();
    },2000);

};


// creerCookie()
function listeCookiees(){

    let cookies = document.cookie.split(';');
    if(cookies.join() === ''){
        info.innerText = 'pas de cookies à afficher';
        return;
    }
    cookies.forEach(cookie =>{
        cookie =cookie.trim();
        let formatCookie = cookie.split('=');
        console.log(formatCookie);
        const display = document.createElement("li");
        const delet     = document.createElement("button");
        delet.textContent = 'supprimer';
        const p = document.createElement('p');
        p.innerText         = 'Nom :'+ formatCookie[0];
        const p2 = document.createElement('p');
        p2.innerText        = 'Valeur :' +formatCookie[1];
        display.appendChild(p);
        display.appendChild(p2);
        display.appendChild(delet);
        resultat.appendChild(display);
        
        delet.addEventListener('click',()=>{
            document.cookie = `${formatCookie[0]}=; expires=${new Date(0)}`;
            display.textContent =`Cookie ${formatCookie[0]} supprimé`;
            display.style.background='#74D0F1';
            setTimeout(()=>{
                display.remove();
            },1500);
        });
    }); 
}; 