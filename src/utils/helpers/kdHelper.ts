export const generateKdId = () => {
  const prefix = 'KD';
  return prefix + Math.floor(Math.random() * 1000000);
};
