export default class HandleEvent {
  constructor() {
    this.keys = [];
    window.addEventListener("keydown", (event) => {
      if (
        (event.key === "s" ||
          event.key === "w" ||
          event.key === "a" ||
          event.key === "d" ||
          event.key === "enter") &&
        this.keys.indexOf(event.key) === -1
      ) {
        this.keys.push(event.key);
      }
    });
    
    window.addEventListener("keyup", (event) => {
      if (
        event.key === "s" ||
        event.key === "w" ||
        event.key === "a" ||
        event.key === "d" ||
        event.key === "enter"
      ) {
        this.keys.splice(this.keys.indexOf(event.key), 1);
      }

      console.log("this.keys :>> ", this.keys);
    });
  }
}
