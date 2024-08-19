import { CheckBox as BasicCheckBox } from '@pixi/ui';
import { Sprite, Text } from 'pixi.js';
import { colors } from '../config/colors';
import { defaultFont } from '../config/texts';

/** Extends a BasicCheckBox class and apply config to it,
 * so that instance can be used without need to config it.
 */
export class Switch extends BasicCheckBox {
    constructor(
        text: string, // text that will be displayed on the checkbox
        checked: boolean, // initial checkbox state
        callback?: (checked: boolean) => void, // callback function that will be called when checkbox state changes
    ) {
        super({
            style: {
                // style is an object with checkbox assets and text styles
                checked: createCheckBox(true), // sprite(Container), that shows when checkbox is checked
                unchecked: createCheckBox(false), // sprite(Container), that shows when checkbox is unchecked
                text: LABEL_STYLE, // text styles
                textOffset: {
                    // position offset of the text component from the checkbox
                    x: -300, // move text to the left
                    y: 6, // move text down
                },
            },
            checked, // initial checkbox state
            text, // text that will be displayed on the checkbox
        });

        if (callback) {
            // if callback function is provided
            this.onCheck.connect(callback); // connect checkbox change event to the provided callback
        }
    }
}

// this is extracted to a function as we are using it inside a `super` call so it can't be called as `this.createCheckBox`
function createCheckBox(checked: boolean) {
    // creates a sprite(Container) with checkbox assets
    const bg = Sprite.from('SwitchBG'); // create a background sprite from the provided texture key
    const icon1 = Sprite.from('PauseIcon'); // create a sprite from the provided texture key
    const icon2 = Sprite.from('PauseIcon'); // create a sprite from the provided texture key
    const handle = Sprite.from(checked ? 'SmallButton' : 'SmallButton-pressed'); // create a sprite from the provided texture key
    const stateText = new Text({ text: checked ? 'ON' : 'OFF', style: TEXT_STYLE }); // create a text component

    stateText.anchor.set(0.5); // set text component anchor to the center

    bg.addChild(stateText); // add text component to the background sprite
    stateText.x = bg.width / 2 + (checked ? -stateText.width / 2 - 5 : stateText.width / 2 + 5); // set text position
    stateText.y = bg.height / 2; // set text position

    icon1.anchor.set(0.5); // set sprite anchor to the center
    icon1.scale.set(0.8); // scale down sprite
    icon1.x = handle.width / 2 - 13 - handle.width / 2; // set sprite position
    icon1.y = handle.height / 2 - 7 - handle.width / 2; // set sprite position

    icon2.anchor.set(0.5); // set sprite anchor to the center
    icon2.scale.set(0.8); // scale down sprite
    icon2.x = handle.width / 2 + 13 - handle.width / 2; // set sprite position
    icon2.y = handle.height / 2 - 7 - handle.width / 2; // set sprite position

    handle.scale.set(0.4); // scale down sprite
    handle.anchor.set(0.5); // set sprite anchor to the center

    handle.y = bg.height / 2; // set sprite position
    handle.x = bg.width / 2 + (checked ? handle.width / 2 : -handle.width / 2); // set sprite position

    bg.addChild(handle); // add handle to the background sprite
    handle.addChild(icon1); // add icon1 to the handle sprite
    handle.addChild(icon2); // add icon2 to the handle sprite

    return bg; // return background sprite
}

const TEXT_STYLE = {
    // Styles of the text
    fill: 'white', // color of the text
    fontFamily: defaultFont, // font family of the text
    fontSize: 27, // font size of the text
    stroke: { width: 4, color: colors.hoverStroke }, // text stroke color and thickness
};

const LABEL_STYLE = {
    // Styles of the text
    fill: 'white', // color of the text
    fontFamily: defaultFont, // font family of the text
    fontSize: 60, // font size of the text
    stroke: { width: 4, color: colors.hoverStroke }, // text stroke color and thickness
};
