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

//Ticket Functions

class Ticket {
    constructor(movieName, seatNumberInrow, seatNumber, price){
        this.movieName = movieName,
        this.row = Math.ceil(seatNumber / seatNumberInrow),
        this.seatNumber = seatNumber,
        this.price = parseInt(ticketPrice) 
    }
}
let ticketsArray = []
function createTickets(){
    seatNumber.map(el => {
        let ticket = new Ticket(getMovieName(), 10, el, ticketPrice)
        ticketsArray.push(ticket)
        
    });
     
};

//Ticket page buttons

const createButton = (page, type) => {
    return `
    <button class="${type}" data-goto="${type === 'prev' ? page - 1 : page + 1}">
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>    `
}

const renderButton = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button = '';
    if(page ===1 && pages > 1){
        button = createButton(page, 'next');
    }else if(page < pages){
        button = `
            ${createButton(page, 'prev')}
            ${createButton(page, 'next')}
        `;
    }else if(page === pages && page > 1){
        button = createButton(page, 'prev')
    };
    document.querySelector(".page-buttons").insertAdjacentHTML('afterbegin', button);
}

//Ticket page render functions

const renderPage = (tickets, ticketsPerPage = 2, page = 1) => {

    document.querySelector(".ticket-container-list").innerHTML='';
    document.querySelector(".page-buttons").innerHTML='';

    const start = (page - 1) * ticketsPerPage;
    const end = page * ticketsPerPage;

    tickets.slice(start,end).forEach(renderTicket);
    renderButton(page, ticketsArray.length, ticketsPerPage)
}

const renderTicket = (ticket) => {
    const markUp =  `<div class="template">
                        <div class="title">
                            <span>Movie Name</span>
                            <h2>${ticket.movieName}</h2>
                        </div>
                        <div class="rowNumber">
                            <span>Row</span>
                            <h2>${ticket.row}</h2>
                        </div>
                        <div class="seatNumber">
                            <span>Seat</span>
                            <h2>${ticket.seatNumber}</h2>
                        </div>
                        <div class="ticketprice">
                            <span>Price</span>
                            <h2>${ticket.price}</h2>
                        </div>
                    </div>`

    document.querySelector('.ticket-container-list').insertAdjacentHTML('beforeend',markUp);
    
};

//Seat Select Section

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


// Add to the list button


const totalSumUpdate = () => {
    finalCount.textContent = parseInt(finalCount.textContent) + parseInt(currentCount.textContent);
    finalTotalPrice.textContent =parseInt(finalTotalPrice.textContent) + parseInt(currnetTotalPrice.textContent.substring(2))
}
const reserveTickets = () => {
    let seatsSelected = [...document.querySelectorAll('.row .seat.selected')];
    seatsSelected.map(el => {
        if(el.classList.contains('selected')){
            el.classList.remove('selected')
            el.classList.add('reserved')
        }         
    })
}


addToListBtn.addEventListener('click', (e) => {
    createTickets()
    renderPage(ticketsArray);
    reserveTickets()
    totalSumUpdate()    
    updateCount()
})

// Clear Button 

const removeTickets = () => {
    let ticketsInList = [...document.querySelectorAll('.template')];
        ticketsInList.map((e) => {
            e.remove()  
        });
}
const clearReservedList = () => {
    let seatsResrved = [...document.querySelectorAll('.row .seat.reserved')];
        seatsResrved.map((e) => {
            e.classList.remove('reserved')
        });
    ticketsArray = [];
}
const resetTotalSum = () => {
    finalCount.textContent = 0;
    finalTotalPrice.textContent = 0;
}
clearListBtn.addEventListener('click', (e) => {
    removeTickets()
    clearReservedList()
    resetTotalSum()    
})







