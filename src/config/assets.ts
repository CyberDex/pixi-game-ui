import { Assets } from '@pixi/assets';

/** List of all assets available for this game, organized in bundles.
 * Each bundle is a group of assets that will be loaded together, for some specific scene.
 */
const assetsManifest = {
    bundles: [
        {
            name: 'preload',
            assets: [
                {
                    name: 'spinner',
                    srcs: 'assets/spinner.png',
                },
                {
                    name: 'pixi-logo',
                    srcs: 'assets/pixi-logo.png',
                },
            ],
        },
        {
            name: 'game',
            assets: [
                {
                    name: 'avatar-05',
                    srcs: 'assets/avatar-05.png',
                },
                {
                    name: 'avatar_mask',
                    srcs: 'assets/avatar_mask.png',
                },
                {
                    name: 'Levels',
                    srcs: 'assets/Examples/Levels.png',
                },
                {
                    name: 'bg',
                    srcs: 'assets/Examples/BG.png',
                },
                {
                    name: 'SmallButton-disabled',
                    srcs: 'assets/Buttons/SmallButton-disabled.png',
                },
                {
                    name: 'SmallButton-hover',
                    srcs: 'assets/Buttons/SmallButton-hover.png',
                },
                {
                    name: 'SmallButton',
                    srcs: 'assets/Buttons/SmallButton.png',
                },
                {
                    name: 'Button-pressed',
                    srcs: 'assets/Buttons/Button-pressed.png',
                },
                {
                    name: 'SmallButton-pressed',
                    srcs: 'assets/Buttons/SmallButton-pressed.png',
                },
                {
                    name: 'SmallButton-substrate',
                    srcs: 'assets/Window/SmallButton-substrate.png',
                },
                {
                    name: 'Button-hover',
                    srcs: 'assets/Buttons/Button-hover.png',
                },
                {
                    name: 'Button-disabled',
                    srcs: 'assets/Buttons/Button-disabled.png',
                },
                {
                    name: 'Button',
                    srcs: 'assets/Buttons/Button.png',
                },
                {
                    name: 'SliderIcon',
                    srcs: 'assets/Icons/SliderIcon.png',
                },
                {
                    name: 'VertSliderBG',
                    srcs: 'assets/Progress/VertSliderBG.png',
                },
                {
                    name: 'SliderBG',
                    srcs: 'assets/Progress/SliderBG.png',
                },
                {
                    name: 'SmallProgress-silver',
                    srcs: 'assets/Progress/SmallProgress-silver.png',
                },
                {
                    name: 'ValueBG',
                    srcs: 'assets/Progress/ValueBG.png',
                },
                {
                    name: 'SmallProgress-blue',
                    srcs: 'assets/Progress/SmallProgress-blue.png',
                },
                {
                    name: 'SmallProgress-pink',
                    srcs: 'assets/Progress/SmallProgress-pink.png',
                },
                {
                    name: 'ProgressBlock',
                    srcs: 'assets/Progress/ProgressBlock.png',
                },
                {
                    name: 'ValueBGIcon',
                    srcs: 'assets/Progress/ValueBGIcon.png',
                },
                {
                    name: 'SmallProgressBarBG',
                    srcs: 'assets/Progress/SmallProgressBarBG.png',
                },
                {
                    name: 'ProgressBlock-fill',
                    srcs: 'assets/Progress/ProgressBlock-fill.png',
                },
                {
                    name: 'SwitchBG',
                    srcs: 'assets/Window/SwitchBG.png',
                },
                {
                    name: 'SmallSubstrate',
                    srcs: 'assets/Window/SmallSubstrate.png',
                },
                {
                    name: 'Radio',
                    srcs: 'assets/Window/Radio.png',
                },
                {
                    name: 'Radio-hover',
                    srcs: 'assets/Window/Radio-hover.png',
                },
                {
                    name: 'Radio-bg',
                    srcs: 'assets/Window/Radio-bg.png',
                },
                {
                    name: 'RoundSubstrate',
                    srcs: 'assets/Window/RoundSubstrate.png',
                },
                {
                    name: 'MediumSubstrate',
                    srcs: 'assets/Window/MediumSubstrate.png',
                },
                {
                    name: 'Substrate',
                    srcs: 'assets/Window/Substrate.png',
                },
                {
                    name: 'CheckBox-hover',
                    srcs: 'assets/Window/CheckBox-hover.png',
                },
                {
                    name: 'MenuWindow',
                    srcs: 'assets/Window/MenuWindow.png',
                },
                {
                    name: 'Ribbon',
                    srcs: 'assets/Window/Ribbon.png',
                },
                {
                    name: 'Hint',
                    srcs: 'assets/Window/Hint.png',
                },
                {
                    name: 'HintDown',
                    srcs: 'assets/Window/Hint-down.png',
                },
                {
                    name: 'MediumWindow',
                    srcs: 'assets/Window/MediumWindow.png',
                },
                {
                    name: 'Window',
                    srcs: 'assets/Window/Window.png',
                },
                {
                    name: 'SmallWindow',
                    srcs: 'assets/Window/SmallWindow.png',
                },
                {
                    name: 'ValueSubstrate',
                    srcs: 'assets/Window/ValueSubstrate.png',
                },
                {
                    name: 'CheckBox',
                    srcs: 'assets/Window/CheckBox.png',
                },
                {
                    name: 'ArrowIcon',
                    srcs: 'assets/Icons/ArrowIcon.png',
                },
                {
                    name: 'ChestIcon',
                    srcs: 'assets/Icons/ChestIcon.png',
                },
                {
                    name: 'HomeIcon',
                    srcs: 'assets/Icons/HomeIcon.png',
                },
                {
                    name: 'MenuIcon',
                    srcs: 'assets/Icons/MenuIcon.png',
                },
                {
                    name: 'PlusIcon',
                    srcs: 'assets/Icons/PlusIcon.png',
                },
                {
                    name: 'CloseIcon',
                    srcs: 'assets/Icons/CloseIcon.png',
                },
                {
                    name: 'HillIcon',
                    srcs: 'assets/Icons/HillIcon.png',
                },
                {
                    name: 'DethIcon',
                    srcs: 'assets/Icons/DethIcon.png',
                },
                {
                    name: 'TimeIcon',
                    srcs: 'assets/Icons/TimeIcon.png',
                },
                {
                    name: 'DeleteIcon',
                    srcs: 'assets/Icons/DeleteIcon.png',
                },
                {
                    name: 'PlayIcon',
                    srcs: 'assets/Icons/PlayIcon.png',
                },
                {
                    name: 'MinusIcon',
                    srcs: 'assets/Icons/MinusIcon.png',
                },
                {
                    name: 'PauseIcon',
                    srcs: 'assets/Icons/PauseIcon.png',
                },
                {
                    name: 'GemIcon',
                    srcs: 'assets/Icons/gemIcon.png',
                },
                {
                    name: 'LockIcon',
                    srcs: 'assets/Icons/LockIcon.png',
                },
                {
                    name: 'InfoIcon',
                    srcs: 'assets/Icons/InfoIcon.png',
                },
                {
                    name: 'EnergyIcon',
                    srcs: 'assets/Icons/EnergyIcon.png',
                },
                {
                    name: 'SettingsIcon',
                    srcs: 'assets/Icons/SettingsIcon.png',
                },
                {
                    name: 'Star',
                    srcs: 'assets/Icons/Star.png',
                },
                {
                    name: 'HardIcon',
                    srcs: 'assets/Icons/HardIcon.png',
                },
                {
                    name: 'StarIcon',
                    srcs: 'assets/Icons/StarIcon.png',
                },
                {
                    name: 'MeatIcon',
                    srcs: 'assets/Icons/MeatIcon.png',
                },
                {
                    name: 'DollarIcon',
                    srcs: 'assets/Icons/DollarIcon.png',
                },
                {
                    name: 'clouds',
                    srcs: 'assets/BG/clouds.png',
                },
                {
                    name: 'mountain2',
                    srcs: 'assets/BG/mountain2.png',
                },
                {
                    name: 'mountain1',
                    srcs: 'assets/BG/mountain1.png',
                },
                {
                    name: 'sky2',
                    srcs: 'assets/BG/sky2.png',
                },
                {
                    name: 'sky1',
                    srcs: 'assets/BG/sky1.png',
                },
                {
                    name: 'front',
                    srcs: 'assets/BG/front.png',
                },
                {
                    name: 'input',
                    srcs: 'assets/input.png',
                },
                {
                    name: 'spinner',
                    srcs: 'assets/spinner.png',
                },
                {
                    name: 'arrow_down',
                    srcs: 'assets/arrow_down.png',
                },
            ],
        },
    ],
};

/** Initialize and start background loading of all assets */
export async function initAssets() {
    // Init PixiJS assets with this asset manifest
    await Assets.init({ manifest: assetsManifest });

    // Load assets for the load screen
    await Assets.loadBundle('preload');

    // List all existing bundles names
    const allBundles = assetsManifest.bundles.map((item: { name: string }) => item.name);

    // Start up background loading of all bundles
    Assets.backgroundLoadBundle(allBundles);
}

export function isBundleLoaded(bundle: string) {
    const bundleManifest = assetsManifest.bundles.find((b: { name: string }) => b.name === bundle);

    if (!bundleManifest) {
        return false;
    }

    for (const asset of bundleManifest.assets as any) {
        if (!Assets.cache.has(asset.name as string)) {
            return false;
        }
    }

    return true;
}

export function areBundlesLoaded(bundles: string[]) {
    for (const name of bundles) {
        if (!isBundleLoaded(name)) {
            return false;
        }
    }

    return true;
}
