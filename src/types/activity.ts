import { Duration } from "moment/moment";

type Activity = {
  id: string,
  taskId: string,
  beginDate: string,
  endDate?: string,
  timeSpent?: Duration
};

export default Activity;
