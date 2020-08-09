let url = 'http://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=221380'
// bad url let url = 'http://bpi.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?gameid=221380'

const fetch = require('node-fetch');

class Achievement {

    constructor(name, percent) {
        this.name = name;
        this.percent = percent;
    }

    printValues() {
        if (this.percent <= 0.2) {
            console.log(`No one has completed the achievement ${this.name}.`)
        } else if (this.percent < 1.0) {
            console.log(`Almost no one has completed the achievement ${this.name}.`)
        } else {
            console.log(`${this.name} achievement has been completed by ${this.percent} % of people.`)
        }
    }
}

async function fetchData(url) {
    let response = await fetch(url);
    let jsonResponse = await response.json();
    printData(jsonResponse);
}

function printData(jsonData) {
    var achievemenstArray = [];
    let jsonObject = jsonData['achievementpercentages'];
    let achievements = jsonObject['achievements'];
    for (let achievement of achievements) {
        let name = achievement['name'];
        let percent = achievement['percent'].toFixed(2);
        let newAchievement = new Achievement(name, percent);
        newAchievement.printValues();
        achievemenstArray.push(newAchievement);
    }
    console.log(achievemenstArray.length);
}

fetchData(url).catch(function() {
    console.log('Could not fetch data');
});
