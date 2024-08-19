import { Layout } from '@pixi/layout';
import { Sprite } from 'pixi.js';
import { colors } from '../config/colors';
import i18n from '../config/i18n';
import { defaultFont } from '../config/texts';

/** Layout based component for the loading spinner. */
export class LoadingSpinner extends Layout {
    constructor() {
        const spinnerSprite = Sprite.from('spinner'); // create a sprite
        spinnerSprite.anchor.set(0.5); // set anchor to the center of the sprite

        super({
            // Layout constructor accepts an object with all the config
            id: 'LoadingSpinner', // id is used to identify the Layout in the system
            content: {
                // content is an object with all the layers of the spinner
                spinner: {
                    // spinner is the id of the layer
                    content: spinnerSprite, // layout content is a sprite
                    styles: {
                        // styles is an object with all the styles that will be applied to the layer
                        // we need this offset as spinnerSprite anchor is set to 0.5
                        marginLeft: spinnerSprite.width / 2, // set margin left to half of the width of the sprite
                        marginTop: spinnerSprite.height / 2, // set margin top to half of the height of the sprite
                        // this is to compensate size Sfor the offset of the anchor
                        marginRight: -spinnerSprite.width / 2, // set margin right to negative half of the width of the sprite
                    },
                },
                loadingText: {
                    // loadingText is the id of the text layer
                    content: i18n.loadingScreen.loading, // layout content is a string (this will be converted to pixi Text)
                    styles: {
                        // styles is an object with all the styles that will be applied to the layer
                        // we set absolute position of the text, so it will not affect the layout size
                        position: 'center', // center Layout in the middle of parent
                        color: colors.text, // color of the text
                        marginTop: 100, // set margin top to 100px
                        fontFamily: defaultFont, // font family of the text
                    },
                },
            },
            styles: {
                // styles is an object with all the styles that will be applied to the layout
                position: 'center', // center Layout in the middle of parent
                maxHeight: '50%', // set max height to 20% of parent, so it will scale down to fit the screen height
                maxWidth: '60%', // set max width to 20% of parent, so it will scale down to fit the screen width
            },
        });
    }
}
