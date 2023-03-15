import { Assets, ResolverAssetsArray, ResolverManifest } from "@pixi/assets";

/** List of all assets available for this game, organized in bundles.
 * Each bundle is a group of assets that will be loaded together, for some specific scene.
 */
const assetsManifest: ResolverManifest = {
    bundles: [
        {
            name: 'preload',
            assets: [
                {
                    name: 'spinner',
                    srcs: 'images/spinner.png',
                },
                {
                    name: 'pixi-logo',
                    srcs: 'images/pixi-logo.png',
                },
            ],
        },
        {
            name: 'game',
            assets: [
                {
                    name: 'avatar-05',
                    srcs: 'images/avatar-05.png',
                },
                {
                    name: 'avatar_mask',
                    srcs: 'images/avatar_mask.png',
                },
                {
                    name: 'Levels',
                    srcs: 'images/Examples/Levels.png',
                },
                {
                    name: 'bg',
                    srcs: 'images/Examples/BG.png',
                },
                {
                    name:'SmallButton-disabled', 
                    srcs: 'images/Buttons/SmallButton-disabled.png'
                },
                {
                    name:'SmallButton-hover', 
                    srcs: 'images/Buttons/SmallButton-hover.png'
                },
                {
                    name:'SmallButton', 
                    srcs: 'images/Buttons/SmallButton.png'
                },
                {
                    name:'Button-pressed', 
                    srcs: 'images/Buttons/Button-pressed.png'
                },
                {
                    name:'SmallButton-pressed', 
                    srcs: 'images/Buttons/SmallButton-pressed.png'
                },
                {
                    name:'SmallButton-substrate', 
                    srcs: 'images/Window/SmallButton-substrate.png'
                },
                {
                    name:'Button-hover', 
                    srcs: 'images/Buttons/Button-hover.png'
                },
                {
                    name:'Button-disabled', 
                    srcs: 'images/Buttons/Button-disabled.png'
                },
                {
                    name:'Button', 
                    srcs: 'images/Buttons/Button.png'
                },
                {
                    name:'SliderIcon', 
                    srcs: 'images/Icons/SliderIcon.png'
                },
                {
                    name:'VertSliderBG', 
                    srcs: 'images/Progress/VertSliderBG.png'
                },
                {
                    name:'SliderBG', 
                    srcs: 'images/Progress/SliderBG.png'
                },
                {
                    name:'SmallProgress-silver', 
                    srcs: 'images/Progress/SmallProgress-silver.png'
                },
                {
                    name:'ValueBG', 
                    srcs: 'images/Progress/ValueBG.png'
                },
                {
                    name:'SmallProgress-blue', 
                    srcs: 'images/Progress/SmallProgress-blue.png'
                },
                {
                    name:'SmallProgress-pink', 
                    srcs: 'images/Progress/SmallProgress-pink.png'
                },
                {
                    name:'ProgressBlock', 
                    srcs: 'images/Progress/ProgressBlock.png'
                },
                {
                    name:'ValueBGIcon', 
                    srcs: 'images/Progress/ValueBGIcon.png'
                },
                {
                    name:'SmallProgressBarBG', 
                    srcs: 'images/Progress/SmallProgressBarBG.png'
                },
                {
                    name:'ProgressBlock-fill', 
                    srcs: 'images/Progress/ProgressBlock-fill.png'
                },
                {
                    name:'SwitchBG', 
                    srcs: 'images/Window/SwitchBG.png'
                },
                {
                    name:'SmallSubstrate', 
                    srcs: 'images/Window/SmallSubstrate.png'
                },
                {
                    name:'Radio', 
                    srcs: 'images/Window/Radio.png'
                },
                {
                    name:'Radio-hover', 
                    srcs: 'images/Window/Radio-hover.png'
                },
                {
                    name:'Radio-bg', 
                    srcs: 'images/Window/Radio-bg.png'
                },
                {
                    name:'RoundSubstrate', 
                    srcs: 'images/Window/RoundSubstrate.png'
                },
                {
                    name:'MediumSubstrate', 
                    srcs: 'images/Window/MediumSubstrate.png'
                },
                {
                    name:'Substrate', 
                    srcs: 'images/Window/Substrate.png'
                },
                {
                    name:'CheckBox-hover', 
                    srcs: 'images/Window/CheckBox-hover.png'
                },
                {
                    name:'MenuWindow', 
                    srcs: 'images/Window/MenuWindow.png'
                },
                {
                    name:'Ribbon', 
                    srcs: 'images/Window/Ribbon.png'
                },
                {
                    name:'Hint', 
                    srcs: 'images/Window/Hint.png'
                },
                {
                    name:'HintDown', 
                    srcs: 'images/Window/Hint-down.png'
                },
                {
                    name:'MediumWindow', 
                    srcs: 'images/Window/MediumWindow.png'
                },
                {
                    name:'Window', 
                    srcs: 'images/Window/Window.png'
                },
                {
                    name:'SmallWindow', 
                    srcs: 'images/Window/SmallWindow.png'
                },
                {
                    name:'ValueSubstrate', 
                    srcs: 'images/Window/ValueSubstrate.png'
                },
                {
                    name:'CheckBox', 
                    srcs: 'images/Window/CheckBox.png'
                },
                {
                    name:'ArrowIcon', 
                    srcs: 'images/Icons/ArrowIcon.png'
                },
                {
                    name:'ChestIcon', 
                    srcs: 'images/Icons/ChestIcon.png'
                },
                {
                    name:'HomeIcon', 
                    srcs: 'images/Icons/HomeIcon.png'
                },
                {
                    name:'MenuIcon', 
                    srcs: 'images/Icons/MenuIcon.png'
                },
                {
                    name:'PlusIcon', 
                    srcs: 'images/Icons/PlusIcon.png'
                },
                {
                    name:'CloseIcon', 
                    srcs: 'images/Icons/CloseIcon.png'
                },
                {
                    name:'HillIcon', 
                    srcs: 'images/Icons/HillIcon.png'
                },
                {
                    name:'DethIcon', 
                    srcs: 'images/Icons/DethIcon.png'
                },
                {
                    name:'TimeIcon', 
                    srcs: 'images/Icons/TimeIcon.png'
                },
                {
                    name:'DeleteIcon', 
                    srcs: 'images/Icons/DeleteIcon.png'
                },
                {
                    name:'PlayIcon', 
                    srcs: 'images/Icons/PlayIcon.png'
                },
                {
                    name:'MinusIcon', 
                    srcs: 'images/Icons/MinusIcon.png'
                },
                {
                    name:'PauseIcon', 
                    srcs: 'images/Icons/PauseIcon.png'
                },
                {
                    name:'GemIcon', 
                    srcs: 'images/Icons/gemIcon.png'
                },
                {
                    name:'LockIcon', 
                    srcs: 'images/Icons/LockIcon.png'
                },
                {
                    name:'InfoIcon', 
                    srcs: 'images/Icons/InfoIcon.png'
                },
                {
                    name:'EnergyIcon', 
                    srcs: 'images/Icons/EnergyIcon.png'
                },
                {
                    name:'SettingsIcon', 
                    srcs: 'images/Icons/SettingsIcon.png'
                },
                {
                    name:'Star', 
                    srcs: 'images/Icons/Star.png'
                },
                {
                    name:'HardIcon', 
                    srcs: 'images/Icons/HardIcon.png'
                },
                {
                    name:'StarIcon', 
                    srcs: 'images/Icons/StarIcon.png'
                },
                {
                    name:'MeatIcon', 
                    srcs: 'images/Icons/MeatIcon.png'
                },
                {
                    name:'DollarIcon', 
                    srcs: 'images/Icons/DollarIcon.png'
                },
                {
                    name:'clouds', 
                    srcs: 'images/BG/clouds.png'
                },
                {
                    name:'mountain2', 
                    srcs: 'images/BG/mountain2.png'
                },
                {
                    name:'mountain1', 
                    srcs: 'images/BG/mountain1.png'
                },
                {
                    name:'sky2', 
                    srcs: 'images/BG/sky2.png'
                },
                {
                    name:'sky1', 
                    srcs: 'images/BG/sky1.png'
                },
                {
                    name:'front', 
                    srcs: 'images/BG/front.png'
                },
                {
                    name:'input',
                    srcs: 'images/input.png'
                },
                {
                    name:'spinner', 
                    srcs: 'images/spinner.png'
                },
                {
                    name:'arrow_down', 
                    srcs: 'images/arrow_down.png'
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
    const allBundles = assetsManifest.bundles.map((item) => item.name);

    // Start up background loading of all bundles
    Assets.backgroundLoadBundle(allBundles);
}

export function isBundleLoaded(bundle: string) {
    const bundleManifest = assetsManifest.bundles.find((b) => b.name === bundle);

    if (!bundleManifest) {
        return false;
    }

    for (const asset of bundleManifest.assets as ResolverAssetsArray) {
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
