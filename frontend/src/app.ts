const app = document.getElementById('app');
const searchButton = document.getElementById('search');

searchButton?.addEventListener('click', onSearch);

async function onSearch() {
    const BASE_URI = 'http://localhost:3001/btc-stats/';

    const start = (<HTMLInputElement>document.getElementById('start')).value; 
    const end = (<HTMLInputElement>document.getElementById('end')).value; 

    if (!start || !end) return;

    console.log({ start, end});
    let btcData: { 
        data: { date: string, price: number}[],
        stats: {
            count: number,
            max: number,
            min: number,
            average: number,
            variation: string
        }
    };
    const response = await fetch(`${BASE_URI}?start=${encodeURI(start)}&end=${encodeURI(end)}&rnd=${Math.random()*100000000}`);
    const responseJson = await response.json();
    console.log(responseJson);
    
    const tableOpen = '<div class="col-6"><table class="table table-sm table-hover">';
    const tableHeader = '<thead><tr><th>Date</th><th>Price</th></tr></thead>';
    let tableBody = '';
    responseJson.data.forEach(row => {
        tableBody += `<tr><td>${row.date.slice(0,10)}</td><td>${row.price}</td></tr>`;
    });
    const tableClose = '</table></div>';

    const table = [tableOpen, tableHeader, tableBody, tableClose].join("\n");

    app.innerHTML = table;

    const statsListContainer = document.createElement('div');
    statsListContainer.classList.add('col-6');
    let statListItems = '';
    for (let stat in responseJson.stats) {
        statListItems += `<dt class="col-3"><span class="stats-title">${stat}:</span></dt>`;
        statListItems += `<dd class="col-9"><span class="stats-value">${responseJson.stats[stat]}</dd>`
    }
    statsListContainer.innerHTML = `<div class="container-fluid"><div class="row">&nbsp;</div><div class="row">&nbsp;</div><dl class="stats-list row">${statListItems}</dl></div>`;
    app.appendChild(statsListContainer);
}
