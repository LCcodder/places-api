export const removeWasteFields = (source: Record<string, any>): Record<string, any> => {
  for (const key in source) {
    if (
      typeof source[key] === 'object' &&
      source[key] !== null &&
      !Array.isArray(source[key])
    ) {
      if (Object.keys(source[key]).length > 0) {
        removeWasteFields(source[key]);
      }

      if (!Object.keys(source[key]).length) {
        delete source[key];
        continue;
      }
    }

    if (
      source[key] === undefined ||
      source[key] === null ||
      Number.isNaN(source[key])
    )
      delete source[key];
  }
  return source;
}