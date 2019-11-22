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
		// !TODO internationalize
		const putJailArray = [
			['put in the klink','put in the klink'],
			['throw in the slammer','thrown in the slammer'],
			['toss in jail','tossed in jail'],
			['dungeonize','dungeonized']
		];
 
		return putJailArray[ Math.floor(Math.random() * putJailArray.length) ][tense];
	}, 

}