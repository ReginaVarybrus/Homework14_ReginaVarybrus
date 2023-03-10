'use strict';

const personagesList = document.getElementById('personages-list');
const outsideSpace = document.getElementsByTagName('body');
const btnPrev = document.getElementById('previous');
const btnNext = document.getElementById('next');

let numPage = document.getElementById('page');

function dataOutput(data) {
    personagesList.innerHTML = "";
    for (let items of Object.values(data)) {
        if (Array.isArray(items)) {
            Object.values(items).forEach(val => {  
                
                let div = document.createElement('div');
                let ul = document.createElement('ul');
                let li_0 = document.createElement('li');
                let li_1 = document.createElement('li');
                
                li_0.innerText = 'name: ' + val.name;
                li_1.innerText = 'status: ' + val.status;

                div.classList.add('div__item');
                
                div.appendChild(ul);
                ul.appendChild(li_0);
                ul.appendChild(li_1);
                
                personagesList.appendChild(div);
            });
        }
    }  
}

let page = `https://rickandmortyapi.com/api/character?page=1`;
let state = null;

async function getData (pageUrl) {
    const responce = await fetch(pageUrl);
    const data = await responce.json();
    state = data;
    dataOutput(data);
}
getData(page);

function pagination (pageUrl) {
    const urlParams = new URL(pageUrl);
    const currentPage = urlParams.searchParams.get('page');
    numPage.innerHTML = currentPage;
    btnNext.disabled = false;
    btnPrev.disabled = true;
    if (currentPage > 1) {
        btnPrev.disabled = false;
    }
    if (currentPage == 42) {
        btnNext.disabled = true;
    } 
    return numPage.innerHTML;
}

btnNext.addEventListener('click', () => {
    page = state.info.next;
    getData(page);
    pagination(page);
    // console.log('page number', pagination(page));
    // console.log('state next', state);
});

btnPrev.addEventListener('click', () => {
    page = state.info.prev;
    getData(page);
    pagination(page);
    // console.log('page number', pagination(page));
    // console.log('state prev', state);
});




    

 

  


