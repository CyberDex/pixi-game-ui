import { Slider as BasicSlider } from '@pixi/ui';
import { SmallIconButton } from './SmallIconButton';

/** Slider config to be applied on Slider component.
 * So it can be used without setting all the configs.
 */
export class Slider extends BasicSlider {
    constructor(options: {
        min: number, // min value of the slider
        max: number, // max value of the slider
        value?: number, // current value of the slider
        onChange: (val: number) => void, // callback that will be called when slider value changes
    }) {
        const sliderButton = new SmallIconButton( // create a button that will be used as a slider
            'SliderIcon', // icon for the button
            () => {}, // callback for the button press, empty because we don't need it, all the interaction events are handled inside the Slider component
        );
        
        sliderButton.scale.set(0.45); // scale down the button

        super({ // create the Slider component
            bg: 'SliderBG', // background texture for the slider
            slider: sliderButton, // button that will be used as a slider
            min: options.min, // min value of the slider
            max: options.max, // max value of the slider
            value: options.value, // current value of the slider
        });

        this.onChange.connect(options.onChange); // connect slider change event to the provided callback
    }
}