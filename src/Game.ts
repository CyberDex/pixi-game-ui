import { Assets } from '@pixi/assets';
import { areBundlesLoaded } from './config/assets';
import { app } from './main';
import { AppScreen } from './components/basic/AppScreen';
import { Layout } from '@pixi/layout';
import { Background } from './components/basic/Background';
import { Windows } from './config/windows';
import { DisplayObject } from '@pixi/display';

export type SceneData = {
    window?: Windows;
    level?: number;
    restart?: boolean;
};

/** Interface for app screens constructors */
interface AppScreenConstructor {
    new (data?: any): AppScreen;
    assetBundles?: string[];
}
/**
 * Class for controlling visibility of all scenes,
 * preload assets for each of them and create/update/resize them.
 *
 * It is also a navigation controller of the app.
 **/
class Game {
    // We DO NOT export this class, as we want to have only one instance of it, it is exported on the bottom of this file
    private currentScreen?: AppScreen; // Current screen being displayed
    private currentScreenResize?: () => void; // Resize function to avoid problems with scope
    private loadScreen?: AppScreen; // Default load screen

    private _w!: number; // last known width
    private _h!: number; // last known height

    public bg!: Layout; // background layout

    /** Set the  default load screen */
    public setLoadScreen(screen: AppScreenConstructor) {
        this.loadScreen = new screen(); // Create a new instance of the load screen given in `screen` parameter
    }

    /** Create game background */
    addBG() {
        this.bg = new Background(); // Create a new instance of the background layout

        this.bg.resize(this._w, this._h); // Resize background as it is a layout and it needs to know its size in order it's core functionality to work
        app.stage.addChild(this.bg as DisplayObject); // Add background to the stage
    }

    /** Add screen to the stage, link update & resize functions */
    private async addScreen(screen: AppScreen) {
        // Add screen to stage
        app.stage.addChild(screen as DisplayObject); // Add screen to the stage

        // Add screen's resize handler, if available
        if (screen.resize) {
            this.currentScreenResize = () => screen.resize; // Encapsulate resize in another function that can be removed later, to avoid scope issues with addEventListener
            screen.resize(this._w, this._h); // Trigger a first resize
        }

        if (screen.onUpdate) {
            // Add update function if it exists
            app.ticker.add(screen.onUpdate, screen); // Add update function to the ticker
        }

        if (screen.show) {
            // Show the new screen if it has a show method
            await screen.show(); // Wait for the screen to be shown
        }
    }

    /** Remove screen from the stage, unlink update & resize functions */
    private async removeScreen(screen: AppScreen) {
        if (screen.hide) {
            // Hide screen if method is available
            await screen.hide(); // Wait for the screen to be hidden
        }

        if (this.currentScreenResize) {
            // Unlink resize handler if exists
            window.removeEventListener('resize', this.currentScreenResize); // Remove resize listener
        }

        if (screen.onUpdate) {
            // Unlink update function if method is available
            app.ticker.remove(screen.onUpdate, screen); // Remove update function from the ticker
        }

        if (screen.parent) {
            // Remove screen from its parent (usually app.stage, if not changed)
            screen.parent.removeChild(screen as DisplayObject); // Remove screen from its parent
        }
    }

    /** Hide current screen (if there is one) and present a new screen. */
    public async showScreen(screen: AppScreenConstructor, data?: SceneData) {
        if (this.currentScreen) {
            // If there is a screen already created, hide and destroy it
            await this.removeScreen(this.currentScreen); // Remove current screen
            this.currentScreen.destroy(); // Destroy current screen
        }

        // Load assets for the new screen, if available
        if (screen.assetBundles && !areBundlesLoaded(screen.assetBundles)) {
            // If assets are not loaded yet, show loading screen, if there is one
            if (this.loadScreen) {
                this.addScreen(this.loadScreen); // Add loading screen to the stage
            }

            await Assets.loadBundle(screen.assetBundles); // Load all assets required by this new screen

            if (this.loadScreen) {
                // Hide loading screen, if exists
                this.removeScreen(this.loadScreen); // Remove loading screen from the stage
            }
        }

        this.currentScreen = new screen(data); // Create the new screen and set it as the current screen
        await this.addScreen(this.currentScreen); // Add the new screen to the stage
    }

    public resize(w: number, h: number) {
        this._w = w; // Update last known width
        this._h = h; // Update last known height
        this.currentScreen?.resize?.(w, h); // Resize current screen, if available
        this.bg?.resize(w, h); // Resize background, if available
    }
}

export const game = new Game(); // Export a new instance of the game
