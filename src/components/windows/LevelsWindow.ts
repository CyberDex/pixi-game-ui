import i18n from "../../config/i18n";
import { ScrollBox } from "@pixi/ui";
import { SmallButton } from "../SmallButton";
import { Window } from "../basic/Window";
import { MenuButton } from "../MenuButton";
import { game } from "../../Game";
import { GameScreen } from "../../screens/GameScreen";
import { ViewController } from "../../controllers/ViewController";
import { Windows } from '../../config/windows';
import { Sprite } from '@pixi/sprite';
import { colors } from "../../config/colors";

/** Window with buttons to select game level and some other navigational buttons. */
export class LevelsWindow extends Window { // extend Window class
    constructor(private views: ViewController) { // pass the ViewController to the constructor to be able to control the views
        // give config differences to the Window base component
        super({ // Window constructor accepts an object with all the config
            title: i18n.titleScreen.levels, // window text title
            styles: { // styles is an object with all the styles that will be applied to the window
                maxWidth: '80%', // set max width to 80% of parent, so it will scale down to fit the screen width on canvas resize
                marginTop: -30, // set margin top to -30px, as there it a button on the bottom, this will make it fit the screen height
                marginBottom: 350, // set margin bottom to 350px, as there it a button on the bottom, this will make it fit the screen height
            }
        });
    }

    /** Create content of the component. Automatically called by extended class (see  Window.ts). */
    override createContent() { 
        this.createLevelButtons(); // create level buttons
        this.createNavigationButtons(); // create navigation buttons
    }

    /** Create level buttons. */
    private createLevelButtons() {
        this.addContent({ // add the level buttons to the layout system of the Window
            levels: { // 'levels' is the id of the layer
                content: new ScrollBox({ // create a scroll box
                    width: 800, // set scroll box width
                    height: 558, // set scroll box height
                    items: this.levels, // set scroll box items (this is a method that returns an array of sprites)
                    radius: 70, // set scroll box radius (mask will be applied)
                    horPadding: 7, // set scroll box horizontal padding to offset the items
                    elementsMargin: 6, // set scroll box elements margin between each other
                    background: colors.levelBG, // set scroll box background color
                }),
                styles: { // styles is an object with all the styles that will be applied to the layer
                    position: 'center', // center Layout in the middle of parent
                    width: '85%', // set width to 85% of parent, so children will be able to use 85% of the parent width
                    height: '70%', // set height to 70% of parent, so children will be able to use 70% of the parent height
                    marginTop: -20, // move the `levels` layout up a bit from the center of the parent
                    zIndex: -10, // set z-index to -10, so it will be behind the window title
                }
            }
        });
    }

    /** Create levels buttons. */
    private get levels(): Sprite[] {
        const levels: Sprite[] = []; // create an array of sprites variable
        const levelsAmount = 50; // set the amount of levels (TODO:to be abstracted to a config file)
        const openLevels = 13; // set the amount of open levels (TODO: to be abstracted to a game state controller)

        for (let i = 0; i < levelsAmount; i += 1) { // loop through the levels
            const levelBlock = Sprite.from('SmallButton-substrate'); // create a button substrate
            
            const locked = openLevels < i + 1; // check if the level is locked

            const button = new SmallButton(`${i + 1}`, // create a button with the level number text on it
                () => game.showScreen(GameScreen, { level: i + 1 }), // on click, show the game screen with the selected level parameter passed
                locked // pass the locked state to the button (see SmallButton.ts)
            );
            
            button.x = levelBlock.width / 2; // set button x position
            button.y = levelBlock.height / 2 - 15; // set button y position

            levelBlock.addChild(button); // add the button to the substrate Sprite(Container)
            levelBlock.scale.set(0.87); // scale the substrate down a bit

            const holes: Sprite[] = []; // create an array of sprites variable for the stars holes

            for (let i = 0; i < 3; i++) { // create 3 holes for the stars
                const hole = Sprite.from('Radio-bg'); // create a hole sprite

                hole.anchor.set(0.5); // set anchor to the center of the sprite
                
                if (i === 0) { // set the x and y position of the first hole
                    hole.x = 40; // set x position
                    hole.y = levelBlock.height - 5; // set y position
                }
                
                if (i === 1) { // set the x and y position of the second hole
                    hole.x = levelBlock.width / 2 + 10; // set x position
                    hole.y = levelBlock.height + 5; // set y position
                }
                
                if (i === 2) { // set the x and y position of the third hole
                    hole.x = levelBlock.width - 20; // set x position
                    hole.y = levelBlock.height - 5; // set y position
                }

                holes.push(hole); // add the hole to the holes array

                levelBlock.addChild(hole); // add the hole to the substrate Sprite(Container)
            }

            if (!locked) { // if the level is not locked
                const stars = Math.round(Math.random() * 3); // get a random number of stars to show (TODO: to be abstracted to a game state controller)

                for (let i = 0; i < stars; i++) { // loop through the stars amount to be shown
                    const star = Sprite.from('StarIcon'); // create a star sprite
                    const hole = holes[i]; // get the hole sprite from the holes array

                    star.anchor.set(0.5); // set anchor to the center of the sprite
                    star.scale.set(0.5); // scale the star down a bit

                    star.x = hole.width / 2 - 12; // set x position
                    star.y = hole.height / 2 - 10; // set y position
    
                    holes[i].addChild(star); // add the star to the hole Sprite(Container)
                }
            }
        
            levels.push(levelBlock); // add the substrate to the levels array
        }

        return levels; // return the levels array to be added to the scroll box
    }

    /** Create navigational buttons. */
    private createNavigationButtons() {
        const homeButton = new MenuButton( // create a home button
            `HomeIcon`, // set the icon sprite texture
            i18n.titleScreen.iconsMenu.home, // set the button text
            () => this.views.show(Windows.pause) // on click, show the pause window
        );

        const infoButton = new MenuButton( // create an info button
            `InfoIcon`, // set the icon sprite texture
            i18n.titleScreen.iconsMenu.info, // set the button text
            () => this.views.show(Windows.info), // on click, show the info window
            Math.floor(Math.random() * 10) + 1 // set the button notification badge number (TODO: to be abstracted to a game state controller)
        );

        const settingsButton = new MenuButton( // create a settings button
            `SettingsIcon`, // set the icon sprite texture
            i18n.titleScreen.iconsMenu.settings, // set the button text
            () => this.views.show(Windows.settings) // on click, show the settings window
        );

        const playButton = new MenuButton( // create a play button
            `PlayIcon`, // set the icon sprite texture
            i18n.titleScreen.iconsMenu.play, // set the button text
            () => game.showScreen(GameScreen) // on click, show the game screen
        );

        this.addContent({ // add the buttons to the layout system of the screen
            bottomMenu: { // id of the layout
                content: { // content is an object with all the elements that will be added to the layout
                    homeButton: {
                        content: homeButton, // `homeButton` is an ID of the layout and the content in this case
                        styles: {
                            position: 'left', // set the position of the element to the top left of the parent (bottomMenu layout)
                        }
                    },
                    infoButton: {
                        content: infoButton, // `infoButton` is an ID of the layout  and the content in this case
                        styles: {
                            position: 'left', // set the position of the element to the top right of the parent (bottomMenu layout)
                            // this is to compensate playButton anchor point (0.5)
                            marginLeft: 190, // move the element a bit to the left from the left side of the parent
                        }
                    },
                    settingsButton: { 
                        content: settingsButton, // `settingsButton` is an ID of the layout  and the content in this case
                        styles: {
                            position: 'right', // set the position of the element to the top right of the parent (bottomMenu layout)
                            // this is to compensate playButton anchor point (0.5)
                            marginRight: 20, // move the element a bit to the right from the right side of the parent
                        }
                    },
                    playButton: {
                        content: playButton, // `playButton` is an ID of the layout  and the content in this case
                        styles: {
                            position: 'right', // set the position of the element to the top right of the parent (bottomMenu layout)
                            // this is to compensate playButton anchor point (0.5)
                            marginRight: -170, // move the element a bit to the right from the right side of the parent
                        }
                    },
                },
                styles: { // styles is an object with all the styles that will be applied to the layout
                    position: 'bottomCenter', // set the position of the layout to the bottom center of the parent (Window layout)
                    marginBottom: -110, // move the layout up a bit from the bottom of the parent
                    marginLeft: -10, // move the layout to the left a bit from the center of the parent
                    width: '70%',
                    height: 100,
                }
            },
        });
    }
}