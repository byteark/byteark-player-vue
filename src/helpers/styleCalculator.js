const calculatePlaceholderPaddingTopFromAspectRatio = (aspectRatio) => {
  if (typeof aspectRatio === 'number') {
    return aspectRatio;
  }
  const [horizontalString, verticalString] = aspectRatio.split(':');
  const horizontal = Number.parseFloat(horizontalString);
  const vertical = Number.parseFloat(verticalString);
  return (vertical / horizontal) * 100;
};

export default calculatePlaceholderPaddingTopFromAspectRatio;
