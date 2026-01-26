(function() {
    const style = document.createElement('style');
    style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;500;800&display=swap');

        #login-screen {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            display: flex; z-index: 9999; background: #0b0f1a;
            font-family: 'Plus Jakarta Sans', sans-serif; transition: 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }
        
        .photo-side {
            flex: 1.4; height: 100%; position: relative; overflow: hidden;
            background: #000; 
            cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='white' stroke='%232563eb' stroke-width='1.5'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>") 16 16, auto;
        }

        /* WRAPPER BLUR SEKARANG JADI CONTAINER LOADER JUGA */
        .blur-wrapper {
            width: 100%; height: 100%; position: absolute;
            display: flex; align-items: center; justify-content: center; /* Center si loader */
            transition: filter 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s ease;
            filter: blur(40px) brightness(0.3);
            transform: scale(1.1);
        }
        .photo-side:hover .blur-wrapper {
            filter: blur(0px) brightness(0.8);
            transform: scale(1);
        }

/* LOADER DI POJOK KIRI ATAS */
        .loader-heart {
            position: absolute; 
            top: 60px; 
            left: 20px; 
            width: 40px; 
            height: 40px; 
            z-index: 150; 
            opacity: 0; 
            pointer-events: none;
            transition: opacity 0.3s ease; 
            fill: #2563eb;
        }
        .loader-heart.visible { opacity: 1; }
        .loader-heart svg { animation: heart-pulse 1.2s ease-in-out infinite; }       
        @keyframes heart-pulse {
            0% { transform: scale(1); filter: drop-shadow(0 0 5px #2563eb); }
            50% { transform: scale(1.2); filter: drop-shadow(0 0 20px #2563eb); }
            100% { transform: scale(1); filter: drop-shadow(0 0 5px #2563eb); }
        }

        .marquee-header {
            position: absolute; top: 0; left: 0; width: 100%; 
            background: #2563eb; padding: 15px 0; z-index: 100;
            overflow: hidden; border-bottom: 2px solid rgba(255,255,255,0.1);
        }
        .marquee-content { display: flex; width: 200%; animation: marquee-satset 10s linear infinite; }
        .marquee-text { width: 50%; color: white; font-weight: 800; font-size: 16px; letter-spacing: 5px; text-align: center; }
        
        @keyframes marquee-satset {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
        }

        .bg-layer {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover; background-position: center;
            transition: opacity 1.5s ease; opacity: 0;
        }
        .bg-layer.active { opacity: 1; }

        .heart-particle {
            position: absolute; pointer-events: none; width: 45px; height: 45px;
            fill: #ff4d6d; z-index: 150;
            filter: drop-shadow(0 0 10px rgba(255, 77, 109, 0.8));
            animation: ambyar-physics 0.8s cubic-bezier(0.15, 1, 0.3, 1) forwards;
        }
        @keyframes ambyar-physics {
            0% { transform: translate(0, 0) scale(0) rotate(0deg); opacity: 1; }
            100% { transform: translate(var(--tx), var(--ty)) scale(1.3) rotate(var(--tr)); opacity: 0; }
        }

        .login-side {
            width: 480px; height: 100%; background: #0f172a; 
            display: flex; flex-direction: column; justify-content: center;
            padding: 0 70px; box-sizing: border-box; border-left: 1px solid rgba(255,255,255,0.05);
        }
        
        .title-wrapper { display: flex; align-items: center; gap: 15px; margin-bottom: 10px; }
        .circle-pulse {
            width: 10px; height: 10px; background: #2563eb; border-radius: 50%;
            position: relative; box-shadow: 0 0 10px #2563eb;
        }
        .circle-pulse::after {
            content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            border-radius: 50%; background: #2563eb; animation: pulse-ring 2s infinite;
        }
        @keyframes pulse-ring { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(3); opacity: 0; } }

        .login-side h1 { color: #fff; font-size: 26px; font-weight: 700; margin: 0; }
        .login-side p { color: #64748b; font-size: 14px; margin-bottom: 40px; font-weight: 300; }
        
        .input-box input { 
            width: 100%; padding: 18px 20px; border-radius: 16px; margin-bottom: 20px;
            border: 1px solid #1e293b; background: rgba(30, 41, 59, 0.5); color: #fff;
            box-sizing: border-box; outline: none; transition: 0.3s; font-family: inherit;
        }
        .input-box input:focus { border-color: #2563eb; background: #0b0f1a; }
        
        .btn-auth {
            width: 100%; padding: 18px; border: none; border-radius: 16px;
            background: #2563eb; color: white; font-weight: 600; cursor: pointer;
            transition: 0.4s; font-family: inherit; font-size: 15px;
        }
        .btn-auth:hover { background: #3b82f6; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(37, 99, 235, 0.3); }

        .login-footer {
            margin-top: 25px; text-align: center;
            color: rgba(100, 116, 139, 0.5); font-size: 11px;
            letter-spacing: 2px; text-transform: uppercase; font-weight: 700;
        }

        body.logged-in .container { opacity: 1; filter: blur(0); pointer-events: auto; }
        .container { opacity: 0; filter: blur(30px); pointer-events: none; transition: 1.5s ease; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-10px); } 60% { transform: translateX(10px); } }
    `;
    document.head.appendChild(style);

    const loginHTML = `
        <div id="login-screen">
            <div class="photo-side" id="photo-gallery">
                <div class="blur-wrapper">
                    <div id="heart-loader" class="loader-heart">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </div>
                    
                    <div class="marquee-header">
                        <div class="marquee-content">
                            <div class="marquee-text">GIRLS PREVIEW IMAGE</div>
                            <div class="marquee-text">GIRLS PREVIEW IMAGE</div>
                        </div>
                    </div>
                    <div id="layer-1" class="bg-layer"></div>
                    <div id="layer-2" class="bg-layer"></div>
                </div>
            </div>
            <div class="login-side" id="form-container">
                <div class="title-wrapper">
                    <div class="circle-pulse"></div>
                    <h1>Rowx Dashboard</h1>
                </div>
                <p>Generate smartlinks for dating cpa networks.</p>
                <div class="input-box">
                    <input type="password" id="app_password" placeholder="Key Phrase">
                </div>
                <button class="btn-auth" id="login-btn">Authorize Session</button>
                <div class="login-footer">From Arawhy Rowx 2026</div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', loginHTML);

const _0xKEY = "cm93eDIwMjY="; 
	let imgList = [];
    let activeLayer = 1;

    // LOVE AMBYAR LOGIC
    document.getElementById('photo-gallery').addEventListener('click', function(e) {
        for(let i = 0; i < 12; i++) {
            const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            heart.setAttribute("viewBox", "0 0 24 24");
            heart.setAttribute("class", "heart-particle");
            heart.innerHTML = '<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>';
            heart.style.left = (e.clientX - 22) + 'px';
            heart.style.top = (e.clientY - 22) + 'px';
            const tx = (Math.random() - 0.5) * 400, ty = (Math.random() - 0.5) * 400, tr = Math.random() * 720;
            heart.style.setProperty('--tx', tx + 'px');
            heart.style.setProperty('--ty', ty + 'px');
            heart.style.setProperty('--tr', tr + 'deg');
            this.appendChild(heart);
            setTimeout(() => heart.remove(), 800);
        }
    });

    async function initGallery() {
        try {
            const r = await fetch("https://raw.githubusercontent.com/ahbabulley/generat/refs/heads/main/pumba.json");
            imgList = await r.json();
            swapImg();
            setInterval(swapImg, 7000);
        } catch(err) { console.log("Gallery error"); }
    }

    function swapImg() {
        if(!imgList.length) return;
        const target = imgList[Math.floor(Math.random() * imgList.length)];
        const loader = document.getElementById('heart-loader');
        
        loader.classList.add('visible');

        const tempImg = new Image();
        tempImg.src = target;
        tempImg.onload = () => {
            const l1 = document.getElementById('layer-1'), l2 = document.getElementById('layer-2');
            
            if(activeLayer === 1) {
                l2.style.backgroundImage = "url('" + target + "')";
                l2.classList.add('active'); l1.classList.remove('active'); activeLayer = 2;
            } else {
                l1.style.backgroundImage = "url('" + target + "')";
                l1.classList.add('active'); l2.classList.remove('active'); activeLayer = 1;
            }
            
            loader.classList.remove('visible');
        };
    }

function handleAuth() {
    const passwordInput = document.getElementById('app_password');
    const screen = document.getElementById('login-screen');
    const form = document.getElementById('form-container');

if(btoa(passwordInput.value) === _0xKEY) {
        screen.style.opacity = '0'; 
        screen.style.transform = 'scale(1.1)';
        screen.style.pointerEvents = 'none';

        // 2. Munculkan dashboard sedikit lebih cepat sebelum screen login benar-benar hilang
        setTimeout(() => {
            document.body.classList.add('logged-in');
        }, 400); // Jeda pendek agar transisinya terasa menyatu (overlap)

        // 3. Hapus elemen login dari DOM setelah transisi selesai
        setTimeout(() => { 
            screen.remove(); 
        }, 1200);
    } else {
        form.style.animation = 'shake 0.4s ease';
        setTimeout(() => form.style.animation = '', 400);
    }
}
    initGallery();
    document.getElementById('login-btn').addEventListener('click', handleAuth);
    document.getElementById('app_password').addEventListener('keypress', (e) => { if(e.key === "Enter") handleAuth(); });
})();

