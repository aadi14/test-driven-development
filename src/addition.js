const logger = require('../utils/logger'); // Adjust the path according to your structure

function add(numbers) {

    if (numbers === "") {
        // logger.info("Input is an empty string. Returning 0.");
        return 0;
    }

    let delimiter = ",";
    let startIndex = 0;

    // Define the delimiters to be replaced with a comma
    const delimiters = [
        "\t", ";", "|", " ", ":", "_", "$", "@", "#", "*", "?", "!", '"', "'", "\\", "/", "[", "]", "{", "}", "<", ">"
    ];

    let normalizedNumbers; // Declare this variable outside the try block

    // If the input starts with "//", set a custom delimiter
    if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf("\n");
        delimiter = numbers.substring(2, delimiterEndIndex);
        startIndex = delimiterEndIndex + 1; // Adjust the start index to skip the delimiter line
        numbers = numbers.substring(startIndex); // Get only the numbers

    }

    try {
const regex = new RegExp(`[${delimiters.map(escapeRegExp)}]|\\n|`, 'g');
        normalizedNumbers = numbers.replace(regex, ',');
    } catch (error) {
        logger.error(`Error while normalizing numbers: ${error.message}`);
        throw error;
    }

    let negativeNumbers = [];
    const numberArray = normalizedNumbers.split(",").map(num => {
        const parsedNum = parseInt(num, 10);
        if (parsedNum < 0) {
            negativeNumbers.push(parsedNum);
        }
        return parsedNum;
    });

    if (negativeNumbers.length > 0) {
        logger.error(`Negative numbers found: ${negativeNumbers}`);
        throw new Error(`negative numbers not allowed: ${negativeNumbers}`);
    }
    
    // Sum the array of numbers
    const sum = numberArray.reduce((sum, num) => sum + num, 0);

    return sum;
}

const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escapes special regex characters
};

module.exports = add;
