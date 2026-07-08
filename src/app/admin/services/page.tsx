import { getServices } from '@/lib/services';
import { deleteServiceAction, toggleVisibilityAction } from '@/actions/services';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Trash2, Eye, EyeOff, Plus, Navigation2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Tours & Services</h1>
          <p className="text-gray-500 mt-1">
            Manage all {services.length} service cards. Toggle visibility, edit details, or add new ones.
          </p>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm gap-2 shrink-0">
          <Link href="/admin/services/create">
            <Plus className="w-4 h-4" />
            Add New Service
          </Link>
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Services', value: services.length, color: 'bg-indigo-50 text-indigo-700' },
          { label: 'Visible on Site', value: services.filter(s => s.visible).length, color: 'bg-emerald-50 text-emerald-700' },
          { label: 'Hidden', value: services.filter(s => !s.visible).length, color: 'bg-amber-50 text-amber-700' },
        ].map(stat => (
          <div key={stat.label} className={`rounded-2xl p-5 ${stat.color}`}>
            <p className="text-3xl font-extrabold">{stat.value}</p>
            <p className="text-sm font-medium mt-1 opacity-80">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Services List */}
      <div className="space-y-3">
        {services.map(service => (
          <div
            key={service.id}
            className={`flex items-center gap-4 bg-white rounded-2xl border px-4 py-3 shadow-sm transition-all duration-200 hover:shadow-md ${
              service.visible ? 'border-gray-200' : 'border-gray-200/50 opacity-50'
            }`}
          >
            {/* Thumbnail */}
            <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
              {service.images.length > 0 ? (
                <Image src={service.images[0]} alt={service.name} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Navigation2 className="w-5 h-5" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-gray-900 truncate">{service.name}</p>
                {!service.visible && (
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full">Hidden</span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-0.5 truncate">{service.images.length} photo{service.images.length !== 1 && 's'} · {service.description ? service.description.slice(0, 60) + (service.description.length > 60 ? '…' : '') : 'No description'}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Toggle visibility */}
              <form action={toggleVisibilityAction.bind(null, service.id)}>
                <button
                  type="submit"
                  title={service.visible ? 'Hide from website' : 'Show on website'}
                  className={`p-2.5 rounded-lg transition-colors ${
                    service.visible
                      ? 'text-emerald-500 hover:bg-emerald-50'
                      : 'text-gray-400 hover:bg-gray-100'
                  }`}
                >
                  {service.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </form>

              {/* Edit */}
              <Link
                href={`/admin/services/${service.id}/edit`}
                className="p-2.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                title="Edit service"
              >
                <Pencil className="w-4 h-4" />
              </Link>

              {/* Delete */}
              <form action={deleteServiceAction.bind(null, service.id)}>
                <button
                  type="submit"
                  title="Delete service"
                  className="p-2.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
