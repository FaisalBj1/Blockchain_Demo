//general---

const timestamp = new Date().getTime();

const root = document.documentElement;

// css + font awesome
document.head.insertAdjacentHTML('beforeend', `
<link rel="stylesheet" href="/static/main-CSS_JS/style-01.css?dev=${timestamp}">
<link rel="stylesheet" href="/static/vendor/fontawesome-06/css/all.css?dev=${timestamp}">
<style>:root {display:none;}</style>
`);


// to prevent unstyled HTML flashing
window.addEventListener('load', () => {
    setTimeout(function() {
        // :root {display:none;} in the page.
        root.style.display = 'block';
    }, 250);//ms
});

// -------------------------------------------------------------------------------------------------------------------------------------
// theme control---

var theme = root.getAttribute('data-theme');

// initializing/retrieving the theme
// if ((localStorage.getItem("theme") != 'dark') && (localStorage.getItem("theme") != 'light')){
if (localStorage.getItem("theme") == null){
    root.setAttribute('data-theme', 'dark');
} else {
    root.setAttribute('data-theme', localStorage.getItem("theme"));
}

//storing the theme
const storeTheme = function(theme){
    localStorage.setItem("theme", theme);
}
window.addEventListener('load', () => {
    // Initialize the toggle icon based on the current theme
    updateToggleIcon();

    // Theme toggle
    document.getElementById('theme_icon').addEventListener('click', function () {
        // Toggle the theme
        if (theme === 'light') {
            root.setAttribute('data-theme', 'dark');
        } else {
            root.setAttribute('data-theme', 'light');
        }
        theme = root.getAttribute('data-theme');

        storeTheme(theme);

        // Update the toggle icon
        updateToggleIcon();
    });

    function updateToggleIcon() {
        // Update the toggle icon based on the current theme
        if (theme === 'dark') {
            document.getElementById('theme_icon').classList.add('fa-sun');
            document.getElementById('theme_icon').classList.remove('fa-moon');
        } else {
            document.getElementById('theme_icon').classList.remove('fa-sun');
            document.getElementById('theme_icon').classList.add('fa-moon');
        }
    }

});

// -------------------------------------------------------------------------------------------------------------------------------------
// header code---

class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                my-header {
                    width: 100%;
                    margin-bottom: auto;
                    backdrop-filter: blur(15px);
                    box-shadow: 0px 1px 31px 1px var(--shadow-color);
                }
                my-header * {
                    color: var(--primary-color);
                    text-decoration: none;
                }
                nav {
                    display: grid;
                    grid-template-areas: 'logo nav_menu icons';
                    padding: 0 1.5rem;
                    background: transparent;
                    margin: 0;
                    justify-content: stretch;
                }
                nav .logo {
                    grid-area: logo;
                    display: flex;
                    flex-direction: row;
                    justify-content: start;
                    align-items: center;

                }
                nav .icons {
                    grid-area: icons;
                    display: flex;
                    flex-direction: row;
                    justify-content: end;
                    align-items: center;
                    gap: 15px;
                }
                nav .menu {
                    grid-area: nav_menu;
                    display: flex;
                    flex-direction: row;
                }
                nav .menu ul{
                    width: 100%;
                    display: flex;
                    flex-direction: row;
                    gap: 21px;
                    transform: translate(-4rem);
                    place-content: center;
                }
                nav .menu * {
                    text-decoration: none;
                    list-style: none;
                }
                nav i {
                    font-size: 1.35rem;
                    cursor: pointer;
                }

                nav ul li:hover, nav ul a:hover, #theme_icon:hover {
                    transition: all 0.15s ease-out;
                    transform: scale(1.05);
                    filter: drop-shadow(0px 0px 1px var(--accent-color));
                    filter: drop-shadow(0px 0px 3px var(--accent-color));
                    filter: drop-shadow(0px 0px 5px var(--accent-color));
                    filter: drop-shadow(0px 0px 7px var(--accent-color));
                    filter: drop-shadow(0px 0px 9px var(--accent-color));
                    filter: drop-shadow(0px 0px 11px var(--accent-color));
                    filter: drop-shadow(0px 0px 13px var(--accent-color));
                    filter: drop-shadow(0px 0px 15px var(--accent-color));
                }
                nav ul li:not(hover) {
                    transition: all 0.25s ease-out;
                    transform: scale(1);
                }

                .menu_icon_anim {
                    display: none;
                    cursor: pointer;
                }
                .menu_icon_anim input {
                    display: none;
                }
                .menu_icon_anim svg {
                    /* The size of the SVG defines the overall size */
                    height: 2rem;
                    /* Define the transition for transforming the SVG */
                    transition: transform 750ms cubic-bezier(0.4, 0, 0.2, 1);
                }
                .line {
                    fill: none;
                    stroke: var(--primary-color);
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-width: 3;
                    /* Define the transition for transforming the Stroke */
                    transition: stroke-dasharray 750ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 750ms cubic-bezier(0.4, 0, 0.2, 1);
                }
                .line-top-bottom {
                    stroke-dasharray: 12 63;
                }
                .line-top-bottom {
                    stroke-dasharray: 12 63;
                }
                .menu_icon_anim input:checked + svg {
                    transform: rotate(-45deg);
                }
                .menu_icon_anim input:checked + svg .line-top-bottom {
                    stroke-dasharray: 20 300;
                    stroke-dashoffset: -32.42;
                }

                /* style for smaller screens */
                @media (max-width: 50rem){
                    .menu_icon_anim {
                        display: block;
                    }
                    nav {
                        grid-template-areas:
                        'logo icons'
                        'nav_menu nav_menu';
                        padding: 0.5rem 1.5rem;
                    }
                    nav .menu {
                        display: none;
                    }
                    nav .menu ul{
                        flex-direction: column;
                        transform: translate(-1.5rem);
                    }
                    nav #toggle-02:checked ~ .menu {
                        display: block;
                        animation: menu_slide 0.75s ease-out;
                    }
                }

                @keyframes menu_slide {
                    from {
                        opacity: 0;
                        transform: translateY(-17px);
                    } to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>

            <nav>
                <a class="logo" href="/" style="font-weight: bold;">block drive - Blockchain based app</a>

                <input type="checkbox" id="toggle-02" style="display: none;">
                <div class="icons">
                    <label class="menu_icon_anim" id="menu_icon" for="toggle">
                        <input type="checkbox" id="toggle" style="display: none;">
                        <svg viewBox="0 0 32 32">
                        <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                        <path class="line" d="M7 16 27 16"></path>
                        </svg>
                    </label>
                    <div>
                        <label><i id="theme_icon" class="fa-solid fa-sun"></i></label>
                    </div>
                </div>

                <div class="menu">
                    <ul>
                        <li><a href="/mine_page">MINE</a></li>
                        <li><a href="/configure">CONFIGURE</a></li>
                    </ul>
                </div>
            </nav>
            `
    }
}

customElements.define('my-header', MyHeader)

window.addEventListener('load', () => {
    document.getElementById('menu_icon').addEventListener('click', function() {
        if (document.getElementById('toggle').checked) {
            document.getElementById('toggle-02').checked = true;
        } else {
            document.getElementById('toggle-02').checked = false;
        }
    });
});

// -------------------------------------------------------------------------------------------------------------------------------------
// footer code---

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                my-footer{
                    /*position: absolute;
                    bottom:0;
                    z-index: 9999999;*/
                    box-sizing: border-box;
                    width: 100%;
                    margin-top: auto;
                    background: transparent;
                    backdrop-filter: blur(15px);
                    box-shadow: 0px 1px 31px 1px var(--shadow-color);
                }
                footer {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    text-align: center;
                    align-items: center;
                    gap: 1.5rem;
                    padding: 25px 25px 11px 25px;
                }
                    footer a {
                        color: var(--accent-color);
                        text-decoration: none;
                    }
                    footer p {
                        color: var(--accent-color);
                        font-size: 0.75rem;
                    }
                    footer .social_media_container {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 7px;
                    }
                    footer .social_media_container a i {
                        font-size: 1.75rem;
                        color: var(--text-color);
                    }
                    footer .social_media_container a i:hover {
                        transform: scale(1.15);
                        transition: transform 0.25s ease-out;
                        color: var(--accent-color);
                    }
                    footer .social_media_container a i:not(hover) {
                        transform: scale(1);
                        transition: transform 0.25s ease-out;
                    }
                    footer .copyright p a {
                        color: var(--text-color);
                    }
            </style>

            <footer>
                <div class="social_media_container">
                    <a href="https://facebook.com/" target="_blank" aria-placeholder="hello"><i class="fa-brands fa-square-facebook"></i></a>
                    <a href="https://instagram.com/FaisalBj1" target="_blank"><i class="fa-brands fa-square-instagram"></i></a>
                    <a href="https://t.snapchat.com/Eo0muP3W" target="_blank"><i class="fa-brands fa-square-snapchat"></i></a>
                    <a href="https://x.com/FaisalBj1" target="_blank"><i class="fa-brands fa-square-x-twitter"></i></a>
                    <a href="https://wa.me/+966562629866" target="_blank"><i class="fa-brands fa-square-whatsapp"></i></a>
                    <a href="https://www.linkedin.com/in/faisal-banjar-943b791ba/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/FaisalBj1" target="_blank"><i class="fa-brands fa-square-github"></i></a>
                </div>

                <div class='copyright'>
                    <p>Copyright ©${new Date().getFullYear()} All rights reserved | Desined & Developed by <a href="http://FaisalBj1.com" target="_blank">FaisalBj1</a></p>
                </div>
            </footer>
            `
    }
}

customElements.define('my-footer', MyFooter)

// -------------------------------------------------------------------------------------------------------------------------------------
// TEST---
