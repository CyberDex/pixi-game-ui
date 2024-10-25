import { pixiPipes } from '@assetpack/core/pixi';

export default {
    entry: './assets',
    output: './public/assets',
    cache: true,
    logLevel: 'info',
    pipes: [
        ...pixiPipes({
            cacheBust: false,
            resolutions: { default: 1 },
            compression: { jpg: false, png: false, webp: false },
            texturePacker: { nameStyle: 'short' },
            audio: {},
            manifest: { createShortcuts: true },
        }),
    ],
    assetSettings: [
        {
            files: ['**/*.png'],
            settings: {
                compress: {
                    jpg: false,
                    png: true,
                    // all png files will be compressed to avif format but not webp
                    webp: false,
                    avif: false,
                },
            },
        },
    ],
};
