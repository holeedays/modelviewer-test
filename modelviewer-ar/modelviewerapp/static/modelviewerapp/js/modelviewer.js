export class ModelViewerElement {
    self;
    // typescript treats a js Proxy object the same as the type of the object that was put
    // in its constructor
    props;
    constructor(props) {
        this.props = new Proxy(props, this.handleProps());
        this.self = this.init(props);
    }
    // creates a model viewer instance and sets it to itself
    init(props) {
        // create an element in our DOM
        const instance = document.createElement("model-viewer");
        // set our properties from our Props object
        Object.entries(props).forEach((prop) => {
            const [name, value] = prop;
            instance.setAttribute(name, String(value));
        });
        return instance;
    }
    // a handler to pass to a js proxy object for our props property so that we can have getters and setter-like methods
    // when altering any of the keys of props... basically the DOM element updates now when we change
    // the value of this.prop
    handleProps() {
        return {
            set: (target, prop, value, receiver) => {
                this.self.setAttribute(String(prop), String(value));
                // set for a proxy obj returns a boolean basically saying whether the assignment
                // was successful or not
                // you could also use Reflect.set(target, prop, value, receiver) too which does the same thing
                return true;
            }
        };
    }
}
//# sourceMappingURL=modelviewer.js.map