let swipeCount = 0;

// Add flowers dynamically
function addFlowers() {
    const container = document.querySelector('.flower-container');
    const flowerCount = 50;
    
    for(let i = 0; i < flowerCount; i++) {
        const flower = document.createElement('img');
        flower.className = 'flower';
        flower.src = 'flower.png';
        
        // Random position
        flower.style.left = `${Math.random() * 100}%`;
        flower.style.top = `${Math.random() * 100}%`;
        
        // Random animation properties
        flower.style.animationDuration = `${6 + Math.random() * 6}s`;
        flower.style.animationDelay = `${Math.random() * 6}s`;
        flower.style.width = `${30 + Math.random() * 50}px`;
        
        container.appendChild(flower);
    }
}

function openEnvelope() {
    const envelope = document.querySelector('.envelope');
    envelope.style.transform = 'translate(-50%, -100vh)';
    envelope.style.opacity = '0';
    
    document.getElementById('imagesContainer').style.display = 'block';
    document.getElementById('backgroundMusic').play();

    // Add swipe events
    document.querySelectorAll('.image-card').forEach(card => {
        let startX = 0;
        
        card.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
        });
        
        card.addEventListener('touchmove', e => {
            if(startX - e.touches[0].clientX > 100) {
                swipeImage(card);
            }
        });
        
        card.addEventListener('mousedown', e => {
            startX = e.clientX;
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', () => {
                document.removeEventListener('mousemove', mouseMoveHandler);
            });
        });

        const mouseMoveHandler = (e) => {
            if(startX - e.clientX > 100) {
                swipeImage(card);
            }
        };
    });

    // Auto-swipe after 10 seconds
    setTimeout(() => {
        if(swipeCount < 3) {
            document.querySelectorAll('.image-card').forEach(card => {
                if(!card.classList.contains('swipe-out')) {
                    swipeImage(card);
                }
            });
        }
    }, 10000);
}

function swipeImage(card) {
    if(!card.classList.contains('swipe-out')) {
        card.classList.add('swipe-out');
        swipeCount++;
        
        if(swipeCount === 3) {
            setTimeout(() => {
                document.getElementById('imagesContainer').style.display = 'none';
                document.getElementById('letter').style.display = 'block';
            }, 300);
        }
    }
}

// Initialize
addFlowers();