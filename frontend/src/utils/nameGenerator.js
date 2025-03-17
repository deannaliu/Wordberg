export const generatePenguinName = () => {
  const adjectives = ['Happy', 'Silly', 'Jumpy', 'Waddles', 'Chilly', 'Frosty', 'Fluffy', 'Snowy'];
  const nouns = ['Penguin', 'Flipper', 'Iceberg', 'Snowball', 'Fish', 'Diver', 'Swimmer'];
  return `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}`;
}; 