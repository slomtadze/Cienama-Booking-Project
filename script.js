const seatsContainer = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat');
//const seatsAvialable = document.querySelectorAll('.row .seat:not(.occupied)');
const movie = document.getElementById('movie');
let currentCount = document.getElementById('count');
let currnetTotalPrice = document.getElementById('totalprice');
let finalCount = document.getElementById('final-count');
let finalTotalPrice = document.getElementById('final-totalprice');

let addToListBtn = document.querySelector('.addlist');
let clearListBtn = document.querySelector('.clearlist')
let ticketPrice = +movie.value;
let seatNumber = new Array;

let Ticket = function (movieName, seatNumberInrow, seatNumber, ticketPrice){
    this.movieName = movieName,
    this.row = Math.ceil(seatNumber / seatNumberInrow),
    this.seatNumber = seatNumber,
    this.ticketPrice = parseInt(ticketPrice)
};

function CreateTicketObject(){
    let selectedSeatObjects = seatNumber.map(el => {
        let ticket = new Ticket(getMovieName(), 10, el, ticketPrice)
        return ticket
    });
    return selectedSeatObjects;    
};



function CreateHtmlTicket (obj){
        let ticketContainer = document.querySelector('.ticket-container-list'); 
        let ticketTemplate =  document.createElement('Div');
            ticketContainer.appendChild(ticketTemplate);
            ticketTemplate.classList.add('template');

function createDivElement (divClassName, spanText, h2Text){ 
        let div =  document.createElement('Div');
            ticketTemplate.appendChild(div);
            div.classList.add(divClassName);
        let span= document.createElement('span');
            div.appendChild(span);
            span.textContent = spanText;
        let h2 = document.createElement('h2');
            div.appendChild(h2);
            h2.textContent = h2Text;    
}

    createDivElement('title', 'Movie Name', obj.movieName); 
    createDivElement('rowNumber', 'Row', obj.row);
    createDivElement('seatNumber', 'Seat', obj.seatNumber)
    createDivElement('ticketprice', 'Price', obj.ticketPrice)
};


function getMovieName(){
    return movie[movie.selectedIndex].innerText.split(' $')[0];
};

function updateCount(){
    let seatsSelected = [...document.querySelectorAll('.row .seat.selected')];
    currentCount.textContent = seatsSelected.length;
    currnetTotalPrice.textContent =`$ ${seatsSelected.length * parseInt(movie.value)}`;
    seatNumber = seatsSelected.map(el => [...seats].indexOf(el) + 1);
};

movie.addEventListener('change',(e) => {
    ticketPrice = e.target.value;
    updateCount();
});

seatsContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected')
    };
    updateCount();
})

addToListBtn.addEventListener('click', (e) => {
    //updateCount();
    CreateTicketObject().map(el => {
        CreateHtmlTicket(el);
    });
    let seatsSelected = [...document.querySelectorAll('.row .seat.selected')];
    seatsSelected.map(el => {
        if(el.classList.contains('selected')){
            el.classList.remove('selected')
            el.classList.add('reserved')
        }         
    })
    finalCount.textContent = parseInt(finalCount.textContent) + parseInt(currentCount.textContent);
    finalTotalPrice.textContent =parseInt(finalTotalPrice.textContent) + parseInt(currnetTotalPrice.textContent.substring(2))
    updateCount()
})

clearListBtn.addEventListener('click', (e) => {
    let ticketsInList = [...document.querySelectorAll('.template')];
            ticketsInList.map((e) => {
                e.remove()  
            });
    let seatsResrved = [...document.querySelectorAll('.row .seat.reserved')];
            seatsResrved.map((e) => {
                e.classList.remove('reserved')
            });
        finalCount.textContent = 0;
        finalTotalPrice.textContent = 0;

})





