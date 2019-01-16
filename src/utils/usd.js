const { format } = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const usd = aNumber => format(aNumber);

module.exports = usd;

