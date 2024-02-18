var searchInput = document.getElementById("input-search-room");
var container = document.getElementById("container");
var facilityRoom = document.getElementById('facility-room-result');
var facilityBuilding = document.getElementById('facility-building-result');
var buildingResult = document.getElementById('buildingResult');

let jsonData;


function displayResults(results) {
    // Clear previous results
    container.innerHTML = '';


    // Display new results
    results.forEach(buildingData => {
        Object.entries(buildingData).forEach(([building, rooms]) => {
            const buildingItem = document.createElement('div');
            buildingItem.textContent = `Building: ${building}`;
            buildingItem.classList.add('building-item'); // Add a class for styling
            container.appendChild(buildingItem);

            rooms.forEach(room => {
                const roomItem = document.createElement('div');
                roomItem.textContent = `Facility: ${room}`;
                roomItem.classList.add('room-item'); // Add a class for styling
                roomItem.setAttribute('data-building', building); // Store building data as a data attribute
                container.appendChild(roomItem);

                // Add click event listener to roomItem
                roomItem.addEventListener('click', function() {
                    const clickedBuilding = this.getAttribute('data-building');
                    facilityBuilding.innerHTML = clickedBuilding;
                    facilityRoom.innerHTML = room;
                    // Remove existing image if any
                    while (buildingResult.firstChild) {
                        buildingResult.removeChild(buildingResult.firstChild);
                    }
                    // Create a new Image element
                    const newImg = new Image();
                    newImg.src = buildings[clickedBuilding];
                    // Append the new image to the container
                    buildingResult.appendChild(newImg);
                    searchInput.value = '';
                    container.style.display = "none";
                    // alert(`Facility: ${room} is in Building: ${clickedBuilding}`);
                    // Handle the click event as needed
                });
            });
        });
    });

    // Toggle visibility based on input
    if (searchInput.value.trim() !== '') {
        container.style.display = "block";
    } else {
        container.style.display = "none";
    }
}

const fetch_Building = () => {
    fetch('../static/js/rooms.json').then(response => response.json()).then(data => {
        console.log(data)
        jsonData = data;

        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();

            if (searchTerm.trim() === '') {
                // If the search term is empty, don't perform filtering
                displayResults([]);
            } else {
                // Otherwise, filter and display results
                const filteredData = filterData(jsonData, searchTerm);
                displayResults(filteredData);
            }
        })
    }).catch(error => console.error("Error in Fetching: ", error))
}

const filterData = (data, searchTerm) => {
    if (typeof data === 'object') {
        return Object.keys(data).reduce((acc, key) => {
            const buildingRooms = data[key].filter(room => room.toLowerCase().includes(searchTerm));
            if (buildingRooms.length > 0) {
                acc.push({ [key]: buildingRooms });
            }
            return acc;
        }, []);
    }

    return null;
}

fetch_Building();

    // "Drafting Tech Building" : [
        
    // ],
    // "Maritime Building" : [
    
    // ],
    // "Automotive Building" : [
    
    // ],
    // "Auditorium" : [
    // ]
        
