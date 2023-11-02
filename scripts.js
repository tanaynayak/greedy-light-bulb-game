const bulbsContainer = document.getElementById('bulbs-container');
const switchPressesDisplay = document.getElementById('switchPresses');
const bulbCountDropdown = document.getElementById('bulbCount');
let switchPresses = 0;

// Initialize based on the dropdown value
let bulbs = Array.from({length: parseInt(bulbCountDropdown.value)}, () => Math.round(Math.random()));

// Event listener for changing bulb count
bulbCountDropdown.addEventListener('change', () => {
    resetGameWithNewCount();
});

function renderBulbs() {
    // Clear the existing bulbs first
    bulbsContainer.innerHTML = '';

    bulbs.forEach((bulbState, index) => {
        const bulb = document.createElement('div');
        bulb.classList.add('bulb');
        if (bulbState) bulb.classList.add('on');
        bulb.addEventListener('click', () => toggleBulb(index));
        bulbsContainer.appendChild(bulb);
    });
}

function toggleBulb(index) {
    for (let i = index; i < bulbs.length; i++) {
        bulbs[i] = 1 - bulbs[i]; // Toggle state
    }
    updateDisplay();
    switchPresses++;
    switchPressesDisplay.textContent = switchPresses;
    
    checkAllBulbsOn(); // Check if all bulbs are on
}

function updateDisplay() {
    bulbs.forEach((bulbState, index) => {
        const bulb = bulbsContainer.children[index];
        if (bulbState) {
            bulb.classList.add('on');
        } else {
            bulb.classList.remove('on');
        }
    });
}

function checkAllBulbsOn() {
    if (bulbs.every(bulb => bulb === 1)) {
        // All bulbs are on
        document.getElementById('success-message').style.display = 'block';
    }
}

function resetGameWithNewCount() {
    bulbs = Array.from({length: parseInt(bulbCountDropdown.value)}, () => Math.round(Math.random()));
    switchPresses = 0;
    switchPressesDisplay.textContent = switchPresses;
    renderBulbs();
    document.getElementById('success-message').style.display = 'none';
}

// Reset functionality
document.getElementById('resetButton').addEventListener('click', resetGame);

function resetGame() {
    resetGameWithNewCount();
}

// Render bulbs initially
renderBulbs();
