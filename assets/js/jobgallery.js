class AppletGallery {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.appletgallery = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderAppletGallery(this.appletgallery); 
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.appletgallery = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderAppletGallery(appletgallery) {
        const appletgalleryCont = document.getElementById('appletgalleryCont');
        appletgalleryCont.innerHTML = appletgallery.map(applet => 
            `<div class="card">
                <img src="${applet.Image}" class="card-img-top image" alt="${applet.Applet_No}">
                <div class="card-body">
                    <h5 class="card-title">${applet.Applet_No}</h5>
                    <p class="card-text">${applet.Description}</p>
                </div>
            </div>`
        ).join('');
    }

    bindSearchEvent() {
        const appletSearchBar = document.getElementById('appletSearchBar'); 

        appletSearchBar.addEventListener('input', () => {
            this.filterApplet(appletSearchBar.value);
        });
    }

    filterApplet(query) {
        const filteredApplet = this.appletgallery.filter(applet => {
            return applet.Applet_No.toLowerCase().includes(query.toLowerCase());
        });

        this.renderAppletGallery(filteredApplet);
    }
}

// Initialize AppletGallery with JSON data
const appletgallery = new AppletGallery('./assets/json/job.json');
