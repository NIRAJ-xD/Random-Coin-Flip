const coin = document.getElementById('coin');
const result = document.getElementById('result');
const heads = document.getElementById('heads');
const tails = document.getElementById('tails');
const flipButton = document.getElementById('flip');

let isFlipping = false;

function flipCoin() {
    if (isFlipping) return;
    isFlipping = true;
    
    coin.style.animation = 'none';
    void coin.offsetWidth;
    
    const isHeads = Math.random() > 0.5;
    result.textContent = isHeads ? 'Heads' : 'Tails';
    
    const rotations = 2 + Math.floor(Math.random() * 2);rotations
    const duration = rotations * 0.4;
    
    const endRotation = isHeads ? 0 : 180;
    const keyframes = `
        @keyframes randomFlip {
            0% { transform: rotateY(0); }
            100% { transform: rotateY(${rotations * 180 + endRotation}deg); }
        }
    `;

    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    
    coin.style.animation = `randomFlip ${duration}s ease-in-out forwards`;
    
    setTimeout(() => {
        heads.style.opacity = isHeads ? 1 : 0;
        tails.style.opacity = isHeads ? 0 : 1;
    }, duration * 800);
    
    coin.addEventListener('animationend', () => {
        document.head.removeChild(style);
        isFlipping = false;

        coin.style.transform = `rotateY(${endRotation}deg)`;
    }, { once: true });
}

heads.style.opacity = 1;
tails.style.opacity = 0;

coin.addEventListener('click', flipCoin);
flipButton.addEventListener('click', flipCoin);