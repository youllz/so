// place files you want to import through the `$lib` alias in this folder.

const city = [
	'Abengourou',
	'Abidjan',
	'Aboisso',
	'Adiaké',
	'Adzopé',
	'Agboville',
	'Agnibilékrou',
	'Akoupé',
	'Anyama',
	'Bangolo',
	'Béoumi',
	'Bettié',
	'Biankouma',
	'Bingerville',
	'Bloléquin',
	'Bocanda',
	'Bondoukou',
	'Bongouanou',
	'Bonoua',
	'Bouaflé',
	'Bouaké',
	'Boundiali',
	'Dabakala',
	'Dabou',
	'Daloa',
	'Danané',
	'Daoukro',
	'Dimbokro',
	'Divo',
	'Duékoué',
	'Ferkessédougou',
	'Gagnoa',
	'Grand-Bassam',
	'Grand-Lahou',
	'Guiglo',
	'Issia',
	'Jacqueville',
	'Katiola',
	'Korhogo',
	'Lakota',
	'Man',
	'Mankono',
	'Mbahiakro',
	'Odienné',
	'Ouangolodougou',
	'Port-Bouët',
	'Sakassou',
	'San-Pédro',
	'Sassandra',
	'Séguéla',
	'Sinfra',
	'Soubré',
	'Tabou',
	'Tanda',
	'Tiassalé',
	'Tingréla',
	'Touba',
	'Toumodi',
	'Vavoua',
	'Yamoussoukro',
	'Zouan-Hounien'
];

export const cityObjects = city.map((cityName) => {
	return { value: cityName.toLocaleLowerCase(), label: cityName };
});

const communesAbidjan = [
	'Abobo',
	'Adjamé',
	'Attécoubé',
	'Cocody',
	'Koumassi',
	'Marcory',
	'Plateau',
	'Port-Bouët',
	'Treichville',
	'Yopougon',
	'Anyama',
	'Bingerville',
	'Songon'
];

export const communeAbidjanObject = communesAbidjan.map((name) => {
	return {
		value: name.toLocaleLowerCase(),
		label: name
	};
});
