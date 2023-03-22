import { Sprite } from '@pixi/sprite';
import { Layout } from '@pixi/layout';
import { PixiLogo } from '../PixiLogo';

/* Layout based component for the background.
 * This is where all the layers of the background should be added and controlled. 
 * For example to add a parallax effect, you would add a new layers here and control their positions.
 */
export class Background extends Layout {
    constructor() {
        super({
            id: 'gameBackground', // id is used to identify the Layout in the system
            content: { // content is an object with all the layers of the background
                bg: { // bg is the id of the layer
                    content: Sprite.from('bg'), // content is the PIXI sprite that will be added to the layer
                    styles: { // styles is an object with all the styles that will be applied to the layer
                        position: 'center', // center Layout in the middle of parent
                        maxHeight: '100%', // set max height to 100% of parent, so it will scale down to fit the screen height
                        minWidth: '100%', // set min width to 100% of parent, so it will scale up to fit the screen width
                    }
                },
                pixiLogo: PixiLogo() // Layout based component for the pixi logo
            },
            styles: {
                width: '100%', // set width to 100% of parent, so children will be able to use 100% of the screen width
                height: '100%' // set height to 100% of parent, so children will be able to use 100% of the screen height
            }
        });
    }
}