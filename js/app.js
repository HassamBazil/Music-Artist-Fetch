
const form = document.getElementById('form') // Declaring necesaary constants in order to manipulate the html page
const icon = document.getElementById('header-icon')
const search = document.getElementById('search')
const result = document.getElementById('artist-info')
const artist_events = document.getElementById('artist-events')
const backBtn = document.getElementById('back');
const apiURL = 'https://rest.bandsintown.com' // base API URL to work around
const app_id = "abc"
var artist = ""

form.addEventListener('submit', e => { // Adding submit to form to retreive the value typed by the user
    e.preventDefault();
    let searchValue = search.value.trim(); // getting rid of extra spaces
    searchValue = validateSearchValue(searchValue); 

    if (!searchValue) { // CHecking if user has typed anything
        alert("There is nothing to search") 
    }
    else {
        searchArtist(searchValue)
    }
})
// Checking and replacing characters specified by the API documentations
const validateSearchValue = (value) => { 

    if (value.includes('?')) {
        value = value.replace("?", "%253F");
    }
    if (value.includes('/')) {
        value = value.replace("/", "%252F");
    }
    if (value.includes('*')) {
        value = value.replace("*", "%252A");
    }
    if (value.includes('\\')) {
        value = value.replace("\\", "%27C");
    }

    return value;
}


const searchArtist = async (searchValue) => { // Looking for the artist from the API

    const searchResult = await fetch(`${apiURL}/artists/${searchValue}?app_id=${app_id}`)

    const data = await searchResult.json();

    showArtist(data);

}

const showArtist = (data) => { // Showcasing fetched artist details
    artist = data.name;
    if (data) {
        result.innerHTML = `
        <div class = "artist-container row" >
            
        <div class="blurry-bg" style="background-image : url(${data.image_url}); "> </div>

                 <div class="col-lg-4 col-sm-12">
                 <img src="${data.image_url}"/> 
                 </div>
                 <div class="col-lg-6 col-sm-12">
                 <h1 id="artist-name">${data.name}</h1> 
                <a href="${data.facebook_page_url}" target="blank_"> 
                <i class="fa fa-facebook-square" aria-hidden="true"></i>
                </a>
                </div>
                            <div class="col-lg-2 col-sm-12">
                            <button id="eventBtn"  onClick="searchEvents(artist)"> Events </button>
                            </div>
             
        </div>  `;

    }

    else {
        result.innerHTML = `<p> No such artist found. </p>` // If there is no such artist then let the user know
    }


}

const searchEvents = async (artist) => { // Searching for Artist's events 

    const searchResult = await fetch(`${apiURL}/artists/${artist}/events?app_id=${app_id}`)

    const events = await searchResult.json();

    if (events.length !== 0) {
        showEvents(events)
    } else { artist_events.innerHTML = `<p class="eventInfo"> ${artist} has no upcoming events as of now. </p>` } // Let the user know if the artist has no events


}

const showEvents = (events) => { //Showcasing events' details 

    let string = "<div class='row events'>"
    let date = ""
    search.style.display = "none";
    backBtn.style.display = "block";
    icon.style.marginLeft = "-50px";
    events.forEach(event => {
        date = event.datetime.substr(0, 10)
        string += `<div class='col-lg-4 col-md-4 col-sm-12 event'>
        <h3 class="details-text"> Event Details </h3>
        <li><b>Country: </b> ${event.venue.country}</li> 
        <li><b>City: </b>${event.venue.city}</li>
        <li><b>Venue: </b>${event.venue.name} </li> 
        <li><b>Date: </b>${date} (y/m/d)</li>
       
        </div>`
    });

    string += "</div>"

    artist_events.innerHTML = `<p class="eventInfo"> ${artist} has ${events.length} upcoming events. </p>` + string


}


backBtn.onclick = () => { //Making changes to the page when user clicks on the back button

    artist_events.innerHTML = ``
    result.innerHTML = ``
    search.style.display = "inline-block"
    backBtn.style.display = "none"
    icon.style.marginLeft = "0px";
    search.value = "";

}





