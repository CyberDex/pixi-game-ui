import { AppScreen } from '../components/basic/AppScreen';
import { ViewController } from '../controllers/ViewController';
import { getUrlParam } from '../utils/gtUrlParams';
import { LevelsWindow } from '../components/windows/LevelsWindow';
import { PauseWindow } from '../components/windows/PauseWindow';
import { SettingsWindow } from '../components/windows/SettingsWindow';
import { Windows } from '../config/windows';
import { Window } from '../components/basic/Window';
import { InfoWindow } from '../components/windows/InfoWindow';
import { game, SceneData } from '../Game';

/** Title screen. 
 * To be used to show when game is on pause or before the game starts.
*/
export class TitleScreen extends AppScreen { // extends AppScreen that extends Layout that extends PIXI.Container
    public static assetBundles = ['game']; // set section of assets to preload for this screen. Section is defined in assets.json. Handled by AssetLoader.

    private views: ViewController; // view controller, used to manage windows

    static defaultWindow = Windows.levels; // default window to show

    constructor(options?: SceneData) {
        super('TitleScreen'); // Creates Layout with id 'TitleScreen'
        
        // add game background, handled by Game class to be shown on all screens
        // we add it here as we have to wait for it tot be preloaded
        game.addBG(); 

        this.views = new ViewController(); // create view controller

        this.createWindows(options?.window); // create windows
    }

    /** Create windows. 
     * Windows are Layout based components that are shown on top of the screen.
    */
    private createWindows(
        activeWindow?: Windows // active window to show
        ) { 
        this.addWindow(Windows.levels, new LevelsWindow(this.views)); // create LevelsWindow
        this.addWindow(Windows.pause, new PauseWindow(this.views)); // create PauseWindow
        this.addWindow(Windows.settings, new SettingsWindow(this.views)); // create SettingsWindow
        this.addWindow(Windows.info, new InfoWindow(this.views)); // create InfoWindow

        this.showActiveWindow(activeWindow); // show active window
    }

    /** Add window to the view controller and screen. */
    private addWindow(
        window: Windows, // window id 
        content: Window // window content component
        ) {
        this.views.add(window, content); // add window to the view controller
        
        this.addContent({ // add window to layout system
            [window]: this.views.get(window) // get window from the view controller and add it to layout system
        });
    }

    /** Show active window. */
    private async showActiveWindow(
        activeWindow?: Windows // window id to show
        ) { 
        const window = getUrlParam('window'); // get window param from url, used for debugging (TODO: remove this on production)
        
        // If window param is set, try to show it. If it fails, show default window.
        if (window) {
            try {
                await this.views.show(Windows[window as keyof typeof Windows]); // try to show window
                return;
            } catch (e) { // if window is not found, show message in console
                const error: Error = e as Error; // cast error to Error type
                console.error(error.message.replace('"undefined"', window)); // show error message
            }
        }

        await this.views.show(activeWindow ?? TitleScreen.defaultWindow); // show active window or default window
    }
}
