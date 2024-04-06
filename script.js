const baseUrl = 'https://api.football-data.org/v4/competitions/2000', token = '1f03d446703e470ba3bc872d47f6787c';

function showStanding() {
    const url = `${baseUrl}/standings`;

    axios.get(url, {
        headers: {
            'X-Auth-Token': token
        }
    })
    .then(response => {
        const standing = response.data.standings;
        document.querySelector('.standing').innerHTML = "";

        for (group of standing) {
            let table = '';
            for (team of group.table) {
                table += `
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col-sm-4 d-flex align-items-center justify-content-center">
                                <span class="flag">
                                    <img class="rounded-circle border border-2" src="${team.team.crest}" alt="">
                                </span>
                                <h5>${team.team.tla}</h5>
                            </div>
                            <div class="col-sm-2">${team.won}</div>
                            <div class="col-sm-2">${team.lost}</div>
                            <div class="col-sm-2">${team.draw}</div>
                            <div class="col-sm-2">
                                <b>${team.points}</b>
                            </div>
                        </div>
                    </li>
                `
            }
            let content = `
                <div class="col-sm-6 mb-4">
                    <div class="card text-center shadow border-none">
                        <div class="card-header bg-primary">
                            <b>${group.group}</b>
                        </div>
                        <div class="row bg-secondary m-0">
                            <div class="col-sm-4">Team</div>
                            <div class="col-sm-2">W</div>
                            <div class="col-sm-2">L</div>
                            <div class="col-sm-2">D</div>
                            <div class="col-sm-2">Points</div>
                        </div>
                        <ul class="list-group list-group-flush">
                            ${table}
                        </ul>
                    </div>
                </div>
            `
            document.querySelector('.standing').innerHTML += content;
        }
    })
}
showStanding();

function showMatch() {
    const url = `${baseUrl}/matches`;

    axios.get(url, {
        headers: {
            'X-Auth-Token': token
        }
    })
    .then(response => {
        const matches = response.data.matches;
        document.querySelector('.matches').innerHTML = "";

        for (match of matches) {
            let home = match.homeTeam, away = match.awayTeam, date = match.utcDate, time = new Date(date), timeString = 
                (time.getUTCMonth() + 1) + '/' + time.getUTCDate() + '\t' + time.getHours() + ' : ' + time.getMinutes();

            if(home.id == null) {
                break;
            }
            let content = `
                <div class="col-sm-12">
                    <div class="card mt-4 shadow rounded-pill">
                        <div class="card-body p-0">
                            <div class="row">
                                <div class="col-sm-3 bg-primary d-flex flex-column align-items-center justify-content-center">
                                    <div class="flag">
                                        <img class="rounded-circle border border-2" src="${home.crest}" alt="">
                                    </div>
                                    <h5>${home.tla}</h5>
                                </div>
                                <div class="col-sm-6 text-center">
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <h3>${match.score.fullTime.home ?? '_'}</h3>
                                        </div>
                                        <div class="col-sm-4">
                                            <h6>${match.group}</h6>
                                            <h1>X</h1>
                                            <h6>${timeString}</h6>
                                        </div>
                                        <div class="col-sm-4">
                                            <h3>${match.score.fullTime.away ?? '_'}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-sm-3 bg-primary d-flex flex-column align-items-center justify-content-center">
                                    <div class="flag">
                                        <img class="rounded-circle border border-2" src="${away.crest}" alt="">
                                    </div>
                                    <h5>${away.tla}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            document.querySelector('.matches').innerHTML += content;
        }
    })
}
showMatch();