// Props is essentially an object that can hold an indefinite amount of properties
export interface Props {
    [name: string]: any
}

export class ModelViewerElement {
    public self: HTMLElement;
    // typescript treats a js Proxy object the same as the type of the object that was put
    // in its constructor
    public props: Props;

    constructor (props: Props) {
        this.props = new Proxy(props, this.handleProps());
        this.self = this.init(props);
    }

    // creates a model viewer instance and sets it to itself
    private init(props: Props): HTMLElement {
        // create an element in our DOM
        const instance: HTMLElement = document.createElement("model-viewer");
        // set our properties from our Props object
        Object.entries(props).forEach((prop: [string, any]) => {
            const [name, value]: [name: string, val: any] = prop;
            instance.setAttribute(name, String(value));
        });

        return instance;
    }

    // a handler to pass to a js proxy object for our props property so that we can have getters and setter-like methods
    // when altering any of the keys of props... basically the DOM element updates now when we change
    // the value of this.prop
    private handleProps(): {
        set: (target: object, prop: PropertyKey, value: any, receiver: any) => boolean
    } {
        return {
            set: (target: object, prop: PropertyKey, value: any, receiver: any) => {
                this.self.setAttribute(String(prop), String(value));

                // set for a proxy obj returns a boolean basically saying whether the assignment
                // was successful or not
                // you could also use Reflect.set(target, prop, value, receiver) too which does the same thing
                return true;
            }
        }
    }
}