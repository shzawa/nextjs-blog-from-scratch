import { FunctionComponent } from 'react'
import { parseISO, format } from 'date-fns'

interface Props {
  dateStr: string
}

export const Date: FunctionComponent<Props> = ({ dateStr }) => {
  const date = parseISO(dateStr)
  return <time dateTime={dateStr}>{format(date, 'yyyy-M-d LLLL')}</time>
}
