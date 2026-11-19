export * from './format'
export { cn } from '@lib/cn'

/** Case-insensitive search across the given keys of each row. */
export const filterRows = (rows, query, keys) => {
  const q = query.trim().toLowerCase()
  if (!q) return rows
  return rows.filter((row) => keys.some((k) => String(row[k] ?? '').toLowerCase().includes(q)))
}
