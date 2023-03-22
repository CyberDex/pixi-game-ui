import i18n from "../../config/i18n";
import { Window } from "../basic/Window";
import { ViewController } from "../../controllers/ViewController";
import { CloseButton } from '../CloseButton';
import { Button } from "../basic/Button";
import { Sprite } from '@pixi/sprite';
import { CheckBox } from "../CheckBox";
import { RadioGroup } from "@pixi/ui";
import { Switch } from "../Switch";
import { colors } from "../../config/colors";
import { Slider } from "../Slider";
import { DottedProgress } from "../DottedProgress";

/** Layout based component for the settings window. */
export class SettingsWindow extends Window {
    constructor(private views: ViewController) { // pass the ViewController to the constructor to be able to control the views
        // give config differences to the Window base component
        super({ // Window constructor accepts an object with all the config
            title: i18n.titleScreen.settings.title, // text title of the window
            styles: { // styles is an object with all the styles that will be applied to the window
                maxWidth: '80%', // set max width to 80% of parent, so it will scale down to fit the screen width on canvas resize
                marginTop: -30, // set margin top to -30px, as there it a button on the bottom, this will make it fit the screen height
                marginBottom: 350, // set margin bottom to 350px, as there it a button on the bottom, this will make it fit the screen height
            }
        });
    }

    /** Create content of the component. Automatically called by extended class (see  Window.ts). */
    override createContent() { 
        const { SFX, GPU, subtitles, cutScenes, antiAliasing} = i18n.titleScreen.settings; // destructure the i18n object, text texts will be used in the window

        this.addCloseButton(); // add close button to the window
        this.addSaveButton(); // add save button to the window

        this.addGFX(); // add GFX section to the window
        this.addBGM(); // add BGM section to the window

        this.addSwitcher( // add SFX switcher to the window
            SFX, // text of the switcher
            60, // x position of the switcher
            420, // y position of the switcher
            (checked) => console.log(SFX, checked), // callback function that will be called when the switcher is clicked
            true // set the switcher to checked by default
        );

        this.addSwitcher( // add GPU switcher to the window
            GPU, // text of the switcher
            -290, // x position of the switcher
            520, // y position of the switcher
            (checked) => console.log(GPU, checked) // callback function that will be called when the switcher is clicked
        );
        
        this.addRadio( // add antiAliasing switch radio group to the window
            ['2x', '4x', '16x'], // array of radio buttons texts
            400, // x position of the radio group
            470, // y position of the radio group
            (_id, value) => console.log(`${antiAliasing} ${value}`) // callback function that will be called when the radio button is clicked
        );

        this.addCheckBox( // add subtitles checkbox to the window
            subtitles, // text of the checkbox
            430, // x position of the checkbox
            510, // y position of the checkbox
            (checked) => console.log(`${subtitles} ${checked}`), // callback function that will be called when the checkbox is clicked
            true // set the checkbox to checked by default
        );

        this.addCheckBox( // add cutScenes checkbox to the window
            cutScenes, // text of the checkbox
            430, // x position of the checkbox
            570, // y position of the checkbox
            (checked) => console.log(`${cutScenes} ${checked}`) // callback function that will be called when the checkbox is clicked
        );
    }

    /** Creates a button in bottomCenter of the window */
    private addSaveButton() {
        const saveButton = new Button( // create a new button
            i18n.titleScreen.settings.save, // text of the button
            () => { // callback function that will be called when the button is clicked
                console.log('Save settings'); // log to the console
                this.views.goBack(); // go back to the previous view
            }
        );

        this.addContent({ // add the button to the window
            saveButton: { // id of the button layout
                content: saveButton, // content of the layout is the button
                styles: { // styles of the layout
                    position: 'bottomCenter', // place the button in the bottomCenter of the window
                    marginBottom: -80, // move the button 80px up from the bottom of the window
                    width: 360, // set the width of the button layout to 360px
                }
            }
        });
    }

    /** Creates a close button in top right corner of the window */
    private addCloseButton() {
        const closeButton = new CloseButton(() => this.views.goBack()); // create a new close button, that will call the goBack method of the ViewController on click

        this.addContent({ // add the button to the window layout
            content: closeButton, // content of the layout is the button
            styles: { // styles of the layout
                position: 'right', // place the button in the right top corner of the parent layout
                marginTop: 50, // move the button 65px down from the top of the parent layout
                marginRight: -80, // move the button 70px left from the right of the parent layout
                width: closeButton.width, // set the width of the button layout to the width of the button
            }
        });
    }

    /** Creates a switcher and adds it to the window */
    private addGFX() {
        this.addContent({ // add the switcher to the window layout system
            content: { // object with the content of the layout ans its styles
                title: { // Content of the ribbon (text)
                    content: i18n.titleScreen.settings.GFX, // string given as a parameter
                    styles: { // Styles of the text
                        color: 'white', // color of the text
                        fontFamily: 'debussy', // font family of the text
                        fontSize: 60, // font size of the text
                        position: 'leftCenter', // center pixi Text in the middle of parent
                        stroke: colors.hoverStroke, // text stroke color
                        strokeThickness: 10, // text stroke thickness
                        maxWidth: '83%', // set max width to 83% of parent (ribbon), will scale down if the ribbon sprite is smaller than the text
                        maxHeight: '70%', // set max height to 70% of parent (ribbon), will scale down if the ribbon sprite is smaller than the text
                        overflow: 'hidden', // hide text that is out of bounds (ribbon sprite size)
                        marginLeft: 30, // move 20px to the right from the left side of the parent (ribbon)
                        marginTop: 7, // move 10px down from the top of the parent (ribbon)
                    },
                },
                slider: { // id of the slider layout
                    content: { // object with the content of the slider layout ans its styles
                        low: { // Content of the low label (text)
                            content: i18n.titleScreen.settings.low, // string given as a parameter, thar will be turned into a pixi Text
                            styles: { // Styles of the text layout, that will be applied to the pixi Text style too
                                color: 'white', // color of the text
                                fontFamily: 'debussy', // font family of the text
                                fontSize: 30, // font size of the text
                            }
                        },
                        medium: { // Content of the medium label (text)
                            content: i18n.titleScreen.settings.medium, // string given as a parameter, thar will be turned into a pixi Text
                            styles: { // Styles of the text layout, that will be applied to the pixi Text style too
                                color: 'white', // color of the text
                                fontFamily: 'debussy', // font family of the text
                                fontSize: 30, // font size of the text
                                position: 'centerTop', // center pixi Text in the middle of parent
                            }
                        },
                        high: { // Content of the high label (text)
                            content: i18n.titleScreen.settings.high, // string given as a parameter, thar will be turned into a pixi Text
                            styles: { // Styles of the text layout, that will be applied to the pixi Text style too
                                color: 'white', // color of the text
                                fontFamily: 'debussy', // font family of the text
                                fontSize: 30, // font size of the text
                                position: 'rightTop', // center pixi Text in the right top corner of the parent
                            }
                        },
                        slider: { // id of the slider layout
                            content: new Slider({ // create a new slider component
                                min: 1, // minimum value of the slider
                                max: 3, // maximum value of the slider
                                value: 2, // initial value of the slider
                                onChange: (value) => { // callback function that will be called when the slider value changes (after the user releases the mouse button)
                                    console.log(`${i18n.titleScreen.settings.GFX} ${Math.round(value)}`); // log to the console
                                }
                            }),
                            styles: { // styles of the slider layout
                                position: 'centerBottom', // place the slider in the center bottom of the parent
                                marginBottom: -40 // move the slider 40px up from the bottom of the parent
                            }
                        }
                    },
                    styles: { // styles of the slider layout
                        width: '70%', // set the width of the slider layout to 70% of the parent
                        height: '60%', // set the height of the slider layout to 60% of the parent
                        position: 'topRight', // place the slider in the top right corner of the parent
                        marginRight: 30, // move the slider 30px to the left from the right side of the parent
                        marginTop: 20, // move the slider 20px down from the top of the parent
                    }
                }
            },
            styles: {
                marginTop: 120, // move the switcher 120px down from the top of the parent
                position: 'centerTop', // place the switcher in the center top of the parent
                background: Sprite.from('Substrate') // set the Substrate sprite as a background of the switcher
            }
        });
    }

    /** Created a volume control section. */
    private addBGM() {
        this.addContent({ // add the volume control section to the window layout system
            content: { // object with the content of the layout ans its styles
                title: { // id of the section text layout
                    content: i18n.titleScreen.settings.BGM, // string given as a parameter that will be turned into a pixi Text
                    styles: { // Styles of the text layout, that will be applied to the pixi Text style too
                        color: 'white', // color of the text
                        fontFamily: 'debussy', // font family of the text
                        fontSize: 60, // font size of the text
                        position: 'leftCenter', // center pixi Text in the middle of parent (ribbon layout in this case)
                        stroke: colors.hoverStroke, // text stroke color
                        strokeThickness: 10, // text stroke thickness
                        maxWidth: '83%', // set max width to 83% of parent (ribbon), will scale down if the ribbon sprite is smaller than the text
                        maxHeight: '70%', // set max height to 70% of parent (ribbon), will scale down if the ribbon sprite is smaller than the text
                        overflow: 'hidden', // hide text that is out of bounds (ribbon sprite size)
                        marginLeft: 30, // move 20px to the right from the left side of the parent (ribbon)
                        marginTop: 7, // move 10px down from the top of the parent (ribbon)
                    },
                },
                soundControl: { // id of the sound control layout
                    content: new DottedProgress({ // create a new DottedProgress component (see DottedProgress.ts)
                        steps: 6, // number of steps in the progress bar
                        value: 3, // initial value of the progress bar
                        onChange: (value) => { // callback function that will be called when the progress bar value changes
                            console.log(`${i18n.titleScreen.settings.BGM} ${value}`); // log to the console
                        }
                    }),
                    styles: { // styles of the sound control layout
                        position: 'rightCenter', // place the sound control in the right center of the parent (ribbon layout in this case)
                    }
                }
            },
            styles: { // styles of the volume control section layout
                marginTop: 275, // move the volume control section 275px down from the top of the parent
                position: 'centerTop', // place the volume control section in the center top of the parent
                background: Sprite.from('Substrate') // set the Substrate sprite as a background of the volume control section
            }
        });
    }

    /** Created a checkBox like switches section and add it to the window layout system. */
    private addSwitcher(text: string, x: number, y: number, cb: (checked: boolean) => void, checked = false) {
        const gpuCheckbox = new Switch(text, checked, cb); // create a new Switch component (see Switch.ts)
        
        this.addContent({ // add the checkBox like switches section to the window layout system
            content: { // object with the content of the layout ans its styles
                switch: { // id of the switch layout
                    content: gpuCheckbox, // add the switch component to the layout
                    styles: { // styles of the switch layout
                        marginLeft: 180, // move the switch 180px to the right from the left side of the parent
                        marginTop: 25, // move the switch 25px down from the top of the parent
                    }
                }
            },
            styles: { // styles of the checkBox like switches section layout
                marginTop: y, // move the checkBox like switches section y px down from the top of the parent
                marginLeft: x, // move the checkBox like switches section x px to the right from the left side of the parent
                width: 350, // set the width of the checkBox like switches section to 350px
                height: 120, // set the height of the checkBox like switches section to 120px
            }
        });
    }
    
    /** Created a checkBox section and add it to the window layout system. */
    private addCheckBox(
        text: string, // text of the checkbox
        x: number,  // x position of the checkbox
        y: number, // y position of the checkbox
        cb: (checked: boolean) => void, // callback function that will be called when the checkbox state changes
        checked = false // initial state of the checkbox
        ) {
        this.addContent({ // add the checkBox section to the window layout system
            content: { // object with the content of the layout ans its styles
                switch: { // id of the switch layout
                    content: new CheckBox({ // create a new CheckBox component (see CheckBox.ts)
                        text, // text of the checkbox
                        checked, // initial state of the checkbox
                        checkboxBG: 'RoundSubstrate', // background of the checkbox
                        checkboxFG: 'CheckBox', // foreground of the checkbox
                        onChange: cb, // callback function that will be called when the checkbox state changes
                        textOffset: { // offset of the text from the checkbox
                            x: -300, // move the text 300px to the left from the checkbox
                            y: 3, // move the text 3px down from the checkbox
                        }
                    }),
                    styles: { // styles of the switch layout
                        marginLeft: 280, // move the switch 280px to the right from the left side of the parent
                        marginTop: 25, // move the switch 25px down from the top of the parent
                    }
                }
            },
            styles: { // styles of the checkBox section layout
                marginTop: y, // move the checkBox section y px down from the top of the parent
                marginLeft: x, // move the checkBox section x px to the right from the left side of the parent
                height: 80, // set the height of the checkBox section to 80px
                position: 'left', // place the checkBox section in the left side of the parent
                display: 'inline', // display the checkBox section as an inline element
            }
        });
    }
    
    /** Created a radio buttons section and add it to the window layout system. */
    private addRadio(
        items: string[], // array of the radio buttons
        x: number, // x position of the radio buttons section
        y: number, // y position of the radio buttons section
        cb: (selectedItemID: number, selectedVal: string) => void // callback function that will be called when the radio button state changes
        ) {
        const aniAliasingSelect = items.map((item, id) => // create an array of the radio buttons
            new CheckBox({ // create a new CheckBox component (see CheckBox.ts)
                text: item, // text of the radio button
                checked: false, // initial state of the radio button
                checkboxBG: 'RoundSubstrate', // background of the radio button
                checkboxFG: 'Radio', // foreground of the radio button
                onChange: () => { // callback function that will be called when the radio button state changes
                    console.log(`antiAliasing ${item}`); // log to the console
                    cb(id, item); // call the callback function
                },
                textStyle: { // styles of the text
                    fontSize: 30, // font size of the text
                    strokeThickness: 5, // text stroke thickness
                },
            })
        );

        this.addContent({ // add the radio buttons section to the window layout system
            aniAliasing: { // id of the radio buttons section layout
                content: { // object with the content of the layout ans its styles
                    title: { // id of the title layout
                        content: i18n.titleScreen.settings.antiAliasing, // title text that will be turned into a pixi Text
                        styles: {// Styles of the text also describing pixi Text styles
                            color: 'white', // color of the text
                            fontFamily: 'debussy', // font family of the text
                            fontSize: 60, // font size of the text
                            position: 'leftCenter', // center pixi Text in the middle of parent (ribbon layout in this case)
                            stroke: colors.hoverStroke, // text stroke color
                            strokeThickness: 10, // text stroke thickness
                            maxWidth: '83%', // set max width to 83% of parent (ribbon), will scale down if the ribbon sprite is smaller than the text
                            maxHeight: '70%', // set max height to 70% of parent (ribbon), will scale down if the ribbon sprite is smaller than the text
                            overflow: 'hidden', // hide text that is out of bounds (ribbon sprite size)
                            marginTop: 7, // move 10px down from the top of the parent (ribbon)
                            marginLeft: 50, // move 50px to the right from the left side of the parent (ribbon)
                        }
                    },
                    switch: { // id of the switch layout
                        content: new RadioGroup({ // create a new RadioGroup component (see RadioGroup.ts)
                            items: aniAliasingSelect, // array of the radio buttons
                            type: 'horizontal', // type of the radio buttons list alignment orientation
                            elementsMargin: 40, // margin between the radio buttons
                            selectedItem: 1, // initial selected radio button
                        }),
                        styles: { // styles of the switch layout
                            marginTop: 70, // move the switch 70px down from the top of the parent
                            width: 400, // set the width of the switch to 400px
                            height: 70, // set the height of the switch to 70px
                        }
                    }
                },
                styles: { // styles of the radio buttons section layout
                    position: 'left', // place the radio buttons section in the left side of the parent
                    marginTop: x, // move the radio buttons section x px down from the top of the parent
                    marginLeft: y, // move the radio buttons section y px to the right from the left side of the parent
                }
            }
        });
    }
}