import getRecords from '@/app/actions/getRecords';
import RecordItem from './RecordItem';
import { Record } from '@/types/Record';
import { Card, CardHeader } from '@/components/ui/Card';

const RecordHistory = async () => {
  const { records, error } = await getRecords();

  if (error) {
    return (
      <Card>
        <p className='text-sm text-red-500'>{error}</p>
      </Card>
    );
  }

  if (!records || records.length === 0) {
    return (
      <Card>
        <CardHeader title='History' subtitle='Your past sleep records' />
        <p className='text-sm text-slate-400 text-center py-8'>
          No records yet. Log your first night above.
        </p>
      </Card>
    );
  }

  const avg =
    Math.round((records.reduce((s, r) => s + r.amount, 0) / records.length) * 10) / 10;

  return (
    <Card padding='lg'>
      <CardHeader
        title='History'
        subtitle={`${records.length} records · ${avg}h average`}
      />
      <div className='max-h-80 overflow-y-auto custom-scrollbar -mx-1 px-1'>
        {records.map((record: Record) => (
          <RecordItem key={record.id} record={record} />
        ))}
      </div>
    </Card>
  );
};

export default RecordHistory;
