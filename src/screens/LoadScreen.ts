
import { AppScreen } from '../components/basic/AppScreen';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PixiLogo } from '../components/PixiLogo';
import { colors } from '../config/colors';
import { Layout } from '@pixi/layout';

/** Load screen. 
 * To be used to show loading animation while assets are being loaded.
*/
export class LoadScreen extends AppScreen { // extends AppScreen that extends Layout that extends PIXI.Container
    public static assetBundles = ['preload']; // set section of assets to preload for this screen. Section is defined in assets.json. Handled by AssetLoader.
    
    constructor() {
        super('LoadScreen'); // Creates Layout with id 'LoadScreen'

        this.addContent({ // add children components (can be sprite or any container based pixi instance like Layout) to the Layout
            spinnerLayout: new LoadingSpinner(), // instance of Layout based component
            pixiLogo: PixiLogo() // Layout based component for the pixi logo
        });

        this.setStyles({ // update styles of the Layout
            background: colors.bg, // set layout background color
        });
    }

    public onUpdate() {
        const spinner = this.getChildByID('spinner'); // get spinner Layout from the children tree
        
        if (spinner // if spinner is found
            // and it is a layout (we know it is a layout as we set it in LoadingSpinner class, 
            // but we check it for typescript and just to be sure)
            && spinner instanceof Layout // instanceof is a typescript operator that checks if the instance is of the type
        ) { 
            // we know it is first child as we set it in LoadingSpinner class
            const spinnerSprite = spinner.content.firstChild; // get first child of the spinner Layout

            spinnerSprite.rotation += 0.05; // rotate the spinner sprite
        }
    }
}
