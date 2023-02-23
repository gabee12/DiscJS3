const { currency } = require('./currency');

function getBalance(id) {
	const user = currency.get(id);
	return user ? user.balance : 0;
}

exports.getBalance = getBalance;