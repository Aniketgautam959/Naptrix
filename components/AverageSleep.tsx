import getUserRecord from '@/app/actions/getUserRecord';
import { Card } from '@/components/ui/Card';

const AverageSleep = async () => {
  try {
    const { record, daysWithRecords } = await getUserRecord();
    const validRecord = record || 0;
    const validDays =
      daysWithRecords && daysWithRecords > 0 ? daysWithRecords : 1;
    const averageSleep = validRecord / validDays;
    const hours = Math.floor(averageSleep);
    const minutes = Math.round((averageSleep - hours) * 60);

    return (
      <Card>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
          Average
        </p>
        <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 tabular-nums">
          {hours}
          <span className="text-base font-medium text-slate-400">h </span>
          {minutes}
          <span className="text-base font-medium text-slate-400">m</span>
        </p>
        <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          {validDays} night{validDays !== 1 ? 's' : ''} tracked
        </p>
      </Card>
    );
  } catch {
    return (
      <Card>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
          Average
        </p>
        <p className="text-3xl font-bold text-slate-300 tabular-nums">--</p>
        <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          No data
        </p>
      </Card>
    );
  }
};

export default AverageSleep;
