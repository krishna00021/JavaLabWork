import { student } from '../content/student'

export function StudentCard() {
  return (
    <section
      aria-labelledby="student-card-heading"
      className="rounded-lg border border-amber-500/25 bg-gradient-to-br from-slate-900 to-slate-900/40 p-5"
    >
      <div className="flex items-start gap-5">
        <img
          src="/photo.jpg"
          alt={`Photo of ${student.name}`}
          width={96}
          height={120}
          className="h-30 w-24 shrink-0 rounded-md border border-slate-700 object-cover"
        />

        <div className="min-w-0 flex-1">
          <h2
            id="student-card-heading"
            className="text-xs font-medium tracking-widest text-amber-400 uppercase"
          >
            Student
          </h2>

          <p className="mt-2 text-xl font-semibold text-white">{student.name}</p>

          <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-3 border-t border-slate-800 pt-4">
            <div>
              <dt className="text-xs text-slate-500">Section</dt>
              <dd className="mt-0.5 font-mono text-sm text-slate-200">{student.section}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Roll Number</dt>
              <dd className="mt-0.5 font-mono text-sm text-slate-200">{student.rollNumber}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
