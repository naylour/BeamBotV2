export const
    insert = (template: string, values: { [key: string]: string }, key: string = '$'): string => {
        return template.replace(new RegExp(`\\${key}(\\w+)`, 'g'), (match, token) => {
            return values[token] || match;
        });
    },
    splitByFirstSpace = (str: string): string[] => {
        const index = str.indexOf(' ');
        if (index === -1) return [str]; // если пробела нет, возвращаем исходную строку
        return [str.slice(0, index), str.slice(index + 1)];
    }