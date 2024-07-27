class App {
    value = $state({
        loader: {
            isLoad: false
        }
    });
}

export const app = new App();