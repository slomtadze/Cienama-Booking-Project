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

function createTickets(){
    let reservedTickets = seatNumber.map(el => {
        let ticket = new Ticket(getMovieName(), 10, el, ticketPrice)
        return ticket
    });
    return reservedTickets;    
};

const renderPage = (tickets, ticketsPerPage) => {
    const totalPages = Math.ceil(tickets / ticketsPerPage);
    const page = tickets.slice(0,ticketsPerPage);

    return page

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
    
}
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

//Seat Select Section

seatsContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied') && !e.target.classList.contains('reserved')){
        e.target.classList.toggle('selected')
    };
    updateCount();
})

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

//Add to the list button

addToListBtn.addEventListener('click', (e) => {

    renderPage(createTickets(), 6).forEach(renderTicket);
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

/* 
<div class="template">
<div class="title">
<span>Movie Name</span>
<h2>Avengers: Endgame</h2>
</div>
<div class="rowNumber">
<span>Row</span>
<h2>3</h2>
</div>
<div class="seatNumber">
<span>Seat</span>
<h2>25</h2>
</div>
<div class="ticketprice">
<span>Price</span>
<h2>10</h2>
</div>
</div>
 */





