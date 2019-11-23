const globals = require('../lib/globals');

module.exports = {
	PRESENT: 0,
	FUTURE:  0, 
	PAST:    1,

	/**
	 * Randomly generate a helpful message about the current state of things
	 * 
	 * @param past {integer} whether using past tense or other
	 * 						 0 = present/future tense
	 *      				 1 = past tense
	 */
 	randomJailMessage: (tense = 1) => {		
		// who are you trying to jail?  random ways to say this
		const putJailArray = [
			[ globals.i18n.PutList.KlinkPresent,   globals.i18n.PutList.KlinkPast ],
			[ globals.i18n.PutList.SlammerPresent, globals.i18n.PutList.SlammerPast ],
			[ globals.i18n.PutList.TossPresent,    globals.i18n.PutList.TossPast ],
			[ globals.i18n.PutList.DungeonPresent, globals.i18n.PutList.DungeonPast ],
		];
 
		return putJailArray[ Math.floor(Math.random() * putJailArray.length) ][tense];
	}, 

}