import {
    CircularProgressBar,
    Dialog,
    DoubleSlider,
    FancyButton,
    List,
    Select,
    Switcher,
} from '@pixi/ui';
import { Container, Graphics, Sprite, Text, TextStyleOptions } from 'pixi.js';
import { colors } from '../../config/colors';
import i18n from '../../config/i18n';
import { defaultFont } from '../../config/texts';
import { ViewController } from '../../controllers/ViewController';
import { CloseButton } from '../CloseButton';
import { SmallButton } from '../SmallButton';
import { Window } from '../basic/Window';

const labelStyle: TextStyleOptions = {
    fill: colors.text,
    fontFamily: defaultFont,
    fontSize: 34,
    stroke: { width: 4, color: colors.hoverStroke },
};

/** Window that showcases @pixi/ui components not covered by the other windows:
 * Select, Switcher, CircularProgressBar, DoubleSlider, List and Dialog.
 */
export class ComponentsWindow extends Window {
    // Assigned in createContent, which the base class constructor calls. A field declaration
    // would be re-initialized after super() returns, so `declare` is used to avoid that.
    private declare stage: Container; // all the demo components are positioned inside of it

    constructor(private views: ViewController) {
        super({
            title: i18n.titleScreen.components.title,
            styles: {
                maxWidth: '80%',
                marginTop: -30,
                marginBottom: 350,
            },
        });
    }

    /** Create content of the component. Automatically called by extended class (see Window.ts). */
    override createContent() {
        this.stage = new Container();

        this.addCloseButton();

        this.addSwitcher();
        this.addCircular();
        this.addDoubleSlider();
        this.addList();
        this.addSelect();
        this.addDialog(); // added last, so the opened dialog is above the other components

        this.addContent({
            stage: {
                content: this.stage,
                styles: { position: 'topLeft' },
            },
        });
    }

    /** Add text label and return its container, positioned at the given coords. */
    private addLabel(text: string, x: number, y: number, fontSize = 34) {
        const label = new Text({ text, style: { ...labelStyle, fontSize } });

        label.position.set(x, y);
        this.stage.addChild(label);

        return label;
    }

    private addCloseButton() {
        const closeButton = new CloseButton(() => this.views.goBack());

        this.addContent({
            content: closeButton,
            styles: {
                position: 'right',
                marginTop: 50,
                marginRight: -80,
                width: closeButton.width,
            },
        });
    }

    /** Switcher toggling between two views on click. */
    private addSwitcher() {
        const { switcher } = i18n.titleScreen.components;
        const views = ['PlayIcon', 'PauseIcon'].map((icon) => {
            const holder = Sprite.from('SmallButton');
            const iconSprite = Sprite.from(icon);

            iconSprite.anchor.set(0.5);
            iconSprite.position.set(holder.width / 2, holder.height / 2 - 10);
            holder.addChild(iconSprite);
            holder.scale.set(0.5);

            return holder;
        });
        const component = new Switcher(views, 'onPress');

        component.position.set(470, 170);
        this.addLabel(switcher, 410, 110, 30);
        component.onChange.connect((state) => console.log(`${switcher} ${state}`));
        this.stage.addChild(component);
    }

    /** Circular progress bar, animated and re-started on click. */
    private addCircular() {
        const { circular } = i18n.titleScreen.components;

        const circularBar = new CircularProgressBar({
            backgroundColor: colors.disabledStroke,
            fillColor: colors.defaultStroke,
            backgroundAlpha: 1,
            fillAlpha: 1,
            radius: 45,
            lineWidth: 16,
            value: 0,
            cap: 'round',
        });

        circularBar.position.set(790, 230);
        circularBar.eventMode = 'static';
        circularBar.cursor = 'pointer';
        circularBar.on('pointertap', () => (circularBar.progress = 0));
        this.addLabel(circular, 700, 110, 30);
        this.stage.addChild(circularBar);

        // animate it: 0 -> 100 and over again
        const timer = window.setInterval(() => {
            circularBar.progress = (circularBar.progress + 1) % 101;
        }, 50);

        this.once('destroyed', () => window.clearInterval(timer));
    }

    /** Slider with two handles to select a range. */
    private addDoubleSlider() {
        const { doubleSlider } = i18n.titleScreen.components;
        const makeHandle = () => {
            const handle = Sprite.from('SliderIcon');

            handle.scale.set(0.45);

            return handle;
        };

        const slider = new DoubleSlider({
            bg: 'SliderBG',
            fill: 'SliderBG',
            slider1: makeHandle(),
            slider2: makeHandle(),
            min: 0,
            max: 100,
            value1: 20,
            value2: 70,
            showValue: true,
            valueTextStyle: { ...labelStyle, fontSize: 28 },
            valueTextOffset: { y: -50 },
        });

        slider.position.set(180, 400);
        this.addLabel(doubleSlider, 180, 300, 34);
        slider.onChange.connect((v1, v2) =>
            console.log(`${doubleSlider} ${Math.round(v1)} - ${Math.round(v2)}`),
        );
        this.stage.addChild(slider);
    }

    /** Horizontal list of buttons, with one more added on click of the plus. */
    private addList() {
        const { list } = i18n.titleScreen.components;
        const component = new List({ type: 'horizontal', elementsMargin: 12 });
        const add = () => {
            const n = component.children.length;

            const button = new SmallButton(`${n + 1}`, () => component.removeItem(n));

            button.scale.set(0.45);
            component.addChild(button);
        };

        for (let i = 0; i < 4; i++) add();

        component.position.set(100, 540);
        this.addLabel(list, 100, 465, 34);
        this.stage.addChild(component);
    }

    /** Button that opens a Dialog. */
    private addDialog() {
        const { dialog, openDialog, dialogTitle, dialogText, ok, cancel } =
            i18n.titleScreen.components;

        const button = (text: string) => {
            const fancy = new FancyButton({
                defaultView: 'Button',
                hoverView: 'Button-hover',
                pressedView: 'Button-pressed',
                text: new Text({
                    text,
                    style: {
                        ...labelStyle,
                        fontSize: 38,
                        stroke: { width: 6, color: colors.disabledStroke },
                    },
                }),
                textOffset: { y: -5 },
                padding: 11,
                animations: {
                    hover: { props: { scale: { x: 1.03, y: 1.03 } }, duration: 100 },
                    pressed: { props: { scale: { x: 0.95, y: 0.95 } }, duration: 100 },
                },
            });

            fancy.scale.set(0.6);

            return fancy;
        };

        const dialogView = new Dialog({
            background: new Graphics()
                .roundRect(0, 0, 640, 400, 50)
                .fill(colors.levelBG)
                .stroke({ width: 8, color: colors.border }),
            width: 640,
            height: 400,
            padding: 40,
            backdropAlpha: 0.6,
            closeOnBackdropClick: true,
            title: new Text({ text: dialogTitle, style: { ...labelStyle, fontSize: 56 } }),
            content: new Text({ text: dialogText, style: { ...labelStyle, fontSize: 32 } }),
            buttons: [button(ok), button(cancel)],
            animations: {
                open: { props: { alpha: 1 }, duration: 150 },
                close: { props: { alpha: 0 }, duration: 150 },
            },
        });

        dialogView.position.set(469, 330);
        dialogView.scale.set(0.9);
        dialogView.visible = false;
        dialogView.onSelect.connect((id, text) => {
            console.log(`${dialog} ${id} ${text}`);
            dialogView.close();
        });
        dialogView.onClose.connect(() => console.log(`${dialog} closed`));

        const opener = new SmallButton(openDialog, () => {
            dialogView.visible = true;
            dialogView.open();
        });

        opener.scale.set(0.45);
        opener.position.set(700, 560);
        this.addLabel(dialog, 650, 465, 34);
        this.stage.addChild(opener);
        this.stage.addChild(dialogView);
    }

    /** Dropdown select. */
    private addSelect() {
        const { select, options } = i18n.titleScreen.components;
        const width = 260;
        const height = 60;
        const field = () =>
            new Graphics()
                .roundRect(0, 0, width, height, 20)
                .fill(colors.levelBG)
                .stroke({ width: 4, color: colors.border });

        const component = new Select({
            closedBG: field(),
            openBG: field(),
            textStyle: { ...labelStyle, fontSize: 30 },
            items: {
                items: options,
                backgroundColor: colors.defaultStroke,
                hoverColor: colors.hoverStroke,
                width,
                height,
                textStyle: { ...labelStyle, fontSize: 30 },
                radius: 20,
            },
            selected: 1,
            selectedTextOffset: { x: -15, y: 0 },
            scrollBox: { width, height: height * 3, radius: 20 },
        });

        component.position.set(70, 170);
        component.onSelect.connect((id, text) => console.log(`${select} ${id} ${text}`));
        this.addLabel(select, 70, 110, 30);
        this.stage.addChild(component);
    }
}
