import { Sprite } from 'pixi.js';
import i18n from '../../config/i18n';
import { Windows } from '../../config/windows';
import { ViewController } from '../../controllers/ViewController';
import { game } from '../../Game';
import { GameScreen } from '../../screens/GameScreen';
import { Button } from '../basic/Button';
import { Window } from '../basic/Window';

/** Game menu component. */
export class PauseWindow extends Window {
    constructor(private views: ViewController) {
        // pass the ViewController to the constructor to be able to control the views
        // give config differences to the Window base component
        super({
            // Window constructor accepts an object with all the config
            title: i18n.titleScreen.menu.title, // menu title text
            styles: {
                // styles is an object with all the styles that will be applied to the window
                background: Sprite.from('MenuWindow'), // menu window background
                maxHeight: '80%', // set max height to 80% of parent, so it will scale down to fit the screen height on canvas resize
                maxWidth: '95%', // set max width to 95% of parent, so it will scale down to fit the screen width on canvas resize
            },
            ribbonStyles: {
                // ribbonStyles is an object with all the styles that will be applied to the ribbon layout
                marginTop: -27, // move the ribbon 27px up from the top of the parent
                scale: 0.7, // scale the ribbon sprite to 70% of it's original size
            },
        });
    }

    /** Create content of the component. Automatically called by extended class (see  Window.ts). */
    override createContent() {
        const levelsButton = new Button( // create a levels window navigational button
            i18n.titleScreen.menu.items.levels, // button text
            () => this.views.show(Windows.levels), // callback: show the levels window on click
        );

        const replayButton = new Button( // create a replay button
            i18n.titleScreen.menu.items.replay, // button text
            () => {
                // callback: restart the game on click
                game.showScreen(GameScreen, {
                    // show the game screen
                    restart: true, // give the game screen a restart flag
                });
            },
        );

        const settingsButton = new Button( // create a settings window navigational button
            i18n.titleScreen.menu.items.settings, // button text
            () => this.views.show(Windows.settings), // callback: show the settings window on click
        );

        const exitButton = new Button( // create an exit button
            i18n.titleScreen.menu.items.exit, // button text
            () => console.log('exit'), // callback: log exit on click (TODO: implement exit)
        );

        this.addContent({
            // add the buttons to the window layout system
            menu: {
                // menu is the id of the layout
                content: {
                    // content is the layout config object with all the buttons and their styles configs
                    levels: {
                        // levels is the id of the button
                        content: levelsButton, // content is the button component
                        styles: {
                            // styles is an object with all the styles that will be applied to the button
                            marginTop: 10, // move the button 10px down from the neighbour buttons
                        },
                    },
                    replay: {
                        // replay is the id of the button
                        content: replayButton, // content is the button component
                        styles: {
                            // styles is an object with all the styles that will be applied to the button
                            marginTop: 10, // move the button 10px down from the neighbour buttons
                        },
                    },
                    settings: {
                        // settings is the id of the button
                        content: settingsButton, // content is the button component
                        styles: {
                            // styles is an object with all the styles that will be applied to the button
                            marginTop: 10, // move the button 10px down from the neighbour buttons
                        },
                    },
                    exit: {
                        // exit is the id of the button
                        content: exitButton, // content is the button component
                        styles: {
                            // styles is an object with all the styles that will be applied to the button
                            marginTop: 10, // move the button 10px down from the neighbour buttons
                        },
                    },
                },
                styles: {
                    // styles is an object with all the styles that will be applied to the layout
                    position: 'centerTop', // center the layout in the middle of the parent
                    marginTop: 120, // move the layout 120px down from the top of the parent
                    width: '66%', // set width to 66% of parent, so children will be able to use 66% of the screen width
                },
            },
        });
    }
}
