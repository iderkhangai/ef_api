// import { v4 as uuidv4 } from 'uuid';

// export const generateUniqueId = (): string => {
//   const uniqueId = uuidv4();
//   return uniqueId;
// };

export const generateUniqueId = (): number => {
  const uniqueId = Date.now(); // Using timestamp as the unique ID
  return uniqueId;
};