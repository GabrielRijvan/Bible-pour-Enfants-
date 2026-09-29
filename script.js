document.addEventListener("DOMContentLoaded", () => {
    // 1. Effet de confetti lors du clic sur le bouton de téléchargement
    const downloadButtons = document.querySelectorAll(".btn-download");

    downloadButtons.forEach(button => {
        button.addEventListener("click", e => {
            createBurstEffect(e.clientX, e.clientY);
        });
    });

    function createBurstEffect(x, y) {
        const colors = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A29BFE", "#FF7675"];

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement("div");
            particle.className = "burst-particle";
            document.body.appendChild(particle);

            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.background = color;
            particle.style.borderRadius = "50%";
            particle.style.position = "fixed";
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.pointerEvents = "none";
            particle.style.zIndex = "9999";

            // Animation aléatoire dans toutes les directions
            const destinationX = (Math.random() - 0.5) * 200;
            const destinationY = (Math.random() - 0.5) * 200;

            particle.animate(
                [
                    { transform: "translate(0, 0) scale(1)", opacity: 1 },
                    {
                        transform: `translate(${destinationX}px, ${destinationY}px) scale(0)`,
                        opacity: 0
                    }
                ],
                {
                    duration: 800,
                    easing: "cubic-bezier(0, .9, .57, 1)",
                    fill: "forwards"
                }
            );

            setTimeout(() => particle.remove(), 800);
        }
    }

    // 2. Légère animation d'apparition des cartes au défilement (Scroll Reveal)
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.1 }
    );

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "all 0.6s ease-out";
        observer.observe(card);
    });
});
