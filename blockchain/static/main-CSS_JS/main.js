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

window.addEventListener('load', () => {
    const colorThemes = document.querySelectorAll('[name="theme"]');

    // set theme when visitor returns
    const setTheme = function () {
        const activeTheme = localStorage.getItem("theme");
        colorThemes.forEach((themeOption) => {
            if (themeOption.id === activeTheme) {
                themeOption.checked = true;
            }
        });
        root.setAttribute('data-theme', activeTheme);
    };


    // store theme
    const storeTheme = function (theme) {
        localStorage.setItem("theme", theme);
    };


    // Initializing the theme
    function isThemeInLocalStorage() {
        return localStorage.getItem('theme') !== null;
        }

    if (isThemeInLocalStorage()) {
        // 'theme' exists in local storage
        console.log('Theme exists:', localStorage.getItem('theme'));
    } else {
        // 'theme' does not exist in local storage
        console.log('Theme does not exist in local storage');
        root.setAttribute('data-theme', 'darkness');
        localStorage.setItem("theme", 'darkness');

        const activeTheme = localStorage.getItem("theme");
        colorThemes.forEach((themeOption) => {
            if (themeOption.id === activeTheme) {
                themeOption.checked = true;
            }
        });
        root.setAttribute('data-theme', activeTheme);
    }

    colorThemes.forEach((themeOption) => {
        themeOption.addEventListener("click", () => {
            storeTheme(themeOption.id);
            root.setAttribute('data-theme', themeOption.id);
        });
    });

    document.onload = setTheme();
});

// -------------------------------------------------------------------------------------------------------------------------------------
// header code---

class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <!-- header / nav  -->
            <style>
                my-header {
                    position: relative;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999999;
                    min-width: 100vw;
                    margin-bottom: auto;
                    backdrop-filter: blur(15px);
                    box-shadow: 0px 1px 31px 1px var(--shadow-color);
                }
                header {
                    display: flex;
                    flex-direction: column;
                    min-width: 100%;
                }

                header * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    color: var(--primary-color);
                }

                nav {
                    box-sizing: border-box;
                    border-bottom: solid 1px var(--primary-color);
                    min-width: 100%;
                    display: flex;
                    justify-content: space-between;
                    margin: 0;
                    padding: 9px 15px;
                }

                nav .logo {
                    order: 1;
                    font-weight: 900;
                }

                nav .logo a {
                    text-decoration: none;
                }

                nav .icons {
                    order: 3;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 15px;
                }

                nav #menu_toggle {
                    cursor: pointer;
                    display: none;
                }

                nav #theme_toggle {
                    cursor: pointer;
                }

                .menu {
                    order: 2;
                }

                .menu *{
                    text-decoration: none;
                    list-style: none;
                    font-weight: 500;
                }

                .menu ul {
                    display: flex;
                    gap: 15px;
                }

                #menu-1 {
                    transform: translate(-3rem);
                }

                #menu-2 {
                    display: none;
                    justify-content: center;
                    padding: 15px 5px;
                    border-bottom: solid 1px var(--primary-color);
                    animation: fade_in 250ms ease-in-out;
                }
                #menu-2 ul {
                    flex-direction: column;
                }

                .themes {
                    order: 5;
                    padding: 10px 0;
                    border-bottom: solid 1px var(--primary-color);
                    display: none;
                    justify-content: center;
                    animation: fade_in 250ms ease-in-out;
                }

                /* style for different screens */
                /* [laptop] */
                @media screen and (min-width: 1025px){

                }
                /* [ipad] */
                @media screen and (min-width: 768px) and (max-width: 1024px) {
                    nav #menu_toggle {
                        display: block;
                    }
                    #menu-1 {
                        display: none;
                    }
                }
                /* [phone] */
                @media screen and (max-width: 767px){
                    nav #menu_toggle {
                        display: block;
                    }
                    #menu-1 {
                        display: none;
                    }
                }
            </style>

            <!-- themes options -->
            <style>
                .visually-hidden {
                    clip: rect(0 0 0 0);
                    clip-path: inset(50%);
                    height: 1px;
                    overflow: hidden;
                    position: absolute;
                    white-space: nowrap;
                    width: 1px;
                }

                .color-picker > fieldset {
                    border: 0;
                    display: flex;
                    gap: 1rem;
                    width: fit-content;
                    padding: 0;
                    margin: 0;
                    border-radius: 0 0 1rem 1rem;
                }

                .color-picker input[type="radio"] {
                    appearance: none;
                    width: .5rem;
                    height: .5rem;
                    aspect-ratio: 1/1;
                    outline: 2px solid var(--radio-color, currentColor);
                    outline-offset: 1.5px;
                    border-radius: 50%;
                    cursor: pointer;
                }

                .color-picker input[type="radio"]:checked {
                    background-color: var(--radio-color);
                }

                .color-picker input[type="radio"]#light {
                    --radio-color: rgb(188, 188, 255);
                }
                .color-picker input[type="radio"]#dark {
                    --radio-color: rgb(81, 81, 172);
                }
                .color-picker input[type="radio"]#darkness {
                    --radio-color: rgb(0, 0, 0);
                }
            </style>

            <!-- menu toggle icon -->
            <style>
                .menu_icon_animation svg {
                    /* The size of the SVG defines the overall size */
                    height: 1.5rem;
                    /* Define the transition for transforming the SVG */
                    transition: transform 750ms cubic-bezier(0.4, 0, 0.2, 1);
                    cursor: pointer;
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
                .menu_icon_animation input:checked + svg {
                    transform: rotate(-45deg);
                }
                .menu_icon_animation input:checked + svg .line-top-bottom {
                    stroke-dasharray: 20 300;
                    stroke-dashoffset: -32.42;
                }
            </style>


            <header>
                <nav>
                    <div class="logo"><a href="/">Blockchain Demo - Miner</a></div>

                    <div class="icons">
                        <label class="menu_icon_animation" for="toggle">
                            <input type="checkbox" id="toggle" style="display: none;">
                            <svg id="menu_toggle" viewBox="0 0 32 32">
                            <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                            <path class="line" d="M7 16 27 16"></path>
                            </svg>
                        </label>
                        <i id="theme_toggle" class="fa-solid fa-circle-half-stroke"></i>
                    </div>

                <div id="menu-1" class="menu">
                    <ul>
                        <li><a href="/mine_page">MINE</a></li>
                        <li><a href="/configure">CONFIGURE</a></li>
                    </ul>
                </div>
            </nav>

                <div id="menu-2" class="menu">
                    <ul>
                        <li><a href="/mine_page">MINE</a></li>
                        <li><a href="/configure">CONFIGURE</a></li>
                    </ul>
                </div>

                <div id="themes" class="themes">
                    <form class="color-picker" action="">
                        <fieldset>
                            <legend class="visually-hidden">Pick a color scheme</legend>
                            <label for="light" class="visually-hidden">light theme</label>
                            <input type="radio" id="light" name="theme">

                            <label for="dark" class="visually-hidden">dark theme</label>
                            <input type="radio" id="dark" name="theme">

                            <label for="darkness" class="visually-hidden">darkness theme</label>
                            <input type="radio" id="darkness" name="theme">
                        </fieldset>
                    </form>
                </div>
            </header>
            `
    }
}

customElements.define('my-header', MyHeader)

// themes & nav menu toggles
window.addEventListener('load', () => {
    document.getElementById('theme_toggle').addEventListener('click', function () {
        if (document.getElementById('themes').style.display == 'flex'){
            document.getElementById('themes').style.display = 'none';
        } else {
            document.getElementById('themes').style.display = 'flex';
        }
    });

    document.getElementById('menu_toggle').addEventListener('click', function () {
        if (document.getElementById('menu-2').style.display == 'flex'){
            document.getElementById('menu-2').style.display = 'none';
        } else {
            document.getElementById('menu-2').style.display = 'flex';
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
                    position: relative;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    z-index: 9999999;
                    min-width: 100vw;
                    margin-top: auto;
                    background: transparent;
                    backdrop-filter: blur(15px);
                    box-shadow: 0px 1px 31px 1px var(--shadow-color);
                }
                footer {
                    min-width: 100%;
                    box-sizing: border-box;
                    border-top: solid 1px var(--primary-color);
                    backdrop-filter: blur(15px);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    text-align: center;
                    align-items: center;
                    gap: 1rem;
                    padding: 9px 15px;
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
