export const
    insert = (template: string, values: { [key: string]: string }, key: string = '$'): string => {
        return template.replace(new RegExp(`\\${key}(\\w+)`, 'g'), (match, token) => {
            return values[token] || match;
        });
    };