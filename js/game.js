// let stepNow = "";

const DataSetStory = {
    0: {
        text: "Мир на пороге Армагедона, но в маленькой деревушке Тадфилд жизнь идёт своим чередом. Здесь живёт Адам Янг, на первый взгляд обычный 11-летний мальчик, который является Антихристом, хотя сам он об этом пока не догадывается. Адам и его друзья — Пеппер, Брайан и Уэнслидейл — называют себя Эти. Они беззаботно проводят летние каникулы, устраивая приключения, не подозревая, что на Адама возложена судьба всего мира.",
        // img: "../images/game/",
        next: ["1", "Начать заново"],
    },
    1: {
        text: "В Тадфилде в этот августовский день было жарко и тихо. Вдруг словно бы тысяча металлических голосов хором выкрикнули отрывистое «Хайль!» и сразу же умолкли. И на дороге появилась черная собака. Это определенно была собака. По крайней мере, форма у нее была соответствующая.<br> Пес услышал спор из карьера за кустами. Он подполз к кустам и начал наблюдать за своим будущим хозяином.<br> - У меня будет пес! И это будет... ",
        // img: "../src/img/img_1.jpg",
        next: ["2", "Золотистый ретривер", "2", "Дворняжка", "2", "Доберман"],
    },
    2: {
        text: "В Тадфилде появился новый обитатель. Эти с интересом обсуждали новоселов, но на сей раз Пеппер принесла особенно впечатляющие новости.<br> — Она поселилась в Жасминовом коттедже, а еще она колдунья, — сказала девочка. — Я узнала это от миссис Хендерсон — она убиралась в том доме и сказала маме, что видела у нее какую-то ведьминскую газету. Там и обычных газет полно, но одна — специально для ведьм.",
        // img: "../src/img/img_2.jpg",
        next: ["0", "Доброжелательность", "0", "Интерес", "0", "Безразличие"],
    },

};

var storyText = document.getElementById("story-text");
var choices = document.getElementById("choices");
var currentScene = "";

function updateScene(sceneID) {
    var scene = DataSetStory[sceneID];
    console.log(scene.next.length);

    // Обновляем текст и кнопки
    storyText.innerHTML  = scene.text;
    if (scene.next.length == 2) {
        /*document.getElementById("answer1").style.display = "contents";*/
        document.getElementById("choise2").style.display = "none";
        document.getElementById("choise3").style.display = "none";

        document.getElementById("choise1").innerHTML  =
            scene.next[1];
    } else {
        /*document.getElementById("answer1").style.display = "contents";*/
        document.getElementById("choise2").style.display = "block";
        document.getElementById("choise3").style.display = "block";

        document.getElementById("choise1").innerHTML  = scene.next[1];
        document.getElementById("choise2").innerHTML  = scene.next[3];
        document.getElementById("choise3").innerHTML  = scene.next[5];
    }
}

function getButton(choice) {
    console.log(choice);
    if (currentScene == "") {
        currentScene = "1";
    } else {
        currentScene = DataSetStory[currentScene].next[choice];
    }

    updateScene(currentScene);
}
