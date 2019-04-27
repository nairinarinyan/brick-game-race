import Greeter from "./src/Greeter";

const greeter: Greeter = new Greeter("world!");

document.getElementById("app").appendChild(greeter.button());
