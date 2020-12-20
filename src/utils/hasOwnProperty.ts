/* eslint-disable @typescript-eslint/ban-types */
/**
 * Checks if object has specific property (with narrow down type)
 *
 * @param obj - object to check
 * @param prop - prop name to check
 */
export default function hasOwnProperty<X extends {}, Y extends PropertyKey>(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return Object.hasOwnProperty.call(obj, prop);
}
