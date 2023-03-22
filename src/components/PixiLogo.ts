import { Sprite } from "@pixi/sprite"
import i18n from "../config/i18n"
import { LayoutOptions } from "@pixi/layout";

/* Layout based component for the pixi logo. 
 * This is implemented as a function that returns Layout configuration object to show
 * that you can use functions to generate Layout configuration objects and the layout instance will be created 
 * inside the Layout system nad it is not necessary to create it manually.
 */

export const PixiLogo = (): LayoutOptions => ({ // function that returns Layout configuration object
    content: {
        poweredText: {
            content: i18n.loadingScreen.poweredBy, // layout content is a string (this will be converted to pixi Text)
            styles: {
                position: 'leftTop', // center Layout in the bottom middle of parent (AppScreen layout in this case)
                color: 'white', // color of the text
                fontSize: 22, // font size of the text
            }
        },
        pixiLogo: {
            content: Sprite.from('pixi-logo'), // layout content is a sprite
            styles: {
                position: 'leftBottom', // center Layout in the bottom middle of parent (AppScreen layout in this case)
                scale: 0.9 // scale the sprite to 30%
            }
        }
    },
    styles: {
        position: 'leftBottom', // center Layout in the bottom middle of parent (AppScreen layout in this case)
        margin: 10, // set margin bottom to 10px
        maxWidth: '25%', // set max width to 60% of parent, so it will scale down to fit the screen width
        maxHeight: '5%', // set max height to 20% of parent, so it will scale down to fit the screen height
        height: 84 // set block height to 30px, so we can stick children to the tob & bottom of it
    }
});