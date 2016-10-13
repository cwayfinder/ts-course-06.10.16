function isInArray(container: string[], ...varArgs: string[]) : boolean
{
    return container.every((value, index, array) => { return varArgs.indexOf(value) >= 0; });
}

console.log('Mismatch (cyan, magenta, yellow) = ' + isInArray(['red', 'green', 'blue'], 'cyan', 'magenta', 'yellow'));

console.log('Match (red, green, blue) = ' + isInArray(['red', 'green', 'blue'], 'red', 'green', 'blue'));
