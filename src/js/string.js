export function capitalFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalizeAndReplace(inputString) {
    const words = inputString.split(/[-_]/);
    const capitalizedWords = words.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase();
        const restOfWord = word.slice(1).toLowerCase();
        return firstLetter + restOfWord;
    });

    return capitalizedWords.join(' ');
}