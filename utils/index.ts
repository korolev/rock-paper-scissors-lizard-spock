const CIRCLE_DEGREE = 360;

export function generateRandomHSLColor() {
  const deg = Math.floor(Math.random() * CIRCLE_DEGREE);
  return `hsl(${deg}, 50% , 50%)`
}
export function getInitials(name: string) {
  return name.split(' ').map((word) => word[0] ?? '').join('').toUpperCase();
}
