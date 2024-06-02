export const generateId = () => {
  const index = {
    first: Math.floor(Math.random() * 26),
    second: Math.floor(Math.random() * 26),
  };
  const alphabetArr = Array.from("abcdefghijklmnopqrstuvwxyz");
  const generateNumber = Math.floor(Math.random() * 1000000000);

  return `${alphabetArr[index.first]}${generateNumber}${
    alphabetArr[index.second]
  }`;
};
