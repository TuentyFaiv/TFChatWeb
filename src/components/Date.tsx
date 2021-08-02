import { FC } from "react";
import { parseISO, format } from "date-fns";

type Props = {
  dateString: string;
}

const DateFormat: FC<Props> = ({ dateString }) => {
  const date = parseISO(dateString);
  return (
    <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>
  );
};

export default DateFormat;