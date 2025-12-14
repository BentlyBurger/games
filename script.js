// Sample Data - You can edit this later with real data
const gamesData = [
    { 
        id: 1, 
        sport: 'soccer', 
        title: 'MBAPPE FC', 
        date: 'LIVE NOW', 
        img: 'https://www.fcbarcelona.com/photo-resources/2025/09/09/a9ecee2c-116c-405c-8524-3127913e7a3c/10-Lamine.jpg?width=1200&height=750', 
        // 🚨 CHANGE 1: 'embeds' array is correct 🚨
        embeds: [
            'https://ntvstream.cx/embed?t=RnBicEVST3ZWdWxIOTdKVHE4MlUydFlKR00weWtLd1orQ21LeUtTNTVuQ01VN1hjVWgrUk1kcVd4MzdPTzRiN0ZYZEVSczNTS1JQaVgrZ0ZHclAwSUdhMTBjbXUvdWJsY3RRQWMyT2lyVkk9', // SECOND STREAM LINK
            'https://ntvstream.cx/embed?t=RnBicEVST3ZWdWxIOTdKVHE4MlUydGU0djg2QWhXV3hmdVIvN2l6WEdHU01uNkRHcThUTVBGTEpsYlhhUFNaU3hRVGF2MGJLQ1hySFNBQ0U1YnZJUnFsY1dpY3RmL0hqV0xiRktJOFNMbzJ5UGJVY0ttU3N5R05IUHFVR2htcjQ~',      // THIRD STREAM LINK
            'https://ntvstream.cx/embed?t=RnBicEVST3ZWdWxIOTdKVHE4MlUydFlKR00weWtLd1orQ21LeUtTNTVuQ01VN1hjVWgrUk1kcVd4MzdPTzRiN0ZYZEVSczNTS1JQaVgrZ0ZHclAwSUdhMTBjbXUvdWJsY3RRQWMyT2lyVkk9'      // THIRD STREAM LINK
        ] 
    },
    
];

const container = document.getElementById('games-container');
const modal = document.getElementById('video-modal');
const modalTitle = document.getElementById('modal-title');
const videoContainer = document.getElementById('video-container');
// 🚨 FIX 1: Direct reference to the HTML element 🚨
const streamButtonsWrapper = document.getElementById('stream-buttons-wrapper'); 


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
    // 🚨 FIX 2: Use the correct wrapper ID for button selection 🚨
    document.querySelectorAll('#stream-buttons-wrapper button').forEach(btn => btn.classList.remove('active-stream'));
    buttonElement.classList.add('active-stream');
}

// 3. Modal Functions (FIXED)
function openModal(game) {
    modal.style.display = 'flex';
    modalTitle.innerText = game.title;
    
    const embeds = game.embeds || []; // Use 'embeds' array
    
    // 🚨 FIX 3: Clear the wrapper directly 🚨
    streamButtonsWrapper.innerHTML = ''; 
    
    if (embeds.length > 0) {
        // 1. Embed the FIRST stream link by default
        const initialEmbed = embeds[0];
        // Ensure iframe has ID 'main-stream-iframe' for switching
        videoContainer.innerHTML = `<iframe id="main-stream-iframe" src="${initialEmbed}" allowfullscreen></iframe>`;
        
        // 2. Generate buttons inside the pre-existing wrapper
        embeds.forEach((url, index) => {
            const button = document.createElement('button');
            button.innerText = `Stream ${index + 1}`;
            button.className = 'stream-button';
            // Use the switchStream function on click
            button.onclick = (e) => switchStream(url, e.target);
            // 🚨 FIX 4: Append to the correct wrapper 🚨
            streamButtonsWrapper.appendChild(button);
        });
        
        // 3. Set the first button as active visually
        const firstButton = streamButtonsWrapper.querySelector('.stream-button');
        if(firstButton) firstButton.classList.add('active-stream');
        
    } else {
        videoContainer.innerHTML = `<div style="color:white; text-align:center; padding:50px;">Stream not available yet.</div>`;
    }
}

function closeModal() {
    modal.style.display = 'none';
    videoContainer.innerHTML = ''; // Stop video playing
    // 🚨 FIX 5: Clear the buttons when modal closes 🚨
    streamButtonsWrapper.innerHTML = ''; 
}

// Close modal if clicking outside content (NO CHANGE NEEDED HERE)
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}







