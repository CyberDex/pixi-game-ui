import { Sprite } from '@pixi/sprite';
import { colors } from '../../config/colors';
import { Container, DisplayObject } from '@pixi/display';
import { Text } from '@pixi/text';
import { defaultFont } from '../../config/texts';

/** Component to show a number.
 * To be used to point a notification amount as a part of other components. */
export class Counter extends Container {
    number: Text; // pixi text that will be used to show the number

    constructor(text: number) {
        super();

        const bg = Sprite.from(`Radio-hover`); // create bg sprite
        bg.anchor.set(0.5); // set anchor to the center

        this.number = new Text(String(text), {
            // create pixi text
            fill: colors.text, // color of the text
            fontSize: 25, // font size of the text
            fontFamily: defaultFont, // font family of the text
            stroke: colors.hoverStroke, // text stroke color
            strokeThickness: 5, // text stroke thickness
        });

        this.number.anchor.set(0.5); // set anchor to the center

        this.addChild(bg as DisplayObject, this.number as DisplayObject); // add bg and number to the container
    }
}
