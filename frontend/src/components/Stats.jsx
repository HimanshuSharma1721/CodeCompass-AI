import {
  Sparkles,
  Database,
  Layers3,
  Server,
  Atom,
  Palette,
} from "lucide-react";

const tech = [
  {
    icon: Sparkles,
    name: "Gemini AI",
    color: "text-blue-600",
  },
  {
    icon: Layers3,
    name: "LangChain",
    color: "text-emerald-600",
  },
  {
    icon: Database,
    name: "FAISS",
    color: "text-violet-600",
  },
  {
    icon: Server,
    name: "FastAPI",
    color: "text-green-600",
  },
  {
    icon: Atom,
    name: "React",
    color: "text-sky-600",
  },
  {
    icon: Palette,
    name: "Tailwind",
    color: "text-cyan-600",
  },
];

function Stats() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-8">

          <p className="text-blue-600 font-semibold uppercase tracking-widest text-sm">
            Powered By
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            Modern AI Stack
          </h2>

          <p className="mt-2 text-slate-600">
            Built using reliable technologies for fast and intelligent
            repository understanding.
          </p>

        </div>

        <div className="flex flex-wrap justify-center gap-4">

          {tech.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.name}
                className="group flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-6 py-3 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <Icon
                  size={18}
                  className={`${item.color} group-hover:scale-110 transition`}
                />

                <span className="font-medium text-slate-700">
                  {item.name}
                </span>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Stats;