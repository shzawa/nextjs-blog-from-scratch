import { FunctionComponent } from 'react'
import { parseISO, format } from 'date-fns'

export const Date: FunctionComponent<{ dateStr: string }> = ({ dateStr }) => {
  const date = parseISO(dateStr)
  return <time dateTime={dateStr}>{format(date, 'yyyy-M-d LLLL')}</time>
}
