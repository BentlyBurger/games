// ... (The code above this line remains the same)

const container = document.getElementById('games-container');
const modal = document.getElementById('video-modal');
const modalTitle = document.getElementById('modal-title');
const videoContainer = document.getElementById('video-container');
// We need to reference the wrapper from the HTML directly
const streamButtonsWrapper = document.getElementById('stream-buttons-wrapper'); 


// 1. Function to display games (This part is fine)
// ...

// 2. Filter Function (This part is fine)
// ...


// 🚨 CORRECTED NEW FUNCTION: Switches the stream source 🚨
window.switchStream = function(url, buttonElement) {
    const iframe = document.getElementById('main-stream-iframe');
    if (iframe) {
        iframe.src = url;
    }
    
    // Highlight the active button (for better UI)
    document.querySelectorAll('#stream-buttons-wrapper button').forEach(btn => btn.classList.remove('active-stream'));
    buttonElement.classList.add('active-stream');
}

// 3. Modal Functions (CORRECTED LOGIC)
function openModal(game) {
    modal.style.display = 'flex';
    modalTitle.innerText = game.title;
    
    const embeds = game.embeds || [];
    // 🚨 FIX: Clear the wrapper directly, no need for the separate streamButtonsContainer
    streamButtonsWrapper.innerHTML = ''; 
    
    if (embeds.length > 0) {
        
        // 1. Embed the FIRST stream link by default
        const initialEmbed = embeds[0];
        // We use a specific ID 'main-stream-iframe' so switchStream can find it
        videoContainer.innerHTML = `<iframe id="main-stream-iframe" src="${initialEmbed}" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
        
        // 2. Generate buttons inside the pre-existing wrapper
        embeds.forEach((url, index) => {
            const button = document.createElement('button');
            button.innerText = `Stream ${index + 1}`;
            button.className = 'stream-button';
            // Use the switchStream function on click
            button.onclick = (e) => switchStream(url, e.target);
            streamButtonsWrapper.appendChild(button);
        });
        
        // 3. Set the first button as active visually
        // Find the first button that was just created inside the wrapper
        const firstButton = streamButtonsWrapper.querySelector('.stream-button');
        if(firstButton) firstButton.classList.add('active-stream');
        
    } else {
        videoContainer.innerHTML = `<div style="color:white; text-align:center; padding:50px;">Stream not available yet.</div>`;
    }
}

function closeModal() {
    modal.style.display = 'none';
    videoContainer.innerHTML = ''; // Stop video playing
    // Clear the buttons when closing
    streamButtonsWrapper.innerHTML = ''; 
}

// Close modal if clicking outside content (This part is fine)
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Initial Load
displayGames();
