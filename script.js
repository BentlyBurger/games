// Sample Data - You can edit this later with real data
const gamesData = [
    { id: 1, sport: 'football', title: 'Varsity vs. Lincoln High', date: 'LIVE NOW', img: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?q=80&w=1000&auto=format&fit=crop', embed: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }, // Replace URL with your stream
    { id: 2, sport: 'basketball', title: 'JV vs. Westside', date: 'Oct 24, 7:00 PM', img: 'https://images.unsplash.com/photo-1546519638-68e109498ee2?q=80&w=1000&auto=format&fit=crop', embed: '' },
    { id: 3, sport: 'soccer', title: 'Finals: East vs. North', date: 'LIVE NOW', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop', embed: '' },
    { id: 4, sport: 'football', title: 'Homecoming Game', date: 'Nov 12, 6:00 PM', img: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop', embed: '' },
    { id: 5, sport: 'basketball', title: 'Varsity Girls vs. Central', date: 'Nov 14, 5:30 PM', img: 'https://images.unsplash.com/photo-1519861531473-920026393112?q=80&w=1000&auto=format&fit=crop', embed: '' },
    { id: 6, sport: 'soccer', title: 'Playoffs Round 1', date: 'Nov 20, 4:00 PM', img: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=1000&auto=format&fit=crop', embed: '' }
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
