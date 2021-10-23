const alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];
const alphabetUp = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];
const otherSymbols = [
	' ',
	'\n',
	',',
	'.',
	':',
	';',
	'!',
	'?',
	'-',
	'_',
	'=',
	'+',
	'(',
	')',
	'[',
	']',
	'@',
	'`',
	"'",
	'"',
	'<',
	'>',
	'|',
	'/',
	'%',
	'$',
	'^',
	'&',
	'*',
	'~',
];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const btnChange = document.querySelector('.change');
const mode1 = document.querySelector('.mode1');
const mode2 = document.querySelector('.mode2');
const text1 = document.querySelector('#text1');
const text2 = document.querySelector('#text2');
const number = document.querySelector('#num');
const submit = document.querySelector('.submit');
const sbmt = document.querySelector('.sbmt');
const container = document.querySelector('.main');

let deg = 180;

let flag = true;

btnChange.addEventListener('click', () => {
	btnChange.style.transform = `rotate(${(deg += 180)}deg)`;
	mode2.classList.toggle('active');
	mode1.classList.toggle('active');

	mode1.classList.contains('active')
		? (text2.placeholder = 'Enter your text here')
		: (text2.placeholder = 'Encrypted text will be here');
	mode2.classList.contains('active')
		? (text1.placeholder = 'Enter your text here')
		: (text1.placeholder = 'Encrypted text will be here');

	text2.value = '';
	text1.value = '';

	text1.readOnly = flag;
	text2.readOnly = !flag;
	flag = !flag;
});

const crypt = (txt, mode) => {
	let res = '';
	let key = [...alphabet];
	for (let i = 0; i < number.value; i++) {
		key.push(key.shift());
	}
	if (mode === 'Encrypt') {
		for (let i = 0; i < txt.length; i++) {
			if (otherSymbols.includes(txt[i]) || numbers.includes(txt[i])) {
				res += txt[i];
			} else if (alphabetUp.includes(txt[i])) {
				res += key[alphabetUp.indexOf(txt[i])].toUpperCase();
			} else {
				res += key[alphabet.indexOf(txt[i])];
			}
		}
		text2.value = res;
	} else {
		for (let i = 0; i < txt.length; i++) {
			if (otherSymbols.includes(txt[i]) || numbers.includes(txt[i])) {
				res += txt[i];
			} else if (alphabetUp.includes(txt[i])) {
				res += alphabetUp[key.indexOf(txt[i].toLowerCase())];
			} else {
				res += alphabet[key.indexOf(txt[i])];
			}
		}
		text1.value = res;
	}
};

number.addEventListener('input', () => {
	if (number.value < 1 || number.value > 25) {
		number.classList.add('check');
	} else {
		number.classList.remove('check');
	}
});

submit.addEventListener('click', () => {
	if (number.value < 1 || number.value > 25) {
		return;
	}

	let mode = '';
	let txt = '';

	mode1.classList.contains('active') ? (mode = 'Decrypt') : (mode = 'Encrypt');
	mode1.classList.contains('active')
		? (txt = text2.value)
		: (txt = text1.value);
	crypt(txt, mode);
});

sbmt.addEventListener('click', () => {
	if (!text2.value) {
		return;
	}
	const ps = document.querySelectorAll('.new');
	ps.forEach(p => {
		p.remove();
	});

	let key = [...alphabet];
	let txt = text2.value;
	for (let i = 0; i < 27; i++) {
		let res = '';
		for (let j = 0; j < i; j++) {
			key.unshift(key.pop());
		}
		for (let i = 0; i < txt.length; i++) {
			if (otherSymbols.includes(txt[i]) || numbers.includes(txt[i])) {
				res += txt[i];
			} else if (alphabetUp.includes(txt[i])) {
				res += key[alphabetUp.indexOf(txt[i])].toUpperCase();
			} else {
				res += key[alphabet.indexOf(txt[i])];
			}
		}
		const p = document.createElement('p');
		p.innerHTML = `<span class='rot'>ROT.${i}</span> - ${res}`;
		p.className = 'new';
		container.append(p);
		key = [...alphabet];
	}
});
