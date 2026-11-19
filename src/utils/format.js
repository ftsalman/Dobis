export const formatCurrency = (value, currency = 'INR') =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value ?? 0)

export const formatDate = (value) =>
  value ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium' }).format(new Date(value)) : '—'

export const formatNumber = (value) => new Intl.NumberFormat('en-IN').format(value ?? 0)

export const capitalize = (str = '') => str.charAt(0).toUpperCase() + str.slice(1)
