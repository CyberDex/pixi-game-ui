import { AppScreen } from '../components/basic/AppScreen';
import i18n from '../config/i18n';
import { SmallIconButton } from '../components/SmallIconButton';
import { game, SceneData } from '../Game';
import { TitleScreen } from './TitleScreen';
import { colors } from '../config/colors';
import { Windows } from '../config/windows';
import { Sprite } from '@pixi/sprite';
import { MaskedFrame, ProgressBar } from '@pixi/ui';
import { Hint } from '../components/Hint';
import { CloseButton } from '../components/CloseButton';
import { Layout } from '@pixi/layout';
import { defaultFont } from '../config/texts';

/** Game screen. 
 * To be used to show all the game play and UI.
*/
export class GameScreen extends AppScreen { // GameScreen extends AppScreen, which is a Layout with a few additional features
    public static assetBundles = ['game']; // asset bundles that will be loaded before the screen is shown
    
    private energy!: ProgressBar; // energy bar
    private health!: ProgressBar; // health bar
    private energyModificator = 0; // energy modificator used to control the energy bar change speed
    private healthModificator = 0; // health modificator used to control the health bar change speed
    
    private tutorialMessage!: Hint; // tutorial message, dialog box with a message

    public level = 1; // current level (TODO: this should be a part of the game state)

    constructor(options: SceneData) { // constructor accepts an object with data that will be passed to the screen when it is shown
        super('GameScreen'); // Creates Layout with id 'GameScreen'

        if (options?.level) { // if level is passed to the screen
            this.level = options.level; // set the level to the passed value
        }

        this.addLevel(); // add level text component to the screen
        this.addPauseButton(); // add pause button component to the screen
        this.addHealthBar(); // add health bar component to the screen
        this.addEnergyBar(); // add energy bar component to the screen
        this.addTutorialBlock(); // add tutorial block component to the screen
    }

    /** Add level text component to the screen. */
    private addLevel() {
        this.addContent({ // add content to the screen layout
            content: `${i18n.gameScreen.level} ${this.level}`, // layout content is a string (this will be converted to pixi Text)
            styles: { // styles is an object with all the styles that will be applied to the layer
                position: 'centerTop', // center Layout in the top middle of parent (AppScreen layout in this case)
                color: colors.text, // set text color (this will be propagated to a pixi Text element created under the hoof)
                fontSize: 50, // set font size (this will be propagated to a pixi Text element created under the hoof)
                marginTop: -2, // move 10px down from the top of the parent as the anchor point is 0.5
                fontFamily: defaultFont, // set font family (this will be propagated to a pixi Text element created under the hoof)
                maxWidth: '30%', // set max width to 30% of the parent width so the layout witt scale down if the screen width is too small to fit it
                maxHeight: '10%', // set max height to 10% of the parent height so the layout witt scale down if the screen height is too small to fit it
                stroke: colors.disabledStroke, // text stroke color
                strokeThickness: 8, // text stroke thickness
            }
        });
    }

    /** Add pause button component to the screen.
     * Pause button suits to pause the game and show the pause window and the title screen.
     */
    private addPauseButton() {
        const button = new SmallIconButton('PauseIcon', () => { // create a button with a custom icon
            game.showScreen( // show TitleScreen with default window (pauseWindow) opened
                TitleScreen, // screen to show
                {
                    window: Windows.pause // show screen with PauseWindow opened
                }
            ); 
        });

        this.addContent({ // add content to the screen layout
            content: button,
            styles: { // set styles for the button block
                position: 'bottomRight', // position the button in the bottom right corner of the parent
                scale: 0.35, // scale button 0.5 times
                maxWidth: '20%', // set max width to 20% of the parent width so the layout witt scale down if the screen width is too small to fit it
                maxHeight: '20%', // set max height to 20% of the parent height so the layout witt scale down if the screen height is too small to fit it
                // as button anchor is 0.5, we want to compensate it's offsets:
                // -30 is a compensation of the button anchor offset
                // +10 is actually a margin we want to have between the button and the parent edge
                marginRight: -30 + 10, // move the button 10px to the right
                marginBottom: -30 + 10, // move the button 10px down
            },
        });
    }

    /** Add health bar component to the screen.
     * It suits to show the health of the player.
     */
    private addHealthBar() {
        // set progress bar to a variable, so we can change it's progress laterS
        this.health = new ProgressBar({ // create a progress bar
            bg: 'SmallProgressBarBG', // set background texture
            fill: 'SmallProgress-pink', // set fill texture
            fillOffset: { // set fill offset
                y: -10, // move fill 10px up
                x: 30, // move fill 30px right
            },
            progress: 0 // set initial progress to 0
        });

        this.addContent({ // add content to the screen layout
            content: { // content is an object with all the content that will be added to the layer
                healthProgress: this.health,
                health: { // health is the id of the layer
                    content: Sprite.from('HardIcon'), // layout content is a sprite
                    styles: { // set styles for the sprite
                        position: 'left', // position the sprite to the left of the parent
                        marginLeft: -40, // move the sprite 40px to the left
                    }
                },
            },
            styles: { // set styles for the health block
                position: 'right', // position the block to the right of the parent
                maxWidth: '30%', // set max width to 30% of the parent width so the layout witt scale down if the screen width is too small to fit it
                maxHeight: '10%', // set max height to 10% of the parent height so the layout witt scale down if the screen height is too small to fit it
                margin: 10, // set margin to 10px
                marginRight: 10, // move the block 20px to the right
                scale: 0.5, // scale the block 0.5 times
            }
        });
    }

    /** Add energy bar component to the screen. 
     * It suits to show the energy of the player.
    */
    private addEnergyBar() {
        // set progress bar to a variable, so we can change it's progress later
        this.energy = new ProgressBar({ // create a progress bar
            bg: 'SmallProgressBarBG', // set background texture
            fill: 'SmallProgress-blue', // set fill texture
            fillOffset: { // set fill offset
                y: -10, // move fill 10px up
                x: 30, // move fill 30px right
            },
            progress: 0 // set initial progress to 0
        });

        this.addContent({ // add content to the screen layout
            content: { // content is an object with all the content that will be added to the layer
                energyProgress: this.energy, // add progress bar to the layer
                energy: { // energy is the id of the layer
                    content: Sprite.from('EnergyIcon'), // layout content is a sprite
                    styles: { // set styles for the sprite
                        position: 'left', // position the sprite to the left of the parent
                        marginLeft: -10, // move the sprite 10px to the left
                        marginTop: -5 // move the sprite 5px up
                    }
                },
            },
            styles: { // set styles for the energy block
                position: 'left', // position the block to the left of the parent
                maxWidth: '30%', // set max width to 30% of the parent width so the layout witt scale down if the screen width is too small to fit it
                maxHeight: '10%', // set max height to 10% of the parent height so the layout witt scale down if the screen height is too small to fit it
                margin: 10, // set margin to 10px
                marginLeft: 20, // move the block 20px to the left
                scale: 0.5, // scale the block 0.5 times
            }
        });
    }

    /** Add tutorial message component to the screen. 
     * It suits to show the tutorial message and navigate the player through the game.
    */
    private addTutorialBlock() {
        const avatar = new MaskedFrame({ // create a masked frame component, it will add a frame around the target image
            target: Sprite.from('avatar-05'), // set help character image
            mask: 'avatar_mask', // set mask texture, to generate the mask shape
            borderWidth: 5, // set border width
            borderColor: colors.border, // set border color
        });
        
        // To be moved around game elements with updating if the text.
        // We set it to a variable for easy access.
        this.tutorialMessage = new Hint(i18n.gameScreen.tutorial.hello, 'up'); // create a hint component, it will show a message with an arrow pointing to the target
        
        this.tutorialMessage.hide(true); // hide the hint by default
        
        // Show the hint after 1 second. (TODO: move to the game logic)
        setTimeout(() => {
            this.tutorialMessage.show(); // show the hint
        }, 1000);

        this.addContent({ // add content to the screen layout
            // se are setting this id of this layout to 'tutorialBlock', so we can access it later by `getChildByID`
            tutorialBlock: { // tutorialBlock is the id of the layer
                content: { // content is an object with all the content that will be added to the layer
                    avatar, // this is gonna be a layout with id 'avatar' and content of the avatar variable
                    message: { // message is the id of the layer
                        content: this.tutorialMessage, // layout content is a hint
                        styles: {
                            height: 1, // set the height so the layout will be visible
                            position: 'right', // position the block to the right of the parent
                            marginRight: -130, // move the block 130px to the right
                            marginTop: -230, // move the block 230px up
                        }
                    },
                    closeButton: { // closeButton is the id of the layer
                        content: new CloseButton(() => { // create a close button with the given callback
                            // click on this button will hide the tutorial block
                            const tutorialBlock = this.getChildByID('tutorialBlock') as Layout; // get the tutorial block layout
                            tutorialBlock.visible = false; // hide the tutorial block
                        }),
                        styles: { // set styles for the close button
                            position: 'rightTop', // position the block to the right top of the parents
                            marginRight: -35, // move the block 10px to the rights
                            marginTop: 25, // move the block 10px up
                            scale: 0.5, // scale the button 0.5 times
                        }
                    }
                },
                styles: { // set styles for the picture block
                    marginLeft: 8, // move the block 20px to the left
                    marginBottom: 8, // move the block 20px down
                    maxWidth: '30%', // set max width to 30% of the parent width so the layout witt scale down if the screen width is too small to fit it
                    maxHeight: '30%', // set max height to 30% of the parent height so the layout witt scale down if the screen height is too small to fit it
                    position: 'leftBottom', // position the block to the left bottom of the parent
                }
            },
        });
    }

    /** Method that is called one every game tick (see Game.ts) */
    onUpdate() {
        if (this.energy) {
            // Update energy progress bar
            if (this.energy.progress === 100) { // if the progress is 100
                this.energyModificator = -1; // set modificator to move progress down
            } else if (this.energy.progress === 0) { // if the progress is 0
                this.energyModificator = 1; // set modificator to move progress up
            }

            this.energy.progress += this.energyModificator; // update energy progress bar
        }
        
        if (this.health) {
            // Update health progress bar
            if (this.health.progress === 100) { // if the progress is 100
                this.healthModificator = -1; // set modificator to move progress down
            } else if (this.health.progress === 0) { // if the progress is 0
                this.healthModificator = 1; // set modificator to move progress up
            }

            this.health.progress += this.healthModificator; // update health progress bar
        }
    }
}
