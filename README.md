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