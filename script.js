class ElapsedTimer {
    constructor() {
        this.startDate = new Date('October 31, 2024 00:00:00').getTime();
        this.timeElement = document.querySelector('.time');
        this.circleElement = document.querySelector('.circle');
        this.init();
    }

    init() {
        this.updateDisplay();
        setInterval(() => this.updateDisplay(), 1000);
    }

    updateDisplay() {
        const now = new Date().getTime();
        const elapsed = now - this.startDate;

        // Calculate time components
        const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
        const hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

        // Update the display
        this.timeElement.innerHTML = `${days}d ${hours}h<br>${minutes}m ${seconds}s`;
        
        // Calculate progress for the circle (based on minutes)
        const minutesInDay = 24 * 60;
        const currentMinuteOfDay = (hours * 60) + minutes;
        const progress = (currentMinuteOfDay / minutesInDay) * 100;
        
        // Update the circle
        this.circleElement.style.background = 
            `conic-gradient(#ff4444 ${progress}%, #2d2d2d ${progress}%)`;
    }
}

class TypeWriter {
    constructor(welcomeElement, loveElement) {
        this.welcomeElement = welcomeElement;
        this.loveElement = loveElement;
        this.welcomeText = "Welcome Nessrine ♥";
        this.loveMessages = [
            "your beautiful smile",
            "your gorgeous eyes",
            "your kind heart",
            "your sweet voice",
            "your gentle touch",
            "your loving soul",
            "your cute laugh",
            "your amazing personality",
            "everything about you",
            "your precious hugs",
            "your tender kisses",
            "your warm embrace",
            "your caring nature"
        ];
        this.currentMessageIndex = 0;
        this.isDeleting = false;
        this.currentText = "";
        this.baseText = "Julien loves ";
        this.init();
    }

    async init() {
        this.welcomeElement.textContent = this.welcomeText;
        await this.wait(1000);
        this.typeLoveMessage();
    }

    async typeLoveMessage() {
        const currentMessage = this.loveMessages[this.currentMessageIndex];

        if (!this.isDeleting) {
            if (!this.currentText) {
                this.currentText = this.baseText;
            }
            
            if (this.currentText.length < this.baseText.length + currentMessage.length) {
                this.currentText = this.baseText + currentMessage.substring(0, this.currentText.length - this.baseText.length + 1);
                this.loveElement.textContent = this.currentText;
            } else {
                await this.wait(2500);
                this.isDeleting = true;
            }
        } else {
            if (this.currentText.length > this.baseText.length) {
                this.currentText = this.currentText.substring(0, this.currentText.length - 1);
                this.loveElement.textContent = this.currentText;
            } else {
                this.isDeleting = false;
                this.currentMessageIndex = (this.currentMessageIndex + 1) % this.loveMessages.length;
                this.currentText = this.baseText;
                await this.wait(800);
            }
        }

        const timeout = this.isDeleting ? 75 : Math.random() * 50 + 100;
        setTimeout(() => this.typeLoveMessage(), timeout);
    }

    wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const timer = new ElapsedTimer();
    const typewriter = new TypeWriter(
        document.querySelector('.welcome-text'),
        document.querySelector('.love-text')
    );
}); 