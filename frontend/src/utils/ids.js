// Demo ID/number helpers for generated policy, invoice, and random sample values.
export const randomDigits = (len = 6) => {
  const bytes = new Uint8Array(len);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => String(b % 10))
    .join("");
};

export const makePolicyNumber = () => {
  const a = randomDigits(6);
  const b = randomDigits(4);
  return `AGL-${a}-${b}`;
};

export const makeInvoiceNumber = (prefix = "INV") => {
  const a = randomDigits(5);
  const b = randomDigits(5);
  return `${prefix}-${a}-${b}`;
};

export const pickOne = (arr) => {
  if (!arr?.length) return undefined;
  const bytes = new Uint8Array(1);
  crypto.getRandomValues(bytes);
  return arr[bytes[0] % arr.length];
};

export const chance = (probability = 0.5) => {
  const bytes = new Uint8Array(1);
  crypto.getRandomValues(bytes);
  return bytes[0] / 255 < probability;
};
