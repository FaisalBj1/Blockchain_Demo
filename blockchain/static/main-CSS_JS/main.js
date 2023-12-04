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

root.setAttribute('data-theme', 'light');
const currentTheme = root.getAttribute('data-theme');

// initializing the theme the toggle icon/btn.
window.addEventListener('load', () => {
    // inetializing the toggle icon.
    if (currentTheme === 'light') {
        document.getElementById('light_icon_li').style.display = 'none';
        document.getElementById('dark_icon_li').style.display = 'block';
    } else {
        document.getElementById('light_icon_li').style.display = 'block';
        document.getElementById('dark_icon_li').style.display = 'none';
    }
});

// theme toggle
function toggleTheme() {
    // const root = document.documentElement;
    // const currentTheme = root.getAttribute('data-theme');

    if (currentTheme === 'light') {
        root.setAttribute('data-theme', 'dark');
        document.getElementById('light_icon_li').style.display = 'block';
        document.getElementById('dark_icon_li').style.display = 'none';
    } else {
        root.setAttribute('data-theme', 'light');
        document.getElementById('light_icon_li').style.display = 'none';
        document.getElementById('dark_icon_li').style.display = 'block';
    }
}

// -------------------------------------------------------------------------------------------------------------------------------------
// header code---

class MyHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                body {
                    height: 100svh;
                }

                header ,my-header {
                    width: 100%;
                    margin-bottom: auto;
                    border-bottom: solid 0.25px var(--primary-color);
                    backdrop-filter: blur(15px);
                    text-decoration=none;
                    box-shadow: 0px 5px 11px 0px var(--shadow-color);
                }

                nav {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    text-align: center;
                    align-items: center;
                    padding: 0.5rem 1.5rem;
                    background: transparent;
                    margin: 0;
                }

                        
                nav label i:hover, .logo:hover, ul li:hover {
                    transition: all 0.1s ease-out;
                    transform: scale(1.05);
                }
                nav label i:not(hover), .logo:not(hover), ul li:not(hover) {
                    transition: all 0.15s ease-out;
                    transform: scale(1);
                }

                nav ul {
                    list-style: none;
                    display: flex;
                    gap: 2rem;
                    padding: 0;
                    margin: 0;
                }
                nav :where(a, ul li, i) {
                    color: var(--primary-color);
                    text-decoration: none;
                    cursor: pointer;
                }

                header, a:hover {
                    text-decoration: none;
                    color: var(--primary-color);
                }

                #toggle_icon {
                    display: none;
                }

                /* style for smaller screens */
                @media (max-width: 50rem){
                    #toggle_icon {
                        display: block;
                    }
                    nav .menu{
                        width: 100%;
                        /* height: 100svh; */
                        display: none;
                    }
                    nav ul {
                        flex-direction: column;
                        align-items: center;
                        padding: 0.5rem 0;
                    }
                    nav label {
                        color: var(--text-color);
                        cursor: pointer;
                    }
                    nav #toggle:checked ~ .menu {
                            display: block;
                            animation: slideIn 0.75s ease-out;
                                                        
                    }   
                }

                @keyframes slideIn {
                    from {
                        opacity: 0;
                        transform: translateY(-9px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                } 
            </style>

            <header>
                <nav>
                    <a href="/" class="logo" style="font-weight: bold;">BLOCKCHAIN MINER</a>
                    <input type="checkbox" name="" id="toggle" style="display: none;">
                    <label for="toggle" id="toggle_icon"><i class="fa-solid fa-bars"></i></label>
                    <div class="menu">
                        <ul>
                            <li><a href="/mine_page">MINE</a></li>
                            <li><a href="/configure">CONFIGURE</a></li>
                            <li id="light_icon_li"><label id="light_icon"><i class="fa-solid fa-sun"  onclick="toggleTheme()"></i></label></li>
                            <li id="dark_icon_li"><label id="dark_icon" ><i class="fa-solid fa-moon" onclick="toggleTheme()"></i></label> </li>
                        </ul>
                    </div>
                </nav>
            </header>
            `
    }
}

customElements.define('my-header', MyHeader)

// -------------------------------------------------------------------------------------------------------------------------------------
// footer code---

class MyFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <style>
                body {
                    height: 100svh;
                }

                footer, my-footer{
                    border-top: solid 1px var(--primary-color);
                    backdrop-filter: blur(15px);
                    box-sizing: border-box;
                    display: flex;
                    flex-direction: column;
                    justify-content:space-evenly;
                    text-align: center;
                    align-items: center;

                    margin-top: auto;
                    gap: 1em;
                    padding: 0;
                    width: 100%;
                    box-shadow: 0px -5px 11px 0px var(--shadow-color);
                }
                    footer a {
                        color: var(--accent-color);
                        text-decoration: none;
                    }
                    footer p {
                        color: var(--accent-color);
                        font-size: 0.75rem;
                    }
                    footer .footer-heading {
                        color: transparent;
                        font-weight: 100;
                        font-size: 2.5rem;
                        -webkit-text-stroke: 0.025rem var(--text-color);
                        text-transform: uppercase;
                        letter-spacing: 3px;
                    }
                    .social_media_container {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 7px;
                    }
                    .social_media_container a i {
                        font-size: 1.75rem;
                        color: var(--text-color);
                    }
                    .social_media_container a i:hover {
                        transform: scale(1.15);
                        transition: transform 0.25s ease-out;
                        color: var(--accent-color);
                    }
                    .social_media_container a i:not(hover) {
                        transform: scale(1);
                        transition: transform 0.25s ease-out;
                    }

                    p a {
                        color: var(--text-color);

                    }


            </style>    
            
            <footer>
                <!-- <a href="#">LOGO</a> -->
                <br/>
            
                <div class="social_media_container">
                    <a href="https://facebook.com/" target="_blank" aria-placeholder="hello"><i class="fa-brands fa-square-facebook"></i></a>
                    <a href="https://instagram.com/FaisalBj1" target="_blank"><i class="fa-brands fa-square-instagram"></i></a>
                    <a href="https://t.snapchat.com/Eo0muP3W" target="_blank"><i class="fa-brands fa-square-snapchat"></i></a>
                    <a href="https://x.com/FaisalBj1" target="_blank"><i class="fa-brands fa-square-x-twitter"></i></a>
                    <a href="https://wa.me/+966562629866" target="_blank"><i class="fa-brands fa-square-whatsapp"></i></a>
                    <a href="https://www.linkedin.com/in/faisal-banjar-943b791ba/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                    <a href="https://github.com/FaisalBj1" target="_blank"><i class="fa-brands fa-square-github"></i></a>
                </div>
        
                <div>
                    <p>Copyright ©${new Date().getFullYear()} All rights reserved | Designed & Developed by <a href="http://FaisalBj1.com" target="_blank">FaisalBj1</a></p>
                </div>
            </footer>
            `
    }
}

customElements.define('my-footer', MyFooter)

// -------------------------------------------------------------------------------------------------------------------------------------
// TEST---

//window.location.href = '/example';

function test(){
    console.log("Function [test()] in [main.js] is successfully executed.");
};

// console.log("TEST");
