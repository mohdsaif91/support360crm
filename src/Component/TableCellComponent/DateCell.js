import React from "react";
import moment from "moment";

export default function DateCell(props) {
  const date = "YYYY-MM-DD";
  const time = "HH:mm A";
  return (
    <div className="date-col">
      <div className="date-data">{moment(props.data).format(date)}</div>
      <div className="time-data">{moment(props.data).format(time)}</div>
    </div>
  );
}
