import { CheckBox as BasicCheckBox } from '@pixi/ui';
import { Sprite } from '@pixi/sprite';
import { TextStyle } from '@pixi/text';
import { colors } from '../config/colors';
import { defaultFont } from '../config/texts';

/** Extends a BasicCheckBox class and apply config to it, 
 * so that instance can be used without need to config it. */
export class CheckBox extends BasicCheckBox {
    constructor(options: CheckBoxOptions) {
        super({
            style: { // style is an object with checkbox assets and text styles
                checked: createCheckBox( // sprite(Container), that shows when checkbox is checked
                    options.checkboxBG, // background of the checked checkbox
                    options.checkboxFG // foreground of the checked checkbox
                ),
                unchecked: createCheckBox(options.checkboxBG), // sprite(Container), that shows when checkbox is unchecked
                text: { // text styles
                    fill: 'white', // color of the text
                    fontFamily: defaultFont, // font family of the text
                    fontSize: 35, // font size of the text
                    stroke: colors.hoverStroke, // text stroke color
                    strokeThickness: 4, // text stroke thickness
                    ...options.textStyle, // apply text styles from options
                },
                textOffset: options.textOffset // position offset of the text component from the checkbox
            },
            checked: options.checked, // initial checkbox state
            text: options.text, // text that will be displayed on the checkbox
        });

        if (options.onChange) { // if callback function is provided
            this.onCheck.connect(options.onChange); // connect checkbox change event to the provided callback
        }
    }
}

/** Creates a sprite(Container) with checkbox assets. 
 * This function is abstracted from a class as it is used inside a `super` call, 
 * and `this.createCheckBox` can not be called before `super` call.
*/
function createCheckBox(
    checkboxBG: string, // texture key for the background of the checkbox
    checkboxFG?: string // texture key for the foreground of the checkbox
    ): Sprite {
    const bg = Sprite.from(checkboxBG); // create a sprite from the provided texture key
    
    if (checkboxBG === 'RoundSubstrate') { // if the background is 'RoundSubstrate' texture
        bg.scale.set(0.4); // scale it down
    }

    if (checkboxFG) { // if the foreground is provided
        const checkBox = Sprite.from(checkboxFG); // create a sprite from the provided texture key
        
        checkBox.anchor.set(0.5); // set anchor to the center

        checkBox.x = bg.width / 2; // set x position to the center of the background
        checkBox.y = bg.height / 2; // set y position to the center of the background

        if (checkboxBG === 'RoundSubstrate' && checkboxFG === 'Radio') { // if the background is 'RoundSubstrate' texture and the foreground is 'Radio' texture
            checkBox.scale.set(1.85); // scale it up
            checkBox.x += 37; // move it to the right
            checkBox.y += 38; // move it down
        }

        if (checkboxBG === 'RoundSubstrate' && checkboxFG === 'CheckBox') { // if the background is 'RoundSubstrate' texture and the foreground is 'CheckBox' texture
            checkBox.scale.set(2); // scale it up
            checkBox.x += 50; // move it to the right
            checkBox.y += 30; // move it down
        }
        
        bg.addChild(checkBox); // add the foreground to the background to get a single sprite(Container)
    }

    return bg; // return the sprite(Container)
}

/** Type for the component settings description. */
export type CheckBoxOptions =  {
    checked: boolean, // initial checkbox state
    checkboxBG: string, // texture key for the background of the checkbox
    checkboxFG: string, // texture key for the foreground of the checkbox
    text: string, // text that will be displayed on the checkbox
    textStyle?: Partial<TextStyle>, // text styles
    textOffset?: { // position offset of the text component from the checkbox
        x: number, // x offset
        y: number, // y offset
    }
    onChange?: (checked: boolean) => void, // callback function that will be called when checkbox state is changed
}