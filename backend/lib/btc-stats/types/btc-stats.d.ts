export = btcTools;

/**
 * 
 * @param start {string} Initial date in the format YYYY-MM-DD 
 * @param end {string} Final date in the format YYYY-MM-DD 
 * @return {Promise<object|string>} A promise for an object with the data and stats
 */
declare function btcTools(start: string, end: string): Promise<object|string>;