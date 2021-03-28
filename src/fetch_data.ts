type FileName = "lastnames" | "man" | "woman";

export interface IWebFile {
  local?: false;
  url?: string;
}

export interface ILocalFile {
  local: true;
  path: string;
}

export type IConfig = ILocalFile | IWebFile;

type ICache = {
  [key in FileName]: string[];
};

const cache: ICache = {
  lastnames: [],
  man: [],
  woman: [],
};

const readLocalFile = async (file: FileName, config: ILocalFile) => {
  return JSON.parse(
    await Deno.readTextFile(`${config.path}/${file}.json`)
  ) as string[];
};

const readWebFile = async (file: FileName, config: IWebFile) => {
  const url =
    config.url ||
    "https://firebasestorage.googleapis.com/v0/b/files-4374e.appspot.com/o";

  return await (await fetch(`${url}/${file}.json?alt=media`)).json();
};

export const fetchData = async (file: FileName, config: IConfig) => {
  if (cache[file].length > 0) return cache[file];

  cache[file] = await (config.local
    ? readLocalFile(file, config)
    : readWebFile(file, config));

  return cache[file];
};
