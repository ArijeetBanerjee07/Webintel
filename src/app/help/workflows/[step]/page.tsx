
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WORKFLOW_STEPS } from "@/app/components/help/helpData";

interface Props {
  params: Promise<{ step: string }>;
}

export default function WorkflowDetailPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#080C0A] px-6 py-16 text-zinc-100">
          <div className="mx-auto max-w-3xl text-sm text-zinc-400">
            Loading workflow...
          </div>
        </main>
      }
    >
      <WorkflowContent params={params} />
    </Suspense>
  );
}

async function WorkflowContent({ params }: Props) {
  const { step } = await params;
  const stepNumber = Number(step);

  if (
    !Number.isInteger(stepNumber) ||
    stepNumber < 1 ||
    stepNumber > WORKFLOW_STEPS.length
  ) {
    notFound();
  }

  const workflow = WORKFLOW_STEPS[stepNumber - 1];
  const previous = WORKFLOW_STEPS[stepNumber - 2];
  const next = WORKFLOW_STEPS[stepNumber];

  return (
    <main className="min-h-screen bg-[#080C0A] px-6 py-16 text-zinc-100">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/help"
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          &larr; Back to Help Center
        </Link>

        <p className="mt-10 text-xs font-semibold uppercase tracking-widest text-emerald-400">
          Workflow Step {workflow.step}
        </p>

        <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          {workflow.title}
        </h1>

        <p className="mt-4 text-zinc-400">
          {workflow.description}
        </p>

        <div className="mt-10 rounded-2xl border border-zinc-800 bg-[#0B120F] p-6">
          <h2 className="text-lg font-semibold text-white">
            About this step
          </h2>

          <p className="mt-3 text-sm leading-7 text-zinc-400">
            This is step {workflow.step} of the WebIntel workflow. Follow this
            stage as part of your website intelligence process.
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          {previous ? (
            <Link
              href={`/help/workflows/${stepNumber - 1}`}
              className="rounded-lg border border-zinc-700 px-4 py-2 text-sm hover:border-emerald-500"
            >
              &larr; Previous
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/help/workflows/${stepNumber + 1}`}
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Next Step &rarr;
            </Link>
          ) : (
            <Link
              href="/help"
              className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400"
            >
              Finish &rarr;
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}