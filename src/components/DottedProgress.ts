import { Content, Layout } from "@pixi/layout";
import { SmallIconButton } from "./SmallIconButton";
import { Sprite } from '@pixi/sprite';
import { Button } from "@pixi/ui";

/** Layout based component for the volume control progress bar like controller. */
export class DottedProgress extends Layout {
    public _val = 0; // current value

    constructor(private options: {
        steps: number, // number of steps (blocks) of the progress bar
        value: number, // current value of the progress bar
        onChange: (value: number) => void, // callback that will be called when progress bar value changes
    }) {
        const dots: Content[] = []; // array of dots (blocks) of the progress bar, elements of this array are layout configs

        for (let i = 0; i < options.steps; i++) { // create all the dots (blocks) of the progress bar
            const button = new Button(Sprite.from('ProgressBlock')); // create a button that will be used as a dot (block) and a controller for the progress bar

            button.onDown.connect(() => { // connect button down event to the callback that will change the value of the progress bar
                this.val = i + 1; // set the value of the progress bar to the index of the dot (block) + 1
            });

            dots.push({ // add the dot (block) to the array of dots (blocks) layout configs list
                id: `dot${i}`, // id of the dot (block)
                content: { // content of the dot (block)
                    bg: { // bg is the id of the layer
                        content: button.view, // content is Sprite, that is wrapped up in the Button component (see Button.ts), so it is clickable
                        styles: { // styles is an object with all the styles that will be applied to the layer
                            position: 'center', // center Layout in the middle of parent
                        }
                    },
                    fill: { // fill is the id of the layer
                        content: Sprite.from('ProgressBlock-fill'), // content is a PIXI sprite, that indicates the progress of the progress bar
                        styles: { // styles is an object with all the styles that will be applied to the layer
                            position: 'center', // center Layout in the middle of parent
                        }
                    }
                },
                styles: { // styles is an object with all the styles that will be applied to the Layout
                    width: 60, // width of the Layout
                    height: 120, // height of the Layout
                }
            });
        }

        const minusButton = new SmallIconButton( // create a button that will decrease the value of the progress bar
            'MinusIcon', // icon texture name of the button
            () => { // callback for the button press
                if (this._val > 0) { // check if the value of the progress bar is greater than 0
                    this.val--; // decrease the value of the progress bar
                }
            }
        );
        minusButton.scale.set(0.65); // scale down the button

        const plusButton = new SmallIconButton( // create a button that will increase the value of the progress bar
            'PlusIcon', // icon texture name of the button
            () => { // callback for the button press
                if (this.val < options.steps) { // check if the value of the progress bar is less than the number of steps (blocks) of the progress bar
                    this.val++; // increase the value of the progress bar
                }
            }
        );
        plusButton.scale.set(0.65); // scale down the button

        super({ // create the Layout component
            content: { // content of the Layout
                minusButton: { // minusButton is the id of the layer
                    content: minusButton, // content is a button that will decrease the value of the progress bar
                    styles: { // styles is an object with all the styles that will be applied to the layer
                        position: 'left', // position the button to the left of the parent
                        marginTop: 70, // move the button up
                        marginLeft: 60, // move the button to the right
                    }
                },
                dots: { // dots is the id of the layer
                    content: dots, // content is an array of layout configs, that will be used to create the dots (blocks) of the progress bar
                    styles: { // styles is an object with all the styles that will be applied to the layer
                        marginLeft: 130, // move the dots (blocks) to the right
                        marginTop: 10, // move the dots (blocks) up
                    }
                },
                plusButton: { // plusButton is the id of the layer
                    content: plusButton, // content is a button that will increase the value of the progress bar
                    styles: { // styles is an object with all the styles that will be applied to the layer
                        position: 'right', // position the button to the right of the parent
                        marginTop: 70, // move the button up
                        marginRight: -40, // move the button to the left
                    }
                }
            },
            styles: { // styles is an object with all the styles that will be applied to the Layout
                width: '77%', // width of the Layout, so it will be scaled down to always fit 77% of the parent width
                height: '100%', // height of the Layout, so it will be scaled down to always fit 100% of the parent height
                marginLeft: 187, // move the Layout to the right
            }
        });

        this.val = options.value; // set the value of the progress bar

        this.updateState(); // update the state of the progress bar
    }

    // set the value of the progress bar
    public set val(val: number) {
        this._val = val; // set the value of the progress bar
        this.options.onChange(val); // call the callback that will be called when progress bar value changes
        this.updateState(); // update the state of the progress bar
    }

    // get the value of the progress bar
    public get val(): number {
        return this._val; // return the value of the progress bar
    }

    // update the state of the progress bar
    private updateState() {
        const dots = this.content.getByID(`dots`)?.children as Layout[]; // get the dots (blocks) of the progress bar

        dots.forEach((dot, i) => { // iterate through all the dots (blocks) of the progress bar
            const fill = dot.content.getByID(`fill`) as Layout; // get the fill layout of the dot (block) by it's ID
            fill.visible = i < this._val; // set the visibility of the fill layout of the dot (block) to true if the index of the dot (block) is less than the value of the progress bar
        });
    }
}