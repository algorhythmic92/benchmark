export function unshiftArray<T>(arr: T[], newElement: T) {
  return [newElement, ...arr];
}
