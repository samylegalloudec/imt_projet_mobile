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
                        <ion-button size="small" color="dark">Voir les sessions</ion-button>
                    </center>
                </div>
                <div>
                    <center>
                        <ion-button size="small" color="dark">Voir les présentateurs</ion-button>
                    </center>
                </div>
            </ion-content>
        </div>
        `;
    }
});