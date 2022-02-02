export const emailValidation = (str) => {
  const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return pattern.test(str);
};

export const phoneValidation = (str) => {
  const pattern =
    /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
  return pattern.test(str);
};

export const cardExpiryValidation = (str) => {
  const pattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return pattern.test(str);
};
