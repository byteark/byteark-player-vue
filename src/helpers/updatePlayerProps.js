const playerProps = [
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
    name: 'crossorigin',
  },
  {
    name: 'currentTime',
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
    name: 'playbackRate',
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
    name: 'seekButtons',
  },
  {
    name: 'sources',
    setter: 'src',
  },
  {
    name: 'volume',
  },
];

export default function updatePlayerProps(player, nextProps) {
  playerProps.forEach(({ name, setter }) => {
    const effectiveSetter = setter || name;
    player[effectiveSetter](nextProps[name]);
  });
}
