var exec = require('child_process').exec;
exec("chcp 65001");

var readlineSync = require('readline-sync');

function getRandomInRange(min, max) {
	return randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
};

let uniqueNumberArr = [...new Set(Array.from(getRandomInRange(100, 999999).toString()))];
let uniqueNumber = uniqueNumberArr.join('');

function cow(compNumber) {
	let firstTry = 1;
	let lastTry = 10;
	let arrOfNumRand = [...compNumber];

	for (let k = firstTry; k <= lastTry; k++) {
		let userNumber = readlineSync.question('Введи загаданное число(длиной от 3 до 6 цифр): ');
		let arrOfNumUser = [...userNumber];
		let numOnPlace = [];
		let numNotOnPlace = [];

		if (compNumber === userNumber) {
			return console.log('Ты угадал!');
		} else if (lastTry > k) {
			for (let i = 0; i < arrOfNumRand.length; i++) {
				if (arrOfNumRand[i] === arrOfNumUser[i]) {
					numOnPlace.push(arrOfNumRand[i]);
				}
				for (let j = 0; j < arrOfNumUser.length; j++) {
					if (arrOfNumRand[i] == arrOfNumUser[j] && arrOfNumRand[i] !== arrOfNumUser[i]) {
						numNotOnPlace.push(arrOfNumRand[i]);
					}
				}
			}
			console.log('Осталось попыток: ' + (lastTry - k) + '. ' + 'Совпавших цифр не на своих местах - ' + numNotOnPlace.length + '(' + numNotOnPlace.join() + ')' + ', ' + 'цифр на своих местах - ' + numOnPlace.length + '(' + numOnPlace.join() + ')');
		} else { console.log('Осталось попыток: ' + (lastTry - k) + '. ' + 'Неудача') }
	}
}
cow(uniqueNumber);