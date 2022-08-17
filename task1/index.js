let str = `Старший братец ПОНЕДЕЛЬНИК –
работяга, не бездельник.
Он неделю открывает
всех трудиться зазывает. 

ВТОРНИК следует за братом
у него идей богато.

А потом СРЕДА-сестрица,
не пристало ей лениться.

Брат ЧЕТВЕРГ и так, и сяк,
он мечтательный чудак.

ПЯТНИЦА-сестра сумела
побыстрей закончить дело.

Предпоследний брат СУББОТА
не выходит на работу.

В гости ходит ВОСКРЕСЕНЬЕ,
очень любит угощенье
`;
console.log(str);

let arr = str.match(/\w+|\s+|[^\s\w]+/g);

function translate(array) {
	for (let i = 0; i < array.length; i++) {
		if (arr[i] === 'ПОНЕДЕЛЬНИК') {
			arr[i] = 'MONDAY';
		} else if (arr[i] === 'ВТОРНИК') {
			arr[i] = 'TUESDAY';
		} else if (arr[i] === 'СРЕДА-сестрица,') {
			arr[i] = 'WEDNESDAY-сестрица,';
		} else if (arr[i] === 'ЧЕТВЕРГ') {
			arr[i] = 'THURSDAY';
		} else if (arr[i] === 'ПЯТНИЦА-сестра') {
			arr[i] = 'FRIDAY-сестра';
		} else if (arr[i] === 'СУББОТА') {
			arr[i] = 'SATURDAY';
		} else if (arr[i] === 'ВОСКРЕСЕНЬЕ,') {
			arr[i] = 'SUNDAY,';
		}
	}
	return arr;
}
str = translate(arr).join('');
console.log(str);
