import { Sprite } from '@pixi/sprite';
import gsap, {Back} from 'gsap';
import { colors } from '../../config/colors';
import { Layout, Styles } from '@pixi/layout';
import { defaultFont } from '../../config/texts';

/** Layout base component with the config for a base window class to be extended 
 * for creation of any window component.
 */
export class Window extends Layout {
    constructor(options: {
        title: string, // text title of the window
        styles?: Styles, // styles of the window
        ribbonStyles?: Styles // styles of the ribbon
    }) {        
        super({ // Layout constructor accepts an object with all the config
            id: `Window-${options.title}`, // id of the component, can be used to access it laterS
            content: { // Content of the component
                ribbon: { // Ribbon is a child of the Window
                    content: { // Content of the ribbon (text)
                        id: 'title', // id of the text, can be used to access it later
                        content: options.title, // string given as a parameter
                        styles: { // Styles of the text
                            color: 'white', // color of the text
                            fontFamily: defaultFont, // font family of the text
                            fontSize: 70, // font size of the text
                            position: 'center', // center pixi Text in the middle of parent (ribbon layout in this case)
                            marginTop: -6, // move 6px up from the top of the parent
                            stroke: colors.disabledStroke, // text stroke color
                            strokeThickness: 5, // text stroke thickness
                            maxWidth: '83%', // set max width to 83% of parent (ribbon), will scale down if the ribbon sprite is smaller than the text
                            maxHeight: '70%', // set max height to 70% of parent (ribbon), will scale down if the ribbon sprite is smaller than the text
                            overflow: 'hidden', // hide text that is out of bounds (ribbon sprite size)
                        },
                    },
                    styles: { // Styles of the ribbon
                        background: Sprite.from('Ribbon'), // sprite as a background and set it's size
                        display: 'inline', // set size to background
                        position: 'topCenter', // center Layout in the top middle of parent
                        marginTop: -53, // move 53px up from the top of the parent
                        zIndex: 100,
                        ...options.ribbonStyles, // merge ribbonStyles given as a parameter
                    }
                },
            },
            styles: { // Styles of the component
                background: Sprite.from('Window'), // sprite as a background and set it's size
                maxWidth: '100%', // set max height to 100% of parent, will scale down if parent is smaller than the background sprite
                maxHeight: '100%', // set max height to 100% of parent, will scale down if parent is smaller than the background sprite
                position: 'center', // center Layout in the middle of parent
                marginTop: 20, // when scaling, max height 20px will be added to the top of the component, so the ribbon will affect the max height of the window too
                marginBottom: 100, // when scaling, max height 100px will be added to the bottom of the component, so the ribbon will affect the max height of the window and it is not out of bounds cos of the ribbon offset
                ...options.styles, // merge styles given as a parameter
            }
        });

        this.createContent(); // add content to the component
    }

    /** Method that is automatically called on after window creation.
     * To be override by other windows, for the content to be added to the window.
     */
    public createContent() {
        // override this method to add content to the window
    }
    
    /** Method is automatically called when Layout is shown. See Game.ts.
     * It is used to animate the window when it is shown.
     */
    public async show(force = false) { // force parameter is used to show the window without animation
        if (this.alpha === 1) return; // if window is already visible, return

        gsap.killTweensOf(this); // kill all tweens of the window
        
        if (force) { // if force is true, show the window without animation
            this.alpha = 1; // set alpha to 1
            this.visible = true; // set visible to true
            return;
        }
        
        // set initial animation state
        this.alpha = 0; // alpha to 0
        this.y += 100; // move 100px down
        this.visible = true; // set visible to true
        
        await gsap.to(this, { // animate the window
            alpha: 1, // alpha to 1
            y: '-=100', // move 100px up
            duration: 0.2, // duration of the animation
            ease: Back.easeOut.config(1.7), // ease of the animation
        });
    }

    /** Method is automatically called when Layout is shown. See Game.ts.
     * It is used to animate the window when it is hided.
     */
    public async hide(force = false) { // force parameter is used to hide the window without animation
        if (this.alpha === 0) return; // if window is already hidden, return

        gsap.killTweensOf(this); // kill all tweens of the window
        
        if (force) { // if force is true, hide the window without animation
            this.alpha = 0; // set alpha to 0
            this.visible = false; // set visible to false
            return;
        }

        await gsap.to(this, { // animate the window
            alpha: 0, // alpha to 0
            y: `+=100`, // move 100px down
            duration: 0.2, // duration of the animation
            ease: Back.easeIn.config(1.7), // ease of the animation
        });

        this.visible = false; // set visible to false
        this.y -= 100; // move 100px up
    }
}