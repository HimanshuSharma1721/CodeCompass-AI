import { XCircle, CheckCircle } from "lucide-react";

const withoutAI = [
  "Open hundreds of files",
  "Search manually",
  "Read lengthy documentation",
  "Interrupt teammates",
  "Spend hours understanding code",
];

const withAI = [
  "Ask one question",
  "Get AI-powered explanations",
  "View source citations",
  "Understand architecture instantly",
  "Start contributing faster",
];

function Comparison() {
  return (
    <section className="py-20 bg-slate-50">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-14">


          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Stop Reading. Start Understanding.
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Compare the traditional way of exploring a repository
            with the AI-assisted workflow.
          </p>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">

          {/* WITHOUT */}

          <div className="rounded-3xl border border-red-200 bg-red-50 p-8">

            <div className="flex items-center gap-3 mb-8">

              <XCircle className="text-red-500" />

              <h3 className="text-2xl font-bold text-red-600">

                Without CodeCompass

              </h3>

            </div>

            <div className="space-y-5">

              {withoutAI.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="w-3 h-3 rounded-full bg-red-400"></div>

                  <p className="text-slate-700">

                    {item}

                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* WITH */}

          <div className="rounded-3xl border border-blue-200 bg-blue-50 p-8">

            <div className="flex items-center gap-3 mb-8">

              <CheckCircle className="text-blue-600" />

              <h3 className="text-2xl font-bold text-blue-700">

                With CodeCompass AI

              </h3>

            </div>

            <div className="space-y-5">

              {withAI.map((item) => (

                <div
                  key={item}
                  className="flex items-center gap-4"
                >

                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>

                  <p className="text-slate-700">

                    {item}

                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Comparison;