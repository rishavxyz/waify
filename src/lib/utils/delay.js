/**
 * Halt the program execution for an amount of interval
 * @param timeout {number}
 * @returns {Promise<undefined>}
 */
export async function delay(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout))
}