
        let audio, controlPausa, estaReproduciendo = false;

        document.addEventListener('DOMContentLoaded', function () {
            // Multiplicador de flores para hacer el ramo mucho más tupido
            const floresContainer = document.getElementById('flores-container');
            const floresOriginales = Array.from(floresContainer.querySelectorAll('.flor'));

            // Clonaremos aleatoriamente flores existentes para llegar a unas 35 flores
            const totalFloresObjetivo = matchMedia("(max-width: 768px)").matches ? 16 : 35;
            floresOriginales.slice(totalFloresObjetivo).forEach(flor => flor.remove());
            let currentId = floresOriginales.length + 1;

            while (floresContainer.children.length < totalFloresObjetivo) {
                // Elegir una flor base al azar
                const florBase = floresOriginales[Math.floor(Math.random() * floresOriginales.length)];
                const clon = florBase.cloneNode(true);

                // Cambiar la clase para poder darle estilos únicos o simplemente sobreescribir estilos
                clon.className = `flor flor--${currentId}`;

                // Variar posición y rotación
                const leftPos = Math.random() * 80 + 10; // entre 10% y 90%
                const rotate = Math.random() * 40 - 20; // entre -20 y 20 grados
                const scale = Math.random() * 0.4 + 0.6; // entre 0.6 y 1.0
                const zIndex = Math.floor(Math.random() * 40) + 10;

                clon.style.left = `${leftPos}%`;
                clon.style.transform = `rotate(${rotate}deg) scale(${scale})`;
                clon.style.zIndex = zIndex;
                clon.style.bottom = `${Math.random() * 15 + 5}vmin`;

                floresContainer.appendChild(clon);
                currentId++;
            }

            const mariposasContainer = document.getElementById('mariposas'); mariposasContainer.replaceChildren();

            const coloresMariposas = [
                ['#FFD700', '#FFC107', '#B8860B'],
                ['#FFBF00', '#FFAA00', '#DAA520'],
                ['#F0C040', '#E0A800', '#C89400'],
                ['#FFECB3', '#FFF8E1', '#FFE082'],
                ['#FFE44D', '#FFD700', '#FFB300']
            ];

            for (let i = 0; i < 8; i++) {
                const mariposaSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                mariposaSVG.setAttribute('width', '120');
                mariposaSVG.setAttribute('height', '120');
                mariposaSVG.setAttribute('viewBox', '0 0 200 200');
                mariposaSVG.classList.add('mariposa-svg');

                const posX = Math.random() * 100;
                const posY = Math.random() * 100;

                const colorSet = coloresMariposas[Math.floor(Math.random() * coloresMariposas.length)];

                const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
                const duracionVuelo = 15 + Math.random() * 10;
                const delayVuelo = Math.random() * 20;

                style.textContent = `
                    .mariposa-${i} {
                        animation: vueloMariposa${i} ${duracionVuelo}s ease-in-out infinite ${delayVuelo}s;
                        transform-origin: 100px 100px;
                    }

                    @keyframes vueloMariposa${i} {
                        0%   { transform: translate(0px, 0px) rotate(0deg) scale(0.8); opacity: 0; }
                        10%  { opacity: 1; }
                        20%  { transform: translate(${50 + Math.random() * 50}px, ${-20 - Math.random() * 30}px) rotate(${10 + Math.random() * 20}deg) scale(1); }
                        40%  { transform: translate(${80 + Math.random() * 40}px, ${10 + Math.random() * 20}px) rotate(${20 + Math.random() * 40}deg) scale(1.1); }
                        50%  { transform: translate(${100 + Math.random() * 40}px, ${-10 + Math.random() * 20}px) rotate(${150 + Math.random() * 60}deg) scale(1); }
                        60%  { transform: translate(${80 + Math.random() * 40}px, ${-30 - Math.random() * 20}px) rotate(${120 + Math.random() * 30}deg) scale(0.9); }
                        80%  { transform: translate(${30 + Math.random() * 40}px, ${20 + Math.random() * 30}px) rotate(${100 + Math.random() * 20}deg) scale(1); }
                        90%  { opacity: 1; }
                        100% { transform: translate(0px, 0px) rotate(0deg) scale(0.8); opacity: 0; }
                    }

                    .ala-izq-${i}, .ala-der-${i} {
                        fill: none;
                        stroke: ${colorSet[0]};
                        stroke-width: 3;
                        transform-origin: 100px 100px;
                        animation: aleteo${i} ${0.6 + Math.random() * 0.4}s infinite ease-in-out;
                    }

                    .ala-izq-${i} { animation-delay: 0s; }
                    .ala-der-${i} { animation-delay: ${0.2 + Math.random() * 0.3}s; }

                    @keyframes aleteo${i} {
                        0%, 100% { transform: rotate(0deg); }
                        50% { transform: rotate(${8 + Math.random() * 7}deg); }
                    }

                    .cuerpo-${i} {
                        stroke: ${colorSet[1]};
                        stroke-width: 6;
                        stroke-linecap: round;
                    }

                    .antena-${i} {
                        stroke: ${colorSet[2]};
                        stroke-width: 2;
                        fill: none;
                    }
                `;

                mariposaSVG.appendChild(style);

                const mariposaGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                mariposaGroup.classList.add(`mariposa-${i}`);

                const alaIzq1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                alaIzq1.classList.add(`ala-izq-${i}`);
                alaIzq1.setAttribute('d', 'M100 100 C85 70, 65 90, 80 100');

                const alaIzq2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                alaIzq2.classList.add(`ala-izq-${i}`);
                alaIzq2.setAttribute('d', 'M100 100 C85 130, 65 110, 80 100');

                const alaDer1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                alaDer1.classList.add(`ala-der-${i}`);
                alaDer1.setAttribute('d', 'M100 100 C115 70, 135 90, 120 100');

                const alaDer2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                alaDer2.classList.add(`ala-der-${i}`);
                alaDer2.setAttribute('d', 'M100 100 C115 130, 135 110, 120 100');

                const cuerpo = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                cuerpo.classList.add(`cuerpo-${i}`);
                cuerpo.setAttribute('x1', '100');
                cuerpo.setAttribute('y1', '90');
                cuerpo.setAttribute('x2', '100');
                cuerpo.setAttribute('y2', '110');

                const antenaIzq = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                antenaIzq.classList.add(`antena-${i}`);
                antenaIzq.setAttribute('d', 'M100 90 C95 75, 85 75, 82 85');

                const antenaDer = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                antenaDer.classList.add(`antena-${i}`);
                antenaDer.setAttribute('d', 'M100 90 C105 75, 115 75, 118 85');

                mariposaGroup.appendChild(alaIzq1);
                mariposaGroup.appendChild(alaIzq2);
                mariposaGroup.appendChild(alaDer1);
                mariposaGroup.appendChild(alaDer2);
                mariposaGroup.appendChild(cuerpo);
                mariposaGroup.appendChild(antenaIzq);
                mariposaGroup.appendChild(antenaDer);

                mariposaSVG.appendChild(mariposaGroup);

                mariposaSVG.style.position = 'absolute';
                mariposaSVG.style.left = `${posX}vw`;
                mariposaSVG.style.top = `${posY}vh`;
                mariposaSVG.style.zIndex = '9999';
                mariposaSVG.style.pointerEvents = 'none';

                mariposasContainer.appendChild(mariposaSVG);
            }

            const particulasContainer = document.getElementById('particulas'); particulasContainer.replaceChildren();
            for (let i = 0; i < 50; i++) {
                const particula = document.createElement('div');
                particula.className = 'particula';
                particula.style.left = Math.random() * 100 + 'vw';
                particula.style.animationDelay = Math.random() * 8 + 's';
                particula.style.animationDuration = (Math.random() * 3 + 5) + 's';
                particulasContainer.appendChild(particula);
            }

            document.body.classList.remove("no-cargado");

            inicializarMusica();
        });

function inicializarMusica() {
    audio = new Audio('https://bcodestorague.anteroteobaldob.workers.dev/share/anteroteobaldob_gmail_com/AUDIO/Flores%20amarillas.mp3');
    audio.loop = true;
    audio.preload = 'none';
    controlPausa = document.createElement('button');
    controlPausa.type = 'button';
    controlPausa.className = 'control-musica';
    controlPausa.textContent = '♫ Música';
    controlPausa.setAttribute('aria-label', 'Reproducir música');
    controlPausa.setAttribute('aria-pressed', 'false');
    document.body.appendChild(controlPausa);
    const actualizar = () => {
        estaReproduciendo = !audio.paused;
        controlPausa.textContent = estaReproduciendo ? 'Ⅱ Pausar' : '♫ Música';
        controlPausa.setAttribute('aria-pressed', String(estaReproduciendo));
        controlPausa.setAttribute('aria-label', estaReproduciendo ? 'Pausar música' : 'Reproducir música');
    };
    audio.addEventListener('play', actualizar);
    audio.addEventListener('pause', actualizar);
    controlPausa.addEventListener('click', async () => {
        if (!audio.paused) { audio.pause(); return; }
        controlPausa.disabled = true;
        try { await audio.play(); }
        catch (error) {
            controlPausa.textContent = '♫ Reintentar';
            controlPausa.setAttribute('aria-label', 'No se pudo cargar la música. Toca para reintentar');
        } finally { controlPausa.disabled = false; }
    });
}