// Sample Data - You can edit this later with real data
const gamesData = [
    { 
        id: 1, 
        sport: 'soccer', 
        title: 'INTER MIAMI VS VANCOUVER', 
        date: 'LIVE NOW', 
        img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop', 
        // 🚨 CHANGE 1: 'embed' is now an ARRAY of URLs 🚨
        embeds: [
            'https://ntvstream.cx/embed?t=RnBicEVST3ZWdWxIOTdKVHE4MlUydFlKR00weWtLd1orQ21LeUtTNTVuQVJFRTdDczNYbTNjRS9JNExKUW53R3owcytlWldZVzJMUWowUCtPU3MxS2ZSeEtpdXVSa2N5L0Y3Vi95cnZpazQ9',
            'https://methstreams.ms/stream/psg-vs-rennes#', // SECOND STREAM LINK
            'https://stream3.net/another-backup-option'      // THIRD STREAM LINK
        ] 
    },
    // Add other games here...
];

const container = document.getElementById('games-container');
const modal = document.getElementById('video-modal');
const modalTitle = document.getElementById('modal-title');
const videoContainer = document.getElementById('video-container');

// A new container for the stream-switching buttons
const streamButtonsContainer = document.createElement('div');
streamButtonsContainer.id = 'stream-buttons';
streamButtonsContainer.style.marginBottom = '15px';
streamButtonsContainer.style.textAlign = 'center';


// 1. Function to display games (NO CHANGE NEEDED HERE)
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

// 2. Filter Function (Clicking Menu - NO CHANGE NEEDED HERE)
function filterGames(category, element) {
    document.querySelectorAll('.nav-links li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');
    displayGames(category);
}

// 🚨 NEW FUNCTION: Switches the stream source 🚨
window.switchStream = function(url, buttonElement) {
    const iframe = document.getElementById('main-stream-iframe');
    if (iframe) {
        iframe.src = url;
    }
    
    // Highlight the active button (for better UI)
    document.querySelectorAll('#stream-buttons button').forEach(btn => btn.classList.remove('active-stream'));
    buttonElement.classList.add('active-stream');
}

// 3. Modal Functions (MODIFIED)
function openModal(game) {
    modal.style.display = 'flex';
    modalTitle.innerText = game.title;
    
    const embeds = game.embeds || []; // Use 'embeds' array
    
    // Clear previous buttons and generate new ones
    streamButtonsContainer.innerHTML = ''; 
    
    if (embeds.length > 0) {
        // Generate a button for each stream link
        embeds.forEach((url, index) => {
            const button = document.createElement('button');
            button.innerText = `Stream ${index + 1}`;
            button.className = 'stream-button';
            // Use the switchStream function on click
            button.onclick = (e) => switchStream(url, e.target);
            streamButtonsContainer.appendChild(button);
        });
        
        // Find the modal content and insert the buttons container before the video
        const modalContent = modal.querySelector('.modal-content');
        const videoWrapper = document.getElementById('video-wrapper-id');

        // Add the buttons container if it's not already there
        if (!document.getElementById('stream-buttons-wrapper')) {
            const buttonsWrapper = document.createElement('div');
            buttonsWrapper.id = 'stream-buttons-wrapper';
            buttonsWrapper.appendChild(streamButtonsContainer);
            modalContent.insertBefore(buttonsWrapper, videoContainer.parentNode); // Insert before the video-wrapper
        }
        
        // Embed the FIRST stream link by default
        const initialEmbed = embeds[0];
        videoContainer.innerHTML = `<iframe id="main-stream-iframe" src="${initialEmbed}" allowfullscreen></iframe>`;
        
        // Set the first button as active visually
        setTimeout(() => { // Use timeout to ensure buttons are rendered
            const firstButton = document.querySelector('#stream-buttons button');
            if(firstButton) firstButton.classList.add('active-stream');
        }, 50);
        
    } else {
        videoContainer.innerHTML = `<div style="color:white; text-align:center; padding:50px;">Stream not available yet.</div>`;
        // Ensure buttons are hidden if no streams exist
        document.getElementById('stream-buttons-wrapper')?.remove();
    }
}

function closeModal() {
    modal.style.display = 'none';
    videoContainer.innerHTML = ''; // Stop video playing
    // Remove buttons when modal closes
    document.getElementById('stream-buttons-wrapper')?.remove();
}

// Close modal if clicking outside content (NO CHANGE NEEDED HERE)
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Initial Load
displayGames();

