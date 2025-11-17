// Système de sons et effets visuels
const AudioSystem = {
    enabled: true,
    audioContext: null,

    init: function() {
        // Créer le contexte audio
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    },

    toggle: function() {
        this.enabled = !this.enabled;
        return this.enabled;
    },

    // Générer un son simple
    playTone: function(frequency, duration, type = 'sine') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    },

    // Sons spécifiques
    sounds: {
        click: function() {
            AudioSystem.playTone(800, 0.1, 'square');
        },

        success: function() {
            AudioSystem.playTone(523.25, 0.1, 'sine');
            setTimeout(() => AudioSystem.playTone(659.25, 0.1, 'sine'), 100);
            setTimeout(() => AudioSystem.playTone(783.99, 0.2, 'sine'), 200);
        },

        newChallenge: function() {
            AudioSystem.playTone(440, 0.15, 'triangle');
            setTimeout(() => AudioSystem.playTone(554.37, 0.15, 'triangle'), 150);
        },

        jackpot: function() {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    AudioSystem.playTone(523.25 + (i * 100), 0.1, 'sine');
                }, i * 80);
            }
        },

        warning: function() {
            AudioSystem.playTone(300, 0.3, 'sawtooth');
        },

        chug: function() {
            AudioSystem.playTone(200, 0.5, 'sawtooth');
        },

        hover: function() {
            AudioSystem.playTone(600, 0.05, 'sine');
        }
    }
};

// Système d'effets visuels
const VisualEffects = {
    // Créer des confettis
    createConfetti: function(count = 50) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE'];

        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';

                document.body.appendChild(confetti);

                setTimeout(() => confetti.remove(), 5000);
            }, i * 30);
        }
    },

    // Effet de pulsation
    pulse: function(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'pulse 0.5s ease-in-out';
        }, 10);
    },

    // Effet de shake
    shake: function(element) {
        element.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 500);
    },

    // Créer des particules
    createParticles: function(x, y, color = '#667eea') {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.backgroundColor = color;

            const angle = (Math.PI * 2 * i) / 20;
            const velocity = 50 + Math.random() * 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;

            particle.style.setProperty('--vx', vx + 'px');
            particle.style.setProperty('--vy', vy + 'px');

            document.body.appendChild(particle);

            setTimeout(() => particle.remove(), 1000);
        }
    },

    // Flash de l'écran
    flash: function(color = 'rgba(255, 255, 255, 0.5)') {
        const flash = document.createElement('div');
        flash.className = 'screen-flash';
        flash.style.backgroundColor = color;
        document.body.appendChild(flash);

        setTimeout(() => flash.remove(), 300);
    },

    // Effet de typing pour le texte
    typeWriter: function(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;

        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };

        type();
    }
};

// Initialiser le système audio
AudioSystem.init();

// Exporter pour utilisation globale
window.AudioSystem = AudioSystem;
window.VisualEffects = VisualEffects;
