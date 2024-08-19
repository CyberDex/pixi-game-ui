import { Assets, UnresolvedAsset } from 'pixi.js';
/** List of all assets available for this game, organized in bundles.
 * Each bundle is a group of assets that will be loaded together, for some specific scene.
 */
const assetsManifest = {
    bundles: [
        {
            name: 'preload',
            assets: [
                {
                    alias: 'spinner',
                    src: 'spinner.png',
                },
                {
                    alias: 'pixi-logo',
                    src: 'pixi-logo.png',
                },
            ],
        },
        {
            name: 'game',
            assets: [
                {
                    alias: 'avatar-05',
                    src: 'avatar-05.png',
                },
                {
                    alias: 'avatar_mask',
                    src: 'avatar_mask.png',
                },
                {
                    alias: 'Levels',
                    src: 'Examples/Levels.png',
                },
                {
                    alias: 'bg',
                    src: 'Examples/BG.png',
                },
                {
                    alias: 'SmallButton-disabled',
                    src: 'Buttons/SmallButton-disabled.png',
                },
                {
                    alias: 'SmallButton-hover',
                    src: 'Buttons/SmallButton-hover.png',
                },
                {
                    alias: 'SmallButton',
                    src: 'Buttons/SmallButton.png',
                },
                {
                    alias: 'Button-pressed',
                    src: 'Buttons/Button-pressed.png',
                },
                {
                    alias: 'SmallButton-pressed',
                    src: 'Buttons/SmallButton-pressed.png',
                },
                {
                    alias: 'SmallButton-substrate',
                    src: 'Window/SmallButton-substrate.png',
                },
                {
                    alias: 'Button-hover',
                    src: 'Buttons/Button-hover.png',
                },
                {
                    alias: 'Button-disabled',
                    src: 'Buttons/Button-disabled.png',
                },
                {
                    alias: 'Button',
                    src: 'Buttons/Button.png',
                },
                {
                    alias: 'SliderIcon',
                    src: 'Icons/SliderIcon.png',
                },
                {
                    alias: 'VertSliderBG',
                    src: 'Progress/VertSliderBG.png',
                },
                {
                    alias: 'SliderBG',
                    src: 'Progress/SliderBG.png',
                },
                {
                    alias: 'SmallProgress-silver',
                    src: 'Progress/SmallProgress-silver.png',
                },
                {
                    alias: 'ValueBG',
                    src: 'Progress/ValueBG.png',
                },
                {
                    alias: 'SmallProgress-blue',
                    src: 'Progress/SmallProgress-blue.png',
                },
                {
                    alias: 'SmallProgress-pink',
                    src: 'Progress/SmallProgress-pink.png',
                },
                {
                    alias: 'ProgressBlock',
                    src: 'Progress/ProgressBlock.png',
                },
                {
                    alias: 'ValueBGIcon',
                    src: 'Progress/ValueBGIcon.png',
                },
                {
                    alias: 'SmallProgressBarBG',
                    src: 'Progress/SmallProgressBarBG.png',
                },
                {
                    alias: 'ProgressBlock-fill',
                    src: 'Progress/ProgressBlock-fill.png',
                },
                {
                    alias: 'SwitchBG',
                    src: 'Window/SwitchBG.png',
                },
                {
                    alias: 'SmallSubstrate',
                    src: 'Window/SmallSubstrate.png',
                },
                {
                    alias: 'Radio',
                    src: 'Window/Radio.png',
                },
                {
                    alias: 'Radio-hover',
                    src: 'Window/Radio-hover.png',
                },
                {
                    alias: 'Radio-bg',
                    src: 'Window/Radio-bg.png',
                },
                {
                    alias: 'RoundSubstrate',
                    src: 'Window/RoundSubstrate.png',
                },
                {
                    alias: 'MediumSubstrate',
                    src: 'Window/MediumSubstrate.png',
                },
                {
                    alias: 'Substrate',
                    src: 'Window/Substrate.png',
                },
                {
                    alias: 'CheckBox-hover',
                    src: 'Window/CheckBox-hover.png',
                },
                {
                    alias: 'MenuWindow',
                    src: 'Window/MenuWindow.png',
                },
                {
                    alias: 'Ribbon',
                    src: 'Window/Ribbon.png',
                },
                {
                    alias: 'Hint',
                    src: 'Window/Hint.png',
                },
                {
                    alias: 'HintDown',
                    src: 'Window/Hint-down.png',
                },
                {
                    alias: 'MediumWindow',
                    src: 'Window/MediumWindow.png',
                },
                {
                    alias: 'Window',
                    src: 'Window/Window.png',
                },
                {
                    alias: 'SmallWindow',
                    src: 'Window/SmallWindow.png',
                },
                {
                    alias: 'ValueSubstrate',
                    src: 'Window/ValueSubstrate.png',
                },
                {
                    alias: 'CheckBox',
                    src: 'Window/CheckBox.png',
                },
                {
                    alias: 'ArrowIcon',
                    src: 'Icons/ArrowIcon.png',
                },
                {
                    alias: 'ChestIcon',
                    src: 'Icons/ChestIcon.png',
                },
                {
                    alias: 'HomeIcon',
                    src: 'Icons/HomeIcon.png',
                },
                {
                    alias: 'MenuIcon',
                    src: 'Icons/MenuIcon.png',
                },
                {
                    alias: 'PlusIcon',
                    src: 'Icons/PlusIcon.png',
                },
                {
                    alias: 'CloseIcon',
                    src: 'Icons/CloseIcon.png',
                },
                {
                    alias: 'HillIcon',
                    src: 'Icons/HillIcon.png',
                },
                {
                    alias: 'DethIcon',
                    src: 'Icons/DethIcon.png',
                },
                {
                    alias: 'TimeIcon',
                    src: 'Icons/TimeIcon.png',
                },
                {
                    alias: 'DeleteIcon',
                    src: 'Icons/DeleteIcon.png',
                },
                {
                    alias: 'PlayIcon',
                    src: 'Icons/PlayIcon.png',
                },
                {
                    alias: 'MinusIcon',
                    src: 'Icons/MinusIcon.png',
                },
                {
                    alias: 'PauseIcon',
                    src: 'Icons/PauseIcon.png',
                },
                {
                    alias: 'GemIcon',
                    src: 'Icons/gemIcon.png',
                },
                {
                    alias: 'LockIcon',
                    src: 'Icons/LockIcon.png',
                },
                {
                    alias: 'InfoIcon',
                    src: 'Icons/InfoIcon.png',
                },
                {
                    alias: 'EnergyIcon',
                    src: 'Icons/EnergyIcon.png',
                },
                {
                    alias: 'SettingsIcon',
                    src: 'Icons/SettingsIcon.png',
                },
                {
                    alias: 'Star',
                    src: 'Icons/Star.png',
                },
                {
                    alias: 'HardIcon',
                    src: 'Icons/HardIcon.png',
                },
                {
                    alias: 'StarIcon',
                    src: 'Icons/StarIcon.png',
                },
                {
                    alias: 'MeatIcon',
                    src: 'Icons/MeatIcon.png',
                },
                {
                    alias: 'DollarIcon',
                    src: 'Icons/DollarIcon.png',
                },
                {
                    alias: 'clouds',
                    src: 'BG/clouds.png',
                },
                {
                    alias: 'mountain2',
                    src: 'BG/mountain2.png',
                },
                {
                    alias: 'mountain1',
                    src: 'BG/mountain1.png',
                },
                {
                    alias: 'sky2',
                    src: 'BG/sky2.png',
                },
                {
                    alias: 'sky1',
                    src: 'BG/sky1.png',
                },
                {
                    alias: 'front',
                    src: 'BG/front.png',
                },
                {
                    alias: 'input',
                    src: 'input.png',
                },
                {
                    alias: 'spinner',
                    src: 'spinner.png',
                },
                {
                    alias: 'arrow_down',
                    src: 'arrow_down.png',
                },
            ],
        },
    ],
};

/** Initialise and start background loading of all assets */
export async function initAssets() {
    // Init PixiJS assets with this asset manifest
    await Assets.init({ manifest: assetsManifest, basePath: 'assets' });

    // Load assets for the load screen
    await Assets.loadBundle(['preload', 'default']);

    // List all existing bundles names
    const allBundles = assetsManifest.bundles.map((item) => item.name);

    // Start up background loading of all bundles
    Assets.backgroundLoadBundle(allBundles);
}

/**
 * Check to see if a bundle has loaded
 * @param bundle - The unique id of the bundle
 * @returns Whether or not the bundle has been loaded
 */
export function isBundleLoaded(bundle: string) {
    const bundleManifest = assetsManifest.bundles.find((b) => b.name === bundle);

    if (!bundleManifest) {
        return false;
    }

    for (const asset of bundleManifest.assets as UnresolvedAsset[]) {
        if (!Assets.cache.has(asset.alias as string)) {
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
