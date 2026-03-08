import { useState } from "react";
import logoImageUrl from "./assets/logo.svg";

const homeScreenshotUrl =
  "https://docs.burla.dev/~gitbook/image?url=https%3A%2F%2F960315508-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FEZK1GDkJ4Bar9hojneh3%252Fuploads%252FBSeJSsAiri3jm8dS0HYu%252FCleanShot%25202026-01-18%2520at%252015.07.24.png%3Falt%3Dmedia%26token%3Dcef8f0ad-808d-456e-b956-dd67a40c8bd9&width=768&dpr=3&quality=100&sign=82fb9eab&sv=2";
const terminalDemoUrl =
  "https://docs.burla.dev/~gitbook/image?url=https%3A%2F%2F960315508-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FEZK1GDkJ4Bar9hojneh3%252Fuploads%252FBx0Lws4AlplU4UkiVWmV%252Ffinal_terminal_with_header_rounded.gif%3Falt%3Dmedia%26token%3D0579b554-8281-4442-a7e7-05db786769ed&width=768&dpr=3&quality=100&sign=b25ee549&sv=2";
const dashboardDemoUrl =
  "https://docs.burla.dev/~gitbook/image?url=https%3A%2F%2F960315508-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FEZK1GDkJ4Bar9hojneh3%252Fuploads%252F4qF2YJFKUNLGJ0V23kDM%252Fnew_platform_demo.gif%3Falt%3Dmedia%26token%3D29113ced-a15e-4f9f-9f51-897c5e0d6f2f&width=768&dpr=3&quality=100&sign=d7c4ffc0&sv=2";

const quickstartSnippet = `return_values = remote_parallel_map(my_function, my_inputs)`;

const mapReduceSnippet = `from burla import remote_parallel_map

# Run process_file on many small machines
results = remote_parallel_map(process_file, files)

# Combine results on one big machine
result = remote_parallel_map(combine_results, [results], func_cpu=64)`;

const topNavigationLinks = [
  { label: "GitHub", href: "https://github.com/Burla-Cloud/burla" },
  { label: "Discord", href: "https://discord.gg/2EH9AyYBGg" },
  {
    label: "Book a Call",
    href: "https://cal.com/jakez/burla?user=jakez&duration=30",
  },
  { label: "Log In", href: "https://login.burla.dev/" },
  { label: "Try Burla for free", href: "https://login.burla.dev/" },
];

const proofStatistics = [
  { label: "Cluster startup", value: "< 1 second" },
  { label: "Parallel scale", value: "10,000 CPUs" },
  { label: "Large-file demo", value: "2.4TB in 76s" },
];

const productPillars = [
  {
    title: "Automatic package sync",
    description:
      "Burla quickly clones your local packages onto every remote machine that runs your functions.",
  },
  {
    title: "Custom containers",
    description:
      "Run each workload in your preferred Docker image with dependencies, tools, and runtime already baked in.",
  },
  {
    title: "Shared cloud filesystem",
    description:
      "Read and write high-volume data through ./shared so map and reduce stages can coordinate easily.",
  },
  {
    title: "Function-level hardware controls",
    description:
      "Use func_cpu and func_ram to allocate larger machines to heavy steps and right-size everything else.",
  },
];

const executionStages = [
  {
    title: "Write code like local Python",
    description:
      "Define your normal function, keep your local imports, and call remote_parallel_map where you need scale.",
  },
  {
    title: "Launch thousands of workers quickly",
    description:
      "Burla boots workers in under one second and starts processing even when input lists are massive.",
  },
  {
    title: "Observe output without workflow friction",
    description:
      "Print output, logs, and exceptions surface locally so debugging remains straightforward.",
  },
];

const callToActionSteps = [
  "Sign in with your Google or Microsoft account.",
  "Press the ⏻ Start button to boot remote workers.",
  "Run the Google Colab quickstart and watch workloads scale in seconds.",
];

export default function App() {
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-hidden text-slate-900">
      <div className="pointer-events-none fixed left-1/2 top-[-380px] z-0 h-[720px] w-[min(1200px,100vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-300/35 via-blue-300/20 to-transparent blur-3xl" />
      <div className="relative z-10">
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-6">
            <a
              href="https://docs.burla.dev/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2"
            >
              <img
                src={logoImageUrl}
                alt="Burla"
                className="h-6 w-auto"
              />
            </a>
            <nav className="hidden items-center gap-2 xl:flex">
              {topNavigationLinks.map((topNavigationLink) => (
                <a
                  key={topNavigationLink.label}
                  href={topNavigationLink.href}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    topNavigationLink.label === "Try Burla for free"
                      ? "rounded-full bg-[#0a2540] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#113a63]"
                      : "rounded-full border border-slate-300/80 bg-white/70 px-4 py-2 text-sm font-semibold text-[#0a2540] transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-indigo-50/70"
                  }
                >
                  {topNavigationLink.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              className="rounded-full border border-slate-300/80 bg-white/85 px-4 py-2 text-sm font-semibold text-[#0a2540] transition hover:bg-indigo-50 xl:hidden"
              onClick={() => setIsMobileNavigationOpen(!isMobileNavigationOpen)}
            >
              {isMobileNavigationOpen ? "Close" : "Menu"}
            </button>
          </div>
          {isMobileNavigationOpen && (
            <div className="border-t border-slate-200/70 bg-white/95 px-5 py-4 xl:hidden">
              <nav className="flex flex-col gap-2">
                {topNavigationLinks.map((topNavigationLink) => (
                  <a
                    key={topNavigationLink.label}
                    href={topNavigationLink.href}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setIsMobileNavigationOpen(false)}
                    className={
                      topNavigationLink.label === "Try Burla for free"
                        ? "rounded-xl bg-[#0a2540] px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-[#113a63]"
                        : "rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-[#0a2540] transition hover:bg-indigo-50"
                    }
                  >
                    {topNavigationLink.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </header>

        <main className="mx-auto w-full max-w-6xl px-5 pb-24 pt-16 md:px-6 md:pt-20">
          <section>
            <div className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-indigo-700">
                  Cloud parallel python
                </p>
                <h1 className="mt-6 text-balance font-display text-4xl font-semibold leading-tight text-[#0a2540] sm:text-5xl lg:text-6xl">
                  Scale Python across 1,000&apos;s of computers in one line of
                  code.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
                  Burla keeps distributed computing simple. Run any Python
                  function remotely with{" "}
                  <code className="rounded-md bg-indigo-100 px-2 py-1 text-base font-semibold text-indigo-700">
                    remote_parallel_map
                  </code>{" "}
                  while logs, exceptions, and control flow still feel local.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="https://login.burla.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-[#635bff] px-6 py-3 text-sm font-semibold text-white shadow-floating transition hover:-translate-y-0.5 hover:bg-[#4d45f5]"
                  >
                    Try Burla for free
                  </a>
                  <a
                    href="https://docs.burla.dev/get-started"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-indigo-200 bg-indigo-50/70 px-6 py-3 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:bg-indigo-100"
                  >
                    Read docs
                  </a>
                </div>
                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {proofStatistics.map((proofStatistic) => (
                    <article
                      key={proofStatistic.label}
                      className="surface-soft px-4 py-4"
                    >
                      <p className="font-display text-xl font-semibold text-[#0a2540]">
                        {proofStatistic.value}
                      </p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">
                        {proofStatistic.label}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
              <div className="surface-panel p-4 sm:p-5">
                <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#0a2540] shadow-floating">
                  <div className="border-b border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-indigo-200">
                    one-line quickstart
                  </div>
                  <pre className="overflow-x-auto px-4 py-5 text-sm leading-7 text-slate-100">
                    <code>{quickstartSnippet}</code>
                  </pre>
                </div>
                <img
                  src={terminalDemoUrl}
                  alt="Burla terminal demo"
                  className="mt-4 w-full rounded-2xl border border-slate-200/80 bg-white shadow-floating"
                />
              </div>
            </div>
          </section>

          <section className="mt-24 grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <div className="surface-panel p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-700">
                Production proof
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-semibold text-[#0a2540] sm:text-4xl">
                Process terabytes in minutes without rewriting your stack.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Teams use Burla to convert long-running scripts into reliable
                cloud pipelines. Keep your Python code, scale to thousands of
                machines, and complete workloads that used to take days.
              </p>
              <ul className="mt-6 space-y-3 text-slate-600">
                <li className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3">
                  See the{" "}
                  <a
                    href="https://docs.burla.dev/examples/process-2.4tb-of-parquet-files-in-76s"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-indigo-700 hover:text-indigo-800"
                  >
                    2.4TB in 76s demo
                  </a>{" "}
                  on 10,000 CPUs.
                </li>
                <li className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3">
                  Run any code in your preferred Docker container on CPU, GPU,
                  or TPU hardware.
                </li>
                <li className="rounded-xl border border-slate-200/80 bg-white/70 px-4 py-3">
                  Monitor active jobs and control compute resources in one
                  dashboard.
                </li>
              </ul>
            </div>
            <img
              src={dashboardDemoUrl}
              alt="Burla dashboard demo"
              className="surface-panel w-full p-2"
            />
          </section>

          <section className="mt-24 surface-panel p-6 sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-700">
              How it works
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold text-[#0a2540] sm:text-4xl">
              Distributed execution that still feels local.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {executionStages.map((executionStage, executionStageIndex) => (
                <article
                  key={executionStage.title}
                  className="rounded-2xl border border-slate-200/90 bg-white/85 p-5 shadow-floating"
                >
                  <p className="font-display text-sm font-semibold text-indigo-600">
                    Step {executionStageIndex + 1}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-[#0a2540]">
                    {executionStage.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {executionStage.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-24">
            <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-700">
              Feature set
            </p>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold text-[#0a2540] sm:text-4xl">
              Infrastructure controls without infrastructure overhead.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {productPillars.map((productPillar) => (
                <article
                  key={productPillar.title}
                  className="surface-soft p-6 transition hover:-translate-y-1"
                >
                  <h3 className="font-display text-2xl font-semibold text-[#0a2540]">
                    {productPillar.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-600">
                    {productPillar.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-24 grid gap-8 xl:grid-cols-[1fr_0.9fr] xl:items-center">
            <div className="surface-panel p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-700">
                Map reduce pattern
              </p>
              <h2 className="mt-4 text-balance font-display text-3xl font-semibold text-[#0a2540] sm:text-4xl">
                Convert scripts into scalable data pipelines.
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Run file-level work in parallel and then aggregate on larger
                hardware with a second remote call.
              </p>
              <pre className="mt-6 overflow-x-auto rounded-2xl border border-white/15 bg-[#0a2540] p-5 text-sm leading-7 text-slate-100">
                <code>{mapReduceSnippet}</code>
              </pre>
              <p className="mt-4 text-sm text-slate-500">
                The network filesystem at ./shared keeps intermediate files
                accessible across stages.
              </p>
            </div>
            <img
              src={homeScreenshotUrl}
              alt="Burla quickstart screenshot"
              className="surface-panel w-full p-2"
            />
          </section>

          <section className="relative mt-24 overflow-hidden rounded-[32px] border border-[#1e3a5f] bg-[#0a2540] p-8 text-white shadow-panel sm:p-10">
            <div className="pointer-events-none absolute -right-20 -top-16 h-56 w-56 rounded-full bg-indigo-300/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-10 h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl" />
            <div className="relative grid gap-10 xl:grid-cols-[1.05fr_0.95fr] xl:items-start">
              <div className="self-start">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-indigo-200">
                  Start in minutes
                </p>
                <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-semibold text-white sm:text-4xl">
                  Burla only takes two minutes to try.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-indigo-100 sm:text-base">
                  Run the{" "}
                  <a
                    href="https://colab.research.google.com/drive/1bR8Gpa85gqJi7_9uKdcJDX9_WG0tuVmG?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-white underline decoration-indigo-300/80 underline-offset-4"
                  >
                    Google Colab quickstart
                  </a>{" "}
                  to see 1,000 CPUs in action.
                </p>
                <div className="mt-7 grid max-w-md gap-3 sm:grid-cols-2">
                  <a
                    href="https://login.burla.dev/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-[#0a2540] transition hover:-translate-y-0.5 hover:bg-indigo-50"
                  >
                    Try Burla for free
                  </a>
                  <a
                    href="https://docs.burla.dev/get-started#quickstart-self-hosted"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-11 w-full items-center justify-center rounded-full border border-indigo-300/40 px-6 text-sm font-semibold text-indigo-100 transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    Self-host guide
                  </a>
                </div>
              </div>

              <div className="self-start rounded-3xl border border-indigo-300/30 bg-white/5 p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-indigo-200">
                  Getting started
                </p>
                <ol className="mt-4 space-y-3">
                  {callToActionSteps.map((callToActionStep, callToActionStepIndex) => (
                    <li
                      key={callToActionStep}
                      className="flex items-start gap-3 rounded-2xl border border-indigo-300/30 bg-white/5 px-4 py-3 text-sm text-indigo-100"
                    >
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-200/20 font-display text-xs font-semibold text-white">
                        {callToActionStepIndex + 1}
                      </span>
                      <span className="leading-6">{callToActionStep}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-200/70 bg-white/75">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 text-sm text-slate-600 md:px-6">
            <p>Questions? We&apos;re always happy to talk.</p>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href="http://cal.com/jakez/burla"
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-[#0a2540] hover:text-indigo-700"
              >
                Schedule a call
              </a>
              <a
                href="mailto:jake@burla.dev"
                className="font-semibold text-[#0a2540] hover:text-indigo-700"
              >
                jake@burla.dev
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
