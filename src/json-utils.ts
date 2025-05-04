const readFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) {
        reject("Failed to load file");
        return;
      }

      resolve(e.target.result as string);
    };
    reader.onerror = () => {
      reject("Failed to load file");
    };
    reader.onabort = () => {
      reject("Failed to load file");
    };
    reader.readAsText(file, "utf-8");
  });

export const parseJson = async (file: File) => {
  const str = await readFile(file);
  try {
    return JSON.parse(str);
  } catch (err) {
    throw new Error("Invalid JSON file");
  }
};
