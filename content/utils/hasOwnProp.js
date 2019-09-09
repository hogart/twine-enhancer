export function hasOwnProp(obj, key) {
    return Object.hasOwnProperty.bind(obj, key);
}