import { FancyButton } from "@pixi/ui";
import { Counter } from "./basic/Counter";

/** Config is applied to a FancyButton, so it can be used without setting a config. */
export class SmallIconButton extends FancyButton {
    counter!: Counter; // counter component that will be added to the button. It will show the number of notifications
    
    constructor(
        icon: string, // icon for the button
        onclick: () => void, // callback for the button press
        notifications = 0 // number of notifications to show on the button
        ) {
        super({ // create the FancyButton component
            defaultView: `SmallButton`, // this is a key to the texture atlas for default button state view
            hoverView: `SmallButton-hover`, // this is a key to the texture atlas for hover button state view
            pressedView: `SmallButton-pressed`, // this is a key to the texture atlas for pressed button state view
            disabledView: `SmallButton-disabled`, // this is a key to the texture atlas for disabled button state view
            icon, // this is a key to the texture atlas for icon
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

        if (notifications) { // if there are notifications to show
            this.counter = new Counter(notifications); // create the counter component

            this.counter.x = this.width / 2 - 20; // set the counter position
            this.counter.y = -this.height / 2 + 20; // set the counter position

            this.innerView.addChild(this.counter as any); // add the counter to the button
        }
        
        this.anchor.set(0.5); // set button anchor to the center, this is needed for the button to scale correctly when animated
    }

    set notifications(amount: number) { // set the number of notifications
        this.counter.number.text = String(amount); // set the text of the counter
    }
};