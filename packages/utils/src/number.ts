export const
    formatNumber = (num: number): string => {
        if (num >= 1_000_000_000) {
            return (num / 1_000_000_000).toFixed(1) + 'B';
        } else if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(1) + 'M';
        } else if (num >= 1_000) {
            return (num / 1_000).toFixed(1) + 'K';
        } else {
            return num.toString();
        }
    },
    formatWithSpaces = (num: number, symbol: string = ' '): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, symbol);
    },
    calculateIncrement = (initial: number, steps: number): number => {
        if (steps <= 1) return initial;
        let current = initial;
        for (let i = 0; i < steps; i++) {
            current += current * 0.05;
            current = Math.ceil(current / 10) * 10;
        }
        return current;
    },
    getRandom = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1)) + min;