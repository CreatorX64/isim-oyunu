import names from "data/names.json";

export const namesList = names;
export const namesMap = new Map<string, string[]>();

/**
 * Create a map structure where keys are first letters of the names and values
 * are arrays of names that begin with their corresponding key. This will make
 * it easier for us to pick a random name that begins with a specific character
 * for the computer.
 */
namesList.forEach((name) => {
  if (!namesMap.get(name[0])) {
    namesMap.set(name[0], []);
  }

  namesMap.get(name[0])?.push(name);
});
