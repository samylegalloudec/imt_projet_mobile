(function () {
    'use strict';
    if (!('serviceWorker' in navigator)) {
        console.log('Service worker non supporté');
        return;
    }
    navigator.serviceWorker.register('sw.js')
        .then(() => {
            console.log('Enregistrement OK');
        })
        .catch(error => {
            console.log('Enregistrement KO :', error);
        });
})();


async function openMenu() {
    await menuController.open();
}

function showDetail(element) {
    console.log(element);
}

let menuItems = [
    {
        'title': 'Sessions',
        'icon': 'mic-outline'
    },
    {
        'title': 'Présentateurs',
        'icon': 'body'
    }
];

let apiUrl = new Map();
apiUrl.set('Sessions', 'https://devfest-nantes-2018-api.cleverapps.io/sessions');
apiUrl.set('Présentateurs', 'https://devfest-nantes-2018-api.cleverapps.io/speakers');


customElements.define('nav-home', class NavHome extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <ion-menu side="end" content-id="main-content">
            <ion-content>
                <ion-list>
                    ${menuItems.map(item => `
                    <ion-item button onclick="showDetail('${item.title}')">
                        <ion-icon name="${item.icon}" slot="start"></ion-icon>
                        <ion-label>${item.title}</ion-label>
                    </ion-item>
                    `).join('\n')}
                </ion-list>
            </ion-content>
        </ion-menu>
        <div class="ion-page" id="main-content">
            <ion-header>
                <ion-toolbar>
                    <ion-buttons slot="end">
                        <ion-menu-button></ion-menu-button>
                    </ion-buttons>
                    <ion-title>Conférence</ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <center>
                    <ion-img style="width: 30%; height: 30%;" src="images/IMT_Atlantique_logo.png" />
                </center>
                <div>
                    <center>
                        <ion-text>
                            <h1><b>
                                    Conférence
                                </b></h1>
                        </ion-text>
                    </center>
                    <center>
                        <ion-text>
                            Date de début - Date de fin
                        </ion-text>
                    </center>
                </div>
                <div>
                    <center>
                        <ion-button size="small" color="dark" onclick=showDetail('Sessions')>Voir les sessions</ion-button>
                    </center>
                </div>
                <div>
                    <center>
                        <ion-button size="small" color="dark" onclick=showDetail('Présentateurs')>Voir les présentateurs</ion-button>
                    </center>
                </div>
            </ion-content>
        </div>
        `;
    }
});

const nav = document.querySelector('ion-nav');

function showDetail(title) {
    const selectedItem = menuItems.find(item => item.title === title);

    nav.push('nav-detail', { selectedItem })
}

async function getData(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

function showDataDetail(item) {
    console.log(item);
}

customElements.define('nav-detail', class NavDetail extends HTMLElement {

    connectedCallback() {
        getData(apiUrl.get(this.selectedItem.title)).then(response => {
            let data = [];
            for (let element of Object.entries(response)) {
                data.push(element[1]);
            }
            this.innerHTML = `
                <ion-header translucent>
                <ion-toolbar>
                    <ion-buttons slot="start">
                    <ion-back-button defaultHref="/"></ion-back-button>
                    </ion-buttons>
                    <ion-title>${this.selectedItem.title}</ion-title>
                </ion-toolbar>
                </ion-header>
                <ion-content fullscreen class="ion-padding">
                    <ion-list>
                    ${data.map(item => `
                        <ion-item button onclick="showDataDetail('${item}}')">
                            <ion-label>${this.selectedItem.title === "Sessions" ? item.title : item.name}</ion-label>
                        </ion-item>
                    `).join('\n')}
                    </ion-list>
                </ion-content>
            `;
        });
    }
});

