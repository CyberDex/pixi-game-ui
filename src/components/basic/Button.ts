import { Text } from "@pixi/text";
import { FancyButton } from "@pixi/ui";
import { Layout } from "@pixi/layout";
import { colors } from "../../config/colors";
import { defaultFont } from "../../config/texts";

/** Creates a Layout with button as content and apply styles. */
export class Button extends Layout {
    constructor(text: string, onclick: () => void) {
        const button = new FancyButton({ // create a button
            defaultView: `Button`, // this is a key to the texture atlas for default button state view
            hoverView: `Button-hover`, // this is a key to the texture atlas for hover button state view
            pressedView: `Button-pressed`, // this is a key to the texture atlas for pressed button state view
            disabledView: `Button-disabled`, // this is a key to the texture atlas for disabled button state view
            text: new Text(text, { // this is a text that will be displayed on the button
                fill: colors.text, // text color
                fontSize: 55, // text size
                fontFamily: defaultFont, // text font
                stroke: colors.disabledStroke, // text stroke color TODO: change this on button state change
                strokeThickness: 8, // text stroke thickness
            }),
            textOffset: { y: -5 }, // offset of the text from the center of the button
            padding: 11, // padding between button edges and text, text will be scaled to fit the button size
            animations: { // animations for button states
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

        button.onPress.connect(onclick); // connect button press event to the provided callback

        button.anchor.set(0.5); // set button anchor to the center, this is needed for the button to scale correctly when animated

        super({ // create layout with button as content
            content: button, // button is the content of the layout
            styles: { // layout styles
                marginTop: 80, // move the layout 80px down from the top of the parent
                marginLeft: 180, // move the layout 180px right from the left of the parent
                marginBottom: 10, // move the layout 10px up from the bottom of the parent
            }
        });
    }
}