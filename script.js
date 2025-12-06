// Sample Data - You can edit this later with real data
const gamesData = [
    { id: 1, sport: 'soccer', title: 'INTER MIAMI VS VANCOUVER', date: 'LIVE NOW', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop', embed: 'https://ntvstream.cx/embed?t=RnBicEVST3ZWdWxIOTdKVHE4MlUydFlKR00weWtLd1orQ21LeUtTNTVuQVJFRTdDczNYbTNjRS9JNExKUW53R3owcytlWldZVzJMUWowUCtPU3MxS2ZSeEtpdXVSa2N5L0Y3Vi95cnZpazQ9' },
];

const container = document.getElementById('games-container');
const modal = document.getElementById('video-modal');
const modalTitle = document.getElementById('modal-title');
const videoContainer = document.getElementById('video-container');

// 1. Function to display games
function displayGames(filter = 'all') {
    container.innerHTML = ''; // Clear current games
    
    const filteredGames = filter === 'all' 
        ? gamesData 
        : gamesData.filter(game => game.sport === filter);

    filteredGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.onclick = () => openModal(game);

        // Check if live to add badge
        const liveBadge = game.date === 'LIVE NOW' ? '<span class="live-badge">LIVE</span>' : '';

        card.innerHTML = `
            <div class="card-image" style="background-image: url('${game.img}')">
                ${liveBadge}
            </div>
            <div class="card-info">
                <span class="card-sport">${game.sport}</span>
                <div class="card-title">${game.title}</div>
                <div class="card-date"><i class="far fa-calendar-alt"></i> ${game.date}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// 2. Filter Function (Clicking Menu)
function filterGames(category, element) {
    // Remove active class from all links
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    // Add active class to clicked link
    element.classList.add('active');
    
    displayGames(category);
}

// 3. Modal Functions
function openModal(game) {
    modal.style.display = 'flex';
    modalTitle.innerText = game.title;
    
    // Check if there is an embed link
    if(game.embed) {
        videoContainer.innerHTML = `<iframe src="${game.embed}" allowfullscreen></iframe>`;
    } else {
        videoContainer.innerHTML = `<div style="color:white; text-align:center; padding:50px;">Stream not available yet.</div>`;
    }
}

function closeModal() {
    modal.style.display = 'none';
    videoContainer.innerHTML = ''; // Stop video playing
}

// Close modal if clicking outside content
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Initial Load
displayGames();



