export function getEventCoords(ev, targetSelector) {
  let boxInfo;

  const path = ev.nativeEvent.composedPath();
  const target = targetSelector
    ? path.find((element) => element.matches?.(targetSelector))
    : null;
  if (target) {
    boxInfo = target.getBoundingClientRect();
  } else {
    boxInfo = ev.target.getBoundingClientRect();
  }

  return {
    x: boxInfo.x,
    y: boxInfo.y,
    width: boxInfo.width,
    height: boxInfo.height,
    detail: ev.detail,
  };
}

export function shortId() {
  return `_${Math.random().toString(36).substring(2, 11)}`;
}
