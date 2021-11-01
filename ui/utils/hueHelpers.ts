export function getHueFromString(str: string = "") {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash % 360;
}

export function getHSL(hue: number, saturation: number, lightness: number) {
  return "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
}

export function getHSLFromString(
  str: string,
  saturation: number,
  lightness: number
) {
  const hue = getHueFromString(str);
  return getHSL(hue, saturation, lightness);
}
