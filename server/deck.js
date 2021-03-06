const colors = ['red', 'yellow', 'blue', 'green'];
const values = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];
const actions = ['+2', 'reverse', 'skip'];
const wildCards = ['wild', '+4'];

const Card = function(color, value) {
    this.color = color;
    this.value = value;
};

var deck= [];

ShuffleDeck = (socket, players) => {
    var cards = [];
    for (let value of values) {
        for (let color of colors) {
            cards.push(new Card(color, value.toString()));
        }
    }
    for (let action of actions) {
        for (let color of colors) {
            for (let i = 0; i < 2; i++) {
                cards.push(new Card(color, action));
            }
        }
    }
    for (let wildCard of wildCards) {
        for (let color of colors) {
            cards.push(new Card(color, wildCard));
        }
    }
    deck = cards
        .map((a) => ({sort: Math.random(), value: a}))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value)
};

DrawCard = () => {
    if (deck.length < 5) {
        ShuffleDeck();
        console.log('Adding more cards to the deck');
    }
    return deck.pop();
};

DealCards = (socket, players, playerNames) => {
    for (let i = 0; i < 7; i++) {
        for (let i = 0; i < players.length; i++) {
            socket.emit('drawCard', {
                card : DrawCard(),
                player: players[i],
                playerName : playerNames[i]
            });
        }
    }
};

module.exports = {
    ShuffleDeck : ShuffleDeck,
    DrawCard : DrawCard,
    DealCards : DealCards
}