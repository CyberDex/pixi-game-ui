
import { AppScreen } from '../components/basic/AppScreen';
import { LoadingSpinner } from '../components/basic/LoadingSpinner';
import { PixiLogo } from '../components/basic/PixiLogo';
import { colors } from '../config/colors';

/** Load screen. 
 * To be used to show loading animation while assets are being loaded.
*/
export class LoadScreen extends AppScreen { // extends AppScreen that extends Layout that extends PIXI.Container
    public static assetBundles = ['preload']; // set section of assets to preload for this screen. Section is defined in assets.json. Handled by AssetLoader.

    constructor() {
        super('LoadScreen'); // Creates Layout with id 'LoadScreen'

        this.addContent({ // add children components (can be sprite or any container based pixi instance like Layout) to the Layout
            spinner: new LoadingSpinner(), // instance of Layout based component
            pixiLogo: PixiLogo() // Layout based component for the pixi logo
        });

        this.style.background = colors.bg; // set background color
    }

    public update(delta: number) {
        const spinner = this.content.getByID('spinner'); // get spinner Layout from the children tree

        if (spinner) { // if spinner is found, set rotation
            spinner.rotation += 0.1 * delta; // rotate spinner
        }
    }
}
