import { FancyButton } from "@pixi/ui";
import { Counter } from "./basic/Counter";

/** FancyButton config to be applied on FancyButton, 
 * so that component can be used without setting all the configs. */
export class CloseButton extends FancyButton {
    counter!: Counter; // counter component that will be added to the button. It will show the number of notifications
    
    constructor(onclick: () => void) {
        super({
            defaultView: `SmallButton-pressed`, // this is a key to the texture atlas for default button state view
            hoverView: `SmallButton-hover`, // this is a key to the texture atlas for hover button state view
            disabledView: `SmallButton-disabled`, // this is a key to the texture atlas for disabled button state view
            icon: `CloseIcon`, // this is a key to the texture atlas for icon
            iconOffset: { // offset for the icon
                y: -10, // move icon up
            },
            animations: { // animations config for button states
                hover: { // animation for hover state
                    props: { // props to animate
                        scale: { x: 1.03, y: 1.03 }, // scale up button on hover
                        y: 0 // reset button y position on hover
                    },
                    duration: 100 // animation duration
                },
                pressed: { // animation for pressed state
                    props: { // props to animate
                        scale: { x: 0.9, y: 0.9 }, // scale down button on press
                        y: 10 // move button down on press
                    },
                    duration: 100 // animation duration
                }
            }
        });

        this.onPress.connect(onclick); // connect button press event to the provided callback
        
        this.anchor.set(0.5); // set button anchor to the center, this is needed for the button to scale correctly when animated
        this.scale.set(0.8); // scale down the button
    }

    set notifications(amount: number) { // set the number of notifications
        this.counter.number.text = String(amount); // set the text of the counter
    }
};