import * as moment from 'moment';
import { Duration } from 'moment/moment';
import Activity from '../types/activity';

class TimeSpentCalculator {
  static getInitialDuration(): Duration {
    const start = moment();
    const end = moment();
    return moment.duration(end.diff(start));
  }

  static getTimeSpentForAllActivities(taskActivities: Array<Activity>): Duration {
    let totalTimeSpent = this.getInitialDuration();

    taskActivities.forEach(activity => {
      totalTimeSpent = TimeSpentCalculator.getTimeSpentForActivity(activity, totalTimeSpent);
    });

    return totalTimeSpent;
  }

  static getTimeSpentForActivity(activity: Activity, totalTimeSpent: Duration): Duration {
    if (activity.timeSpent) {
      // console.log('time spent is available');
      if (totalTimeSpent) {
        totalTimeSpent.add(activity.timeSpent);
        return totalTimeSpent;
      }
      totalTimeSpent = activity.timeSpent;
      return totalTimeSpent;
    }
    if (activity.beginDate && activity.endDate) {
      // console.log('begin date AND end date');
      const start = moment(activity.beginDate);
      const end = moment(activity.endDate);
      const timeSpent = moment.duration(end.diff(start));
      if (totalTimeSpent) {
        totalTimeSpent.add(timeSpent);
        return totalTimeSpent;
      }
      totalTimeSpent = timeSpent;
      return totalTimeSpent;
    }
    if (activity.beginDate && !activity.endDate) {
      // console.log('only begin date');
      const start = moment(activity.beginDate);
      const end = moment();
      const timeSpent = moment.duration(end.diff(start));
      if (totalTimeSpent) {
        totalTimeSpent.add(timeSpent);
        return totalTimeSpent;
      }
      totalTimeSpent = timeSpent;
      return totalTimeSpent;
    }

    return totalTimeSpent;
  }
}

export default TimeSpentCalculator;
