export type { ISuperType } from "./models.ts";
export type { IConfig } from "./fetch_data.ts";

import { fetchData, IConfig } from "./fetch_data.ts";
import { ISuperType } from "./models.ts";

export function randomIntFromInterval(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export const getRamdonValue = (values: string[]) => {
  const index = Math.floor(Math.random() * (values.length - 1));
  const value = values[index];

  return capitalize(value);
};

export const uniqueId = () => {
  return "xxxxxxxx-xxxx-xxx-yxxx-xxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const parse = async (format: Record<string, ISuperType>, config: IConfig) => {
  const data: Record<string, any> = {};
  for (const iterator in format) {
    const element = format[iterator];
    switch (element.type) {
      case "name": {
        data[iterator] = getRamdonValue(
          await fetchData(element.gender == "male" ? "man" : "woman", config)
        );
        break;
      }
      case "lastname": {
        data[iterator] = getRamdonValue(await fetchData("lastnames", config));
        break;
      }
      case "randomNumber": {
        data[iterator] = randomIntFromInterval(element.min, element.max);
        break;
      }
      case "format": {
        let formatted = "";
        if (element.sendComplete) {
          formatted = element.fn(element.format);
        } else {
          for (const char of element.format) {
            formatted += element.fn(char);
          }
        }
        data[iterator] = formatted;
        break;
      }
      case "selectOneFromArray": {
        const index = randomIntFromInterval(0, element.array.length - 1);
        data[iterator] = element.array[index];
        break;
      }
      case "uniqueId": {
        data[iterator] = uniqueId();
        break;
      }
      default: {
        data[iterator] = await parse(element, config);
      }
    }
  }
  return data;
};

export async function mockJson<T>(
  format: Record<string, ISuperType>,
  config: IConfig
) {
  return (await parse(format, config)) as T;
}
