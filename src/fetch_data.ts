type FileName = "lastnames" | "man" | "woman";

export interface IConfig {
  url?: string;
  local?: boolean;
  lastnamePath?: string;
  manNamePath?: string;
  womanNamePath?: string;
}

type ICache = {
  [key in FileName]: string[];
};

const cache: ICache = {
  lastnames: [],
  man: [],
  woman: [],
};

const readLocalFile = async (file: FileName, config: IConfig) => {
  return JSON.parse(
    await Deno.readTextFile(
      //@ts-ignore
      file == "lastnames"
        ? config.lastnamePath
        : file == "man"
        ? config.manNamePath
        : config.womanNamePath
    )
  ) as string[];
};

const readWebFile = async (file: FileName, config: IConfig) => {
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
