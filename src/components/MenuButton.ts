import { Layout } from '@pixi/layout';
import { SmallIconButton } from './SmallIconButton';
import { Hint } from './Hint';

/** Layout based component for the buttons with hint and counters,
 * used in LevelsWindow. */
export class MenuButton extends Layout {
    constructor(
        icon: string, // icon texture name for the button
        text: string, // text for the button hint
        onclick: () => void, // callback for the button press
        notifications: number = 0 // number of notifications to show on the button
    ) { 
        
        const button = new SmallIconButton(icon, onclick, notifications); // create the SmallIconButton instance (see SmallIconButton.ts)
        const buttonHint = new Hint(text); // create the hint component (see Hint.ts)

        buttonHint.hide(true); // hide the hint by default

        button.onHover.connect(() => buttonHint.show()); // show the hint on button hover
        button.onOut.connect(() => buttonHint.hide()); // hide the hint on button out

        super({ // create the Layout component
            content: { // content config
                button, // button component (in this case layout ID is 'button' and content is the SmallIconButton instance)
                buttonHint: { // hint layout
                    content: buttonHint, // content is hint component instance
                    styles: { // styles for the hint layout
                        height: 1, // set the height of the hint layout
                        position: 'center', // center the hint
                        marginTop: -160, // move the hint up
                        marginLeft: 10, // move the hint to the right
                    }
                }
            },
            styles: { // styles for the layout
                textAlign: 'center', // center the button
                width: 155, // set the width of the layout
                marginRight: 50, // set the right margin between the buttons
                marginLeft: 50, // set the left margin between the buttons
            }
        });
    }
}