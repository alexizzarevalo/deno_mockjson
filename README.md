# MOCKJSON

Fake JSON data that you can build yourself.

## Usage

If you want a user object like this:

```ts
interface User {
  id: string;
  name: string;
  lastname: {
    first: string;
    second: string;
  };
  phone: string;
  age: number;
  type: "normal" | "superuser";
  registeredAt: string | Date;
}
```

You can get the correct output with the following format:

```ts
const format: Record<string, ISuperType> = {
  id: {
    type: "uniqueId",
  },
  name: {
    type: "name",
    gender: "male",
  },
  lastname: {
    first: {
      type: "lastname",
    },
    second: {
      type: "lastname",
    },
  },
  phone: {
    type: "format",
    format: "(+502) ####-####",
    fn: (v: string) => {
      return v == "#" ? String(Math.floor(Math.random() * 9)) : v;
    },
  },
  age: {
    type: "randomNumber",
    min: 18,
    max: 30,
  },
  type: {
    type: "selectOneFromArray",
    array: ["normal", "superuser"],
  },
  registeredAt: {
    type: "format",
    format: "##-$$-%%%%",
    sendComplete: true,
    fn: (v: string) => {
      return v
        .replace("##", String(randomIntFromInterval(1, 31)))
        .replace("$$", String(randomIntFromInterval(1, 12)))
        .replace("%%%%", String(randomIntFromInterval(2017, 2021)));
    },
  },
};
```

Finally, use the mockJson function sending the previous format as a parameter.

```ts
const users: User[] = [];

for (let i = 0; i < 5; i++) {
  const user: User = await mockJson<User>(format, {});
  users.push(user);
}

console.log(users);
```

## Config

You can pass options in the second parameter of mockJson function.

### MockJson from default provider

If the configuration object is empty, the default provider will be used.

```ts
// Example
await mockJson<User>(format, {});
```

### MockJson from local files

You must set the **local** attribute to **true** and you need to add the **path** to the local files: **man.json**, **woman.json**, **lastnames.json**

```ts
// Example
await mockJson<User>(format, {
  local: true,
  path: "./mock",
});
```

```
your_project    
│  index.ts
│
└──mock
│   │  man.json
│   │  woman.json
│   │  lastnames.json

```

JSON Files contain an array of string:

```json
[
  "John",
  "Luke",
]
```

### MockJson from another provider

If you have your own files on another provider like AWS S3. You must add the public path in the url attribute.

The files must be in the same place (not separated into folders). And their names should be: **man.json**, **woman.json**, **lastnames.json**

```ts
// Example
await mockJson<User>(format, {
  url: "https://<bucketName>.s3.amazonaws.com/<folder>",
});
```
