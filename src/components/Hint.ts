import { Layout } from '@pixi/layout';
import gsap, { Back } from 'gsap';
import { Sprite } from 'pixi.js';
import { colors } from '../config/colors';
import { defaultFont } from '../config/texts';

/** Layout based component to show prompts or dialogs. */
export class Hint extends Layout {
    private startY!: number; // initial y position of the hint, used to reset it before and after tweening

    constructor(
        text: string, // text to show in the hint
        type: 'up' | 'down' = 'down', // type of the hint, up or down
    ) {
        const hint =
            type === 'down'
                ? Sprite.from('HintDown') // sprite for the down hint
                : Sprite.from(`Hint`); // sprite for the up hint

        super({
            // Layout constructor accepts an object with all the config
            content: {
                // content is an object with all the layers of the hint
                text: {
                    // text is the id of the layer
                    content: text, // layout content is a string (this will be converted to pixi Text)
                    styles: {
                        // styles is an object with all the styles that will be applied to the layer
                        position: type === 'down' ? 'center' : 'centerTop', // center Layout in the middle ot the top of parent basing on the type
                        color: colors.text, // color of the text
                        fontSize: 45, // font size of the text
                        fontFamily: defaultFont, // font family of the text
                        stroke: { width: 8, color: colors.disabledStroke }, // stroke color of the text and thickness
                        marginTop: 12, // set margin top to 18px
                    },
                },
            },
            styles: {
                // styles is an object with all the styles that will be applied to the layout
                position: 'left', // position Layout to the left of parent
                background: hint, // background is a sprite
                marginLeft: 25, // set margin left to 25px
                marginTop: 120, // set margin top to 120px
            },
        });

        this.startY = hint.height - 20; // set initial y position of the hint
    }

    /** Method is automatically called when Layout is shown. (See Game.ts) */
    public async show(force = false) {
        // force is a boolean that indicates if the hint should be shown without tweening
        if (this.alpha === 1) return; // if the hint is already visible, return

        gsap.killTweensOf(this); // kill all tweens of the hint

        if (force) {
            // if force is true, show the hint without tweening
            this.alpha = 1; // set alpha to 1
            return;
        }

        // set initial animation state values
        this.alpha = 0; // set alpha to 0
        this.y = this.startY + 20; // set y position to initial y position + 20px

        await gsap.to(this, {
            // tween the hint
            alpha: 1, // set alpha to 1
            y: '-=20', // set y position to initial y position
            duration: 0.2, // tween duration
            ease: Back.easeOut.config(1.7), // tween ease
        });
    }

    /** Method is automatically called when Layout is hidden. See Game.ts */
    public async hide(force = false) {
        // force is a boolean that indicates if the hint should be hidden without tweening
        if (this.alpha === 0) return; // if the hint is already hidden, return

        gsap.killTweensOf(this); // kill all tweens of the hint

        if (force) {
            // if force is true, hide the hint without tweening
            this.alpha = 0; // set alpha to 0
            return;
        }

        await gsap.to(this, {
            // tween the hint
            alpha: 0, // set alpha to 0
            y: `+=20`, // set y position to initial y position + 20px
            duration: 0.2, // tween duration
            ease: Back.easeIn.config(1.7), // tween ease
        });

        this.y = this.startY - 20; // set y position to initial y position - 20px
    }
}
