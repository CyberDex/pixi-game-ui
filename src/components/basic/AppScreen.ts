
import gsap from 'gsap';
import { Layout, Styles } from '@pixi/layout';

/** Layout based component to place screens content. 
 * Should be used as a base class for all screens in the app.
 * Should be added to the app.stage.
 */
export class AppScreen extends Layout {
    constructor(id: string, styles?: Styles) {
        // created blank layout with id and styles, content will be added in the child classes
        super({
            id,
            styles: {
                width: '100%', // set width to 100% of parent (app.stage in this case)
                height: '100%', // set height to 100% of parent (app.stage in this case)
                color: 'white', // set text color to white
                ...styles, // add styles passed in the constructor
            }
        });
    }

    /** Method is automatically called on every update. See Game.ts */
    public onUpdate(_delta: number) {
        /* Override this method to update the screen */
    };

    /** Method is automatically called on every resize. See Game.ts 
     * IMPORTANT: This method is propagating resize to all the layout system,
     * that is doing all the "magic" behind it.
     * DO NOT FORGET TO CALL super.resize() IN THE CHILD CLASS IN CASE OF OVERRIDING THIS METHOD
    */
    public resize(_w: number, _h: number) {
        super.resize(_w, _h); // propagate resize to the layout system
    };

    /** Method is automatically called when Layout is shown. See Game.ts */
    public async show() {
        gsap.killTweensOf(this); // kill all tweens of this object
        this.alpha = 0; // set alpha to 0
        await gsap.to(this, { alpha: 1, duration: 0.2, ease: 'linear' }); // fade in
    }

    /** Method is automatically called when Layout is hidden. See Game.ts */
    public async hide() {
        gsap.killTweensOf(this); // kill all tweens of this object
        await gsap.to(this, { alpha: 0, duration: 0.2, ease: 'linear' }); // fade out
    }
}
