import getRecords from '@/app/actions/getRecords';
import BarChart from './BarChart';
import { Card, CardHeader } from '@/components/ui/Card';

const RecordChart = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <Card>
        <p className="text-sm text-red-500">{error}</p>
      </Card>
    );
  }

  if (!records || records.length === 0) {
    return (
      <Card>
        <CardHeader title="Sleep Chart" subtitle="Hours per night" />
        <div className="h-48 flex items-center justify-center">
          <p className="text-sm text-slate-400">
            Add a record to see your chart
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg">
      <CardHeader title="Sleep Chart" subtitle="Hours per night" />
      <div className="h-56">
        <BarChart records={records} />
      </div>
    </Card>
  );
};

export default RecordChart;
