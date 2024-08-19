import { FancyButton } from '@pixi/ui';
import { Sprite, Text } from 'pixi.js';
import { colors } from '../config/colors';
import { defaultFont } from '../config/texts';

/** Layout based component for the small button.
 * It applies all the configs to the FancyButton component,
 * so it can be used without setting the configs.
 */
export class SmallButton extends FancyButton {
    constructor(text: string, onclick: () => void, locked = false) {
        let icon; // icon is a sprite that will be added to the button

        if (locked) {
            // if button is locked, we gonna add a lock icon to the button
            icon = Sprite.from('LockIcon'); // create a sprite from the 'LockIcon' texture atlas
        }

        const textElement = locked // if button is locked, we gonna hide the text
            ? undefined
            : new Text({
                  // create a text element
                  text: text,
                  style: {
                      fill: colors.text, // set text color
                      fontSize: 75, // set text font size
                      fontFamily: defaultFont, // set text font family
                      stroke: colors.disabledStroke + '6', // set text stroke color and thickness
                  },
              });

        super({
            // FancyButton constructor accepts an object with all the config
            defaultView: `SmallButton`, // this is a key to the texture atlas for default button state view
            hoverView: `SmallButton-hover`, // this is a key to the texture atlas for hover button state view
            pressedView: `SmallButton-pressed`, // this is a key to the texture atlas for pressed button state view
            disabledView: `SmallButton-disabled`, // this is a key to the texture atlas for disabled button state view
            text: textElement, // this is a text that will be displayed on the button
            icon, // this is an icon that will be displayed on the button
            iconOffset: { y: -10 }, // this is an offset for the icon
            textOffset: { y: -7 }, // this is an offset for the text
            padding: 11, // padding between button edges and text, text will be scaled to fit the button size
            animations: {
                // animations for button states
                hover: {
                    // animation for hover state
                    props: {
                        // props to animate
                        scale: { x: 1.03, y: 1.03 }, // scale up button on hover
                        y: 0, // reset button y position on hover
                    },
                    duration: 100, // animation duration
                },
                pressed: {
                    // animation for pressed state
                    props: {
                        // props to animate
                        scale: { x: 0.9, y: 0.9 }, // scale down button on press
                        y: 10, // move button down on press
                    },
                    duration: 100, // animation duration
                },
            },
        });

        this.enabled = !locked; // if button is locked, disable it's interaction events

        this.scale.set(0.9); // scale down the button

        this.anchor.set(0.5); // set button anchor to the center, this is needed for the button to scale correctly when animated

        this.onPress.connect(onclick); // connect button press event to the provided callback
    }
}
