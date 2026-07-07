import { getFeedbacks } from '@/lib/feedbacks';
import { removeFeedback } from '@/actions/feedbacks';
import { Button } from '@/components/ui/button';

export default async function AdminDashboard() {
  const feedbacks = await getFeedbacks();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
      </div>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="border-b bg-gray-50/50 p-4">
          <h2 className="font-semibold text-gray-900">Manage Feedbacks</h2>
        </div>
        <div className="p-0">
          {feedbacks.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No feedbacks found.
            </div>
          ) : (
            <ul className="divide-y">
              {feedbacks.map((f) => (
                <li key={f.id} className="flex items-start justify-between p-4 hover:bg-gray-50/50 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-gray-900">{f.name}</p>
                    <p className="text-sm text-gray-600 line-clamp-2">{f.content}</p>
                    <div className="text-xs text-gray-500 pt-1">
                      {new Date(f.createdAt).toLocaleDateString()} · {f.mediaUrls.length} media file(s)
                    </div>
                  </div>
                  <form action={async () => {
                    'use server';
                    await removeFeedback(f.id);
                  }}>
                    <Button variant="destructive" size="sm" type="submit">
                      Delete
                    </Button>
                  </form>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
