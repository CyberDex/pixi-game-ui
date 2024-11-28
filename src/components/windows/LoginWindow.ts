import { colors } from './../../config/colors';
import { NineSliceSprite, Texture } from 'pixi.js';
import i18n from '../../config/i18n';
import { Button } from '../basic/Button';
import { Window } from '../basic/Window';
import { Input } from '@pixi/ui';
import { CheckBox } from '../CheckBox';
import { type ViewController } from '../../controllers/ViewController';
import { Windows } from '../../config/windows';

/** Game menu component. */
export class LoginWindow extends Window {
    constructor(private views: ViewController) {
        const substrateTexture = Texture.from('MenuWindow');

        const background = new NineSliceSprite({
            texture: substrateTexture,
            leftWidth: 100,
            topHeight: 100,
            rightWidth: 100,
            bottomHeight: 200,
        });

        // give config differences to the Window base component
        super({
            // Window constructor accepts an object with all the config
            title: i18n.titleScreen.login.title, // menu title text
            styles: {
                // styles is an object with all the styles that will be applied to the window
                background: background, // menu window background
                width: 700,
                height: 700,
                maxHeight: '80%', // set max height to 80% of parent, so it will scale down to fit the screen height on canvas resize
                maxWidth: '95%', // set max width to 95% of parent, so it will scale down to fit the screen width on canvas resize
            },
            ribbonStyles: {
                // ribbonStyles is an object with all the styles that will be applied to the ribbon layout
                marginTop: -34, // move the ribbon 27px up from the top of the parent
                scale: 0.7, // scale the ribbon sprite to 70% of it's original size
            },
        });
    }

    /** Create content of the component. Automatically called by extended class (see  Window.ts). */
    override createContent() {
        const loginInput = new Input({
            bg: 'input',
            nineSliceSprite: [160, 27, 160, 27],
            textStyle: {
                // styles of the text
                fill: colors.text, // color of the text
                fontSize: 30, // font size of the text,
                stroke: { width: 3, color: colors.hoverStroke }, // text stroke thickness
            },
            align: 'center',
            placeholder: i18n.titleScreen.login.items.login,
            addMask: true,
            cleanOnFocus: true,
        });

        loginInput.width = 450;
        loginInput.height = 60;

        const passwordInput = new Input({
            bg: 'input',
            nineSliceSprite: [160, 27, 160, 27],
            textStyle: {
                // styles of the text
                fill: colors.text, // color of the text
                fontSize: 30, // font size of the text,
                stroke: { width: 3, color: colors.hoverStroke }, // text stroke thickness
            },
            align: 'center',
            placeholder: i18n.titleScreen.login.items.password,
            addMask: true,
        });

        passwordInput.width = 450;
        passwordInput.height = 60;

        const remember = new CheckBox({
            // create a new CheckBox component (see CheckBox.ts)
            text: i18n.titleScreen.login.items.remember, // text of the checkbox
            checked: true, // initial state of the checkbox
            checkboxBG: 'RoundSubstrate', // background of the checkbox
            checkboxFG: 'CheckBox', // foreground of the checkbox
            onChange: () => {
                console.log('remember me'); // callback function that will be called when the checkbox state changes
            }, // callback function that will be called when the checkbox state changes
            textOffset: {
                // offset of the text from the checkbox
                x: 20, // move the text 300px to the left from the checkbox
                y: 0, // move the text 3px down from the checkbox
            },
        });

        const enterButton = new Button( // create an exit button
            i18n.titleScreen.login.items.enter, // button text
            () => {
                console.table({
                    login: loginInput.value,
                    password: passwordInput.value,
                    remember: remember.checked,
                });

                // TODO: implement check login errors here

                this.views.show(Windows.levels);
            },
        );

        enterButton.scale.set(0.5);

        this.addContent({
            // add the buttons to the window layout system
            menu: {
                // menu is the id of the layout
                content: {
                    login: {
                        // login is the id of the input
                        content: loginInput, // content is the button component
                        styles: {
                            // styles is an object with all the styles that will be applied to the button
                            marginTop: 30, // move the button 10px down from the neighbour buttons
                        },
                    },
                    password: {
                        // login is the id of the input
                        content: passwordInput, // content is the button component
                        styles: {
                            // styles is an object with all the styles that will be applied to the button
                            marginTop: 30, // move the button 10px down from the neighbour buttons
                        },
                    },
                    remember: {
                        // exit is the id of the button
                        content: remember, // content is the button component
                        styles: {
                            // styles is an object with all the styles that will be applied to the button
                            marginTop: 30,
                            marginLeft: 40,
                        },
                    },
                    exit: {
                        // exit is the id of the button
                        content: enterButton, // content is the button component
                        styles: {
                            // styles is an object with all the styles that will be applied to the button
                            marginTop: -20, // move the button 10px down from the neighbour buttons
                            marginLeft: 45,
                        },
                    },
                },
                styles: {
                    // styles is an object with all the styles that will be applied to the layout
                    position: 'centerTop', // center the layout in the middle of the parent
                    marginTop: 120, // move the layout 120px down from the top of the parent
                    width: 450, // set width to 66% of parent, so children will be able to use 66% of the screen width
                },
            },
        });
    }
}
