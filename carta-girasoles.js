
        document.addEventListener('DOMContentLoaded', () => {
            const modal = document.getElementById('modalCarta');
            const btnOpen = document.getElementById('btnCarta');
            const btnClose = document.getElementById('btnCerrar');

            let swiper = new Swiper(".mySwiper", {
                grabCursor: true,
                spaceBetween: 30,
                pagination: {
                    el: ".swiper-pagination",
                    dynamicBullets: true,
                },
                navigation: false
            });

            btnOpen.addEventListener('click', () => {
                modal.classList.add('active');
                swiper.update(); // Fix render issues
            });

            btnClose.addEventListener('click', () => {
                modal.classList.remove('active');
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        document.addEventListener('DOMContentLoaded', () => {
            const svgNS = "http://www.w3.org/2000/svg";

            function createRealisticSunflower(container, index) {
                container.innerHTML = '';

                const svg = document.createElementNS(svgNS, "svg");
                svg.setAttribute("viewBox", "0 0 200 200");
                svg.style.width = "40vmin";
                svg.style.height = "40vmin";
                svg.style.position = "absolute";
                svg.style.left = "50%";
                svg.style.bottom = "0";
                svg.style.transform = "translate(-50%, 50%)";
                svg.style.zIndex = "5";

                const defs = document.createElementNS(svgNS, "defs");

                // Unique IDs for this specific flower
                const idPetalGrad = `petalGrad_${index}`;
                const idPetalShadow = `petalShadow_${index}`;
                const idCenterGrad = `centerGrad_${index}`;
                const idCssPattern = `cssPattern_${index}`;
                const idSeedTexture = `seedTexture_${index}`;
                const idDropShadow = `dropShadow_${index}`;

                const petalGrad = document.createElementNS(svgNS, "linearGradient");
                petalGrad.setAttribute("id", idPetalGrad);
                petalGrad.setAttribute("x1", "0%");
                petalGrad.setAttribute("y1", "0%");
                petalGrad.setAttribute("x2", "0%");
                petalGrad.setAttribute("y2", "100%");
                petalGrad.innerHTML = '<stop offset="0%" stop-color="#FFEB3B" /><stop offset="20%" stop-color="#FFC107" /><stop offset="70%" stop-color="#FF8F00" /><stop offset="100%" stop-color="#D84315" />';
                defs.appendChild(petalGrad);

                const petalShadow = document.createElementNS(svgNS, "linearGradient");
                petalShadow.setAttribute("id", idPetalShadow);
                petalShadow.innerHTML = '<stop offset="0%" stop-color="rgba(0,0,0,0)" /><stop offset="30%" stop-color="rgba(0,0,0,0.05)" /><stop offset="50%" stop-color="rgba(0,0,0,0.15)" /><stop offset="70%" stop-color="rgba(0,0,0,0.05)" /><stop offset="100%" stop-color="rgba(0,0,0,0)" />';
                defs.appendChild(petalShadow);

                const centerGrad = document.createElementNS(svgNS, "radialGradient");
                centerGrad.setAttribute("id", idCenterGrad);
                centerGrad.innerHTML = '<stop offset="30%" stop-color="transparent" /><stop offset="95%" stop-color="rgba(0,0,0,0.9)" />';
                defs.appendChild(centerGrad);

                const cssPattern = document.createElementNS(svgNS, "pattern");
                cssPattern.setAttribute("id", idCssPattern);
                cssPattern.setAttribute("width", "6");
                cssPattern.setAttribute("height", "6");
                cssPattern.setAttribute("patternUnits", "userSpaceOnUse");

                const baseRect = document.createElementNS(svgNS, "rect");
                baseRect.setAttribute("width", "6");
                baseRect.setAttribute("height", "6");
                baseRect.setAttribute("fill", "#2a1508");

                const patDot1 = document.createElementNS(svgNS, "circle");
                patDot1.setAttribute("cx", "0");
                patDot1.setAttribute("cy", "0");
                patDot1.setAttribute("r", "1");
                patDot1.setAttribute("fill", "#8A6B0E");

                const patDot2 = document.createElementNS(svgNS, "circle");
                patDot2.setAttribute("cx", "3");
                patDot2.setAttribute("cy", "3");
                patDot2.setAttribute("r", "1.5");
                patDot2.setAttribute("fill", "#4d2b12");

                cssPattern.appendChild(baseRect);
                cssPattern.appendChild(patDot1);
                cssPattern.appendChild(patDot2);
                defs.appendChild(cssPattern);

                const filter = document.createElementNS(svgNS, "filter");
                filter.setAttribute("id", idSeedTexture);
                filter.innerHTML = '<feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" result="noise"/><feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 3 -1" in="noise" result="coloredNoise"/><feComposite operator="in" in="coloredNoise" in2="SourceGraphic" result="texture"/><feBlend mode="multiply" in="texture" in2="SourceGraphic"/>';
                defs.appendChild(filter);

                const dropShadow = document.createElementNS(svgNS, "filter");
                dropShadow.setAttribute("id", idDropShadow);
                dropShadow.innerHTML = '<feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.4"/>';
                defs.appendChild(dropShadow);

                svg.appendChild(defs);

                const petalsGroup = document.createElementNS(svgNS, "g");

                const layers = [
                    { count: 24, radius: 25, scale: 1, rotOffset: 0 },
                    { count: 24, radius: 20, scale: 0.9, rotOffset: 7.5 },
                    { count: 18, radius: 15, scale: 0.8, rotOffset: 4 }
                ];

                layers.forEach(layer => {
                    for (let i = 0; i < layer.count; i++) {
                        const angle = (i * (360 / layer.count)) + layer.rotOffset + (Math.random() * 3 - 1.5);

                        const petal = document.createElementNS(svgNS, "path");
                        const p1x = 88 + (Math.random() * 6 - 3);
                        const p2x = 112 + (Math.random() * 6 - 3);
                        const pty = 5 + (Math.random() * 10);

                        petal.setAttribute("d", 'M 100,100 C ' + p1x + ',60 ' + (p1x + 2) + ',30 100,' + pty + ' C ' + (p2x - 2) + ',30 ' + p2x + ',60 100,100');
                        petal.setAttribute("fill", `url(#${idPetalGrad})`);
                        petal.setAttribute("filter", `url(#${idDropShadow})`);

                        const fold = document.createElementNS(svgNS, "path");
                        fold.setAttribute("d", 'M 100,100 Q 100,50 100,' + pty);
                        fold.setAttribute("stroke", `url(#${idPetalShadow})`);
                        fold.setAttribute("stroke-width", "5");
                        fold.setAttribute("fill", "none");

                        const g = document.createElementNS(svgNS, "g");
                        g.setAttribute("transform", 'translate(100,100) rotate(' + angle + ') scale(' + layer.scale + ') translate(-100,-100)');

                        g.appendChild(petal);
                        g.appendChild(fold);
                        petalsGroup.appendChild(g);
                    }
                });

                svg.appendChild(petalsGroup);

                const centerGroup = document.createElementNS(svgNS, "g");
                const centerBase = document.createElementNS(svgNS, "circle");
                centerBase.setAttribute("cx", "100");
                centerBase.setAttribute("cy", "100");
                centerBase.setAttribute("r", "32");
                centerBase.setAttribute("fill", `url(#${idCssPattern})`);

                const centerVignette = document.createElementNS(svgNS, "circle");
                centerVignette.setAttribute("cx", "100");
                centerVignette.setAttribute("cy", "100");
                centerVignette.setAttribute("r", "32");
                centerVignette.setAttribute("fill", `url(#${idCenterGrad})`);

                centerGroup.appendChild(centerBase);
                centerGroup.appendChild(centerVignette);

                const centerShadow = document.createElementNS(svgNS, "circle");
                centerShadow.setAttribute("cx", "100");
                centerShadow.setAttribute("cy", "100");
                centerShadow.setAttribute("r", "32");
                centerShadow.setAttribute("fill", "none");
                centerShadow.setAttribute("stroke", "rgba(0,0,0,0.6)");
                centerShadow.setAttribute("stroke-width", "3");
                centerGroup.appendChild(centerShadow);

                svg.appendChild(centerGroup);
                container.appendChild(svg);
            }

            document.querySelectorAll('.flor__petalos').forEach((container, index) => {
                createRealisticSunflower(container, index);
            });
        });
    