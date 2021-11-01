export function getInitialsFromDisplay(displayName: string) {
  const splitName = displayName.split(" ");
  if (splitName.length > 1) {
    return splitName[0][0] + splitName[splitName.length - 1][0];
  } else {
    return splitName[0][0];
  }
}
