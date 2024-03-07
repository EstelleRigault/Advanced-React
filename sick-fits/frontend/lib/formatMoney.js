export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFrationDigits: 2,
  };

  // check if its  aclean dollar amount
  if (amount % 100 === 0) {
    options.minimumFrationDigits = 0;
  }

  const formatter = Intl.NumberFormat('en-US', options);

  return formatter.format(amount / 100);
}
