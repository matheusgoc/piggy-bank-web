export const formatCurrency = (number: number|string) => {
  if (typeof number == 'string') {
    number = Number(unformatCurrency(number))
  }

  return new Intl.NumberFormat(
    'en-US',
    { style: 'currency', currency: 'USD'}
  ).format(number)
}

export const unformatCurrency = (currencyFormat:string)  => {
  return currencyFormat.replace(/[^0-9.-]+/g,'')
}