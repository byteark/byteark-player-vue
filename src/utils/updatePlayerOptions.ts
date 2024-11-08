import type { ByteArkPlayer, ByteArkPlayerOptions } from '../types';

type PlayerOptionName =
  | 'autoplay'
  | 'aspectRatio'
  | 'breakpoints'
  | 'controls'
  | 'fill'
  | 'fluid'
  | 'loop'
  | 'language'
  | 'muted'
  | 'playbackRates'
  | 'playsinline'
  | 'poster'
  | 'preload'
  | 'responsive'
  | 'sources';

interface IPlayerOptions {
  name: PlayerOptionName;
  setter?: 'src';
}

const playerOptions: IPlayerOptions[] = [
  {
    name: 'autoplay',
  },
  {
    name: 'aspectRatio',
  },
  {
    name: 'breakpoints',
  },
  {
    name: 'controls',
  },
  {
    name: 'fill',
  },
  {
    name: 'fluid',
  },
  {
    name: 'loop',
  },
  {
    name: 'language',
  },
  {
    name: 'muted',
  },
  {
    name: 'playbackRates',
  },
  {
    name: 'playsinline',
  },
  {
    name: 'poster',
  },
  {
    name: 'preload',
  },
  {
    name: 'responsive',
  },
  {
    name: 'sources',
    setter: 'src',
  },
];

export function updatePlayerOptions(player: ByteArkPlayer, nextOptions: ByteArkPlayerOptions) {
  if (player.isDisposed()) {
    return;
  }

  playerOptions.forEach(({ name, setter }) => {
    const effectiveSetter: PlayerOptionName = (setter || name) as PlayerOptionName;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const selectedPlayerProperty = player[effectiveSetter];

    if (typeof selectedPlayerProperty === 'function') {
      selectedPlayerProperty.call(player, nextOptions[name]);
    }
  });
}
