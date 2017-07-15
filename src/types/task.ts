import { Duration } from "moment/moment";

type Task = {
  id: string,
  name: string,
  timeSpent?: Duration
};

export default Task;
