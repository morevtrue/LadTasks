var exec = require('child_process').exec;
exec("chcp 65001");

var readlineSync = require('readline-sync');

const monster = {
	maxHealth: 10,
	name: "Лютый",
	moves: [
		{
			"name": "Удар когтистой лапой",
			"physicalDmg": 3, // физический урон
			"magicDmg": 0,    // магический урон
			"physicArmorPercents": 20, // физическая броня
			"magicArmorPercents": 20,  // магическая броня
			"cooldown": 0     // ходов на восстановление
		},
		{
			"name": "Огненное дыхание",
			"physicalDmg": 0,
			"magicDmg": 4,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 3
		},
		{
			"name": "Удар хвостом",
			"physicalDmg": 2,
			"magicDmg": 0,
			"physicArmorPercents": 50,
			"magicArmorPercents": 0,
			"cooldown": 2
		},
	]
}

let userHealth = readlineSync.question('\nВыберите уровень здоровья: ');

const witcher = {
	maxHealth: userHealth,
	name: "Боевой маг Евстафий",
	moves: [
		{
			"name": "Удар боевым кадилом",
			"physicalDmg": 2,
			"magicDmg": 0,
			"physicArmorPercents": 0,
			"magicArmorPercents": 50,
			"cooldown": 0
		},
		{
			"name": "Вертушка левой пяткой",
			"physicalDmg": 4,
			"magicDmg": 0,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 4
		},
		{
			"name": "Каноничный фаербол",
			"physicalDmg": 0,
			"magicDmg": 5,
			"physicArmorPercents": 0,
			"magicArmorPercents": 0,
			"cooldown": 3
		},
		{
			"name": "Магический блок",
			"physicalDmg": 0,
			"magicDmg": 0,
			"physicArmorPercents": 100,
			"magicArmorPercents": 100,
			"cooldown": 4
		},
	]
}

let monsterHealth = monster.maxHealth;
console.log('\nВаш уровень здоровья: ' + witcher.maxHealth);

function game() {
	let turn = 1;

	do {
		let arrMovesMonster = monster.moves;
		let userMove;
		let randMovesMonster;
		let monsterMove;
		let monsterChoice;
		let userChoice;

		do {
			randMovesMonster = Math.floor(Math.random() * arrMovesMonster.length);
			monsterMove = arrMovesMonster[randMovesMonster];

			if (monsterMove == monster.moves[0]) {
				monsterChoice = 1;
			} else if (monsterMove == monster.moves[1]) {
				monsterChoice = 2;
			} else if (monsterMove == monster.moves[2]) {
				monsterChoice = 3;
			}

			if (monsterChoice == 1) {
				break;
			} else if (monsterChoice == 2 && monster.moves[1].cooldown == 3) {
				break;
			} else if (monsterChoice == 3 && monster.moves[2].cooldown == 2) {
				break;
			} else {
				continue;
			}
		} while (monsterHealth > 0);

		if (monsterChoice !== 2 && monster.moves[1].cooldown !== 3) {
			monster.moves[1].cooldown--;
		}

		if (monsterChoice !== 3 && monster.moves[2].cooldown !== 2) {
			monster.moves[2].cooldown--;
		}

		monsterMove.cooldown--;

		if (monster.moves[1].cooldown == -1) {
			monster.moves[1].cooldown = 3;
		}
		if (monster.moves[2].cooldown == -1) {
			monster.moves[2].cooldown = 2;
		}

		do {
			console.log('\nХод: ' + turn + '\nМонстр собирается использовать: ' + monsterMove.name);
			console.log('\nВыбери, чем ответить: \n1. Удар боевым кадилом;\n2. Вертушка левой пяткой;\n3. Каноничный фаербол;\n4. Магический блок.')
			userChoice = readlineSync.question('\nВыберите одно из четырёх умений (введите 1, 2, 3 или 4): ');

			if (userChoice == 1) {
				userMove = witcher.moves[0];
				turn++;
				break;
			} else if (userChoice == 2 && witcher.moves[1].cooldown == 4) {
				userMove = witcher.moves[1];
				turn++;
				break;
			} else if (userChoice == 3 && witcher.moves[2].cooldown == 3) {
				userMove = witcher.moves[2];
				turn++;
				break;
			} else if (userChoice == 4 && witcher.moves[3].cooldown == 4) {
				userMove = witcher.moves[3];
				turn++;
				break;
			} else {
				console.log('\nЭто умение перезаряжается! Выберите другое');
				continue;
			}
		} while (userHealth > 0)

		if (userChoice !== 2 && witcher.moves[1].cooldown !== 4) {
			witcher.moves[1].cooldown--;
		}

		if (userChoice !== 3 && witcher.moves[2].cooldown !== 3) {
			witcher.moves[2].cooldown--;
		}

		if (userChoice !== 4 && witcher.moves[3].cooldown !== 4) {
			witcher.moves[3].cooldown--;
		}

		userMove.cooldown--;

		if (witcher.moves[1].cooldown == -1) {
			witcher.moves[1].cooldown = 4;
		}
		if (witcher.moves[2].cooldown == -1) {
			witcher.moves[2].cooldown = 3;
		}
		if (witcher.moves[3].cooldown == -1) {
			witcher.moves[3].cooldown = 4;
		}

		console.log('\nВы выбрали: ' + userMove.name);

		let gameStart = readlineSync.question('\nНачать бой? \n1. Да\n2. Нет\n\n-->');

		if (gameStart == 1) {
			userHealth = userHealth - monsterMove.physicalDmg + userMove.physicArmorPercents / 100 * monsterMove.physicalDmg - monsterMove.magicDmg + userMove.magicArmorPercents / 100 * monsterMove.magicDmg;
			monsterHealth = monsterHealth - userMove.physicalDmg + monsterMove.physicArmorPercents / 100 * userMove.physicalDmg - userMove.magicDmg + monsterMove.magicArmorPercents / 100 * userMove.magicDmg;
		} else if (gameStart == 2) {
			console.log('\nВы сбежали!');
			break;
		}

		if (userHealth > 0 && monsterHealth > 0) {
			console.log('\nВаше здоровье: ' + Math.round(userHealth));
			console.log('\nЗдоровье монстра: ' + Math.round(monsterHealth));
		} else if (userHealth <= 0 && monsterHealth <= 0) {
			console.log('\nДружеская ничья!\n');
			break;
		} else if (monsterHealth <= 0) {
			console.log('\nВы победили!\n');
			break;
		} else if (userHealth <= 0) {
			console.log('\nВы проиграли!\n');
			break;
		}

		let gameContinue = readlineSync.question('\nПродолжить бой? \n1. Да\n2. Нет\n-->');

		if (gameContinue == 1) {
			console.log('\nСражение продолжается!');
		} else if (gameContinue == 2) {
			console.log('\nВы сбежали!');
			break;
		}

	} while (userHealth > 0 && monsterHealth > 0)

}

game();
