export default class Greeter {
    private greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    public issueGreeting(): string {
        return "Hello, " + this.greeting;
    }

    public button(): HTMLButtonElement {
        const element = document.createElement("button");

        element.textContent = "Say Hello!";
        element.onclick = () => {
            alert(this.issueGreeting());
        };

        return element;
    }
}
