import { Application } from 'pixi.js';
import { initAssets } from './config/assets';
import { colors } from './config/colors';
import { game } from './Game';
import { GameScreen } from './screens/GameScreen';
import { LoadScreen } from './screens/LoadScreen';
import { TitleScreen } from './screens/TitleScreen';
import { getUrlParam } from './utils/gtUrlParams';
import { Windows } from './config/windows';

/** The PixiJS app Application instance, shared across the project */
export const app = new Application();

// Expose that app to the PixiJS Devtools (https://chrome.google.com/webstore/detail/pixijs-devtools/aamddddknhcagpehecnhphigffljadon)
// so we can debug the pixi app layers
(globalThis as any).__PIXI_APP__ = app;

/** Set up a resize function for the app */
function resize() {
    const windowWidth = window.innerWidth; // Get the width of the window
    const windowHeight = window.innerHeight; // Get the height of the window

    // Update canvas style dimensions and scroll window up to avoid issues on mobile resize
    app.renderer.canvas.style.width = `${windowWidth}px`; // Set the canvas width to the window width
    app.renderer.canvas.style.height = `${windowHeight}px`; // Set the canvas height to the window height
    window.scrollTo(0, 0); // Scroll to the top left of the window

    app.renderer.resize(windowWidth, windowHeight); // Resize the renderer
    // THIS IS IMPORTANT, IT WILL RESIZE THE LAYOUTS
    game.resize(windowWidth, windowHeight); // Resize the game and all scenes and their contents
}

/** Setup app and initialize assets */
async function init() {
    await app.init({
        resolution: Math.max(window.devicePixelRatio, 2),
        backgroundColor: colors.bg,
    });

    document.body.appendChild(app.canvas); // Add pixi canvas element (app.canvas) to the document's body

    window.addEventListener('resize', resize); // Whenever the window resizes, call the 'resize' function

    resize(); // Trigger the first resize

    await initAssets(); // Setup assets bundles (see assets.ts) and start up loading everything in background

    game.setLoadScreen(LoadScreen); // Set the load screen, it is a scene that will be shown while assets are loading

    // Show first screen (default option) - go straight to the scene if param is present in url
    switch (getUrlParam('scene')) {
        case 'game':
            await game.showScreen(GameScreen); // Show the game screen
            break;
        case 'load':
            await game.showScreen(LoadScreen); // Show the load screen
            break;
        default:
            await game.showScreen(TitleScreen, {
                window: Windows.pause, // show screen with PauseWindow opened
            }); // Show the title screen
            break;
    }
}

window.onload = init; // Init everything when the window loads
