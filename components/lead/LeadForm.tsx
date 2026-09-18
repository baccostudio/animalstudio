"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { submitLead, type LeadFormState } from "@/app/actions/lead";
import { Button } from "@/components/ui/Button";
import { readAttribution } from "@/lib/attribution";
import { cx } from "@/lib/cx";

const FIELDS = [
  {
    id: "leadName",
    name: "name",
    label: "Nombre completo",
    type: "text",
    autoComplete: "name",
  },
  {
    id: "leadEmail",
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
  },
  {
    id: "leadPhone",
    name: "phone",
    label: "Celular",
    type: "tel",
    autoComplete: "tel",
  },
] as const;

const INITIAL: LeadFormState = { status: "idle" };

type Props = {
  plan?: string;
  cta: string;
  /** True while the modal is open: focuses the first field. */
  active: boolean;
};

/** Lead form: posts to the submitLead Server Action and shows sending / error / success states. */
export function LeadForm({ plan, cta, active }: Props) {
  const [state, formAction, pending] = useActionState(submitLead, INITIAL);
  const inputs = useRef<Record<string, HTMLInputElement | null>>({});

  // Attach first-touch attribution (UTMs, referrer, landing path) at submit time
  const submit = (formData: FormData) => {
    for (const [key, value] of Object.entries(readAttribution())) {
      if (value) formData.set(key, value);
    }
    formAction(formData);
  };

  // Initial focus when the modal opens, then focus the offending field after a validation error
  useEffect(() => {
    if (!active) return;
    const target =
      state.status === "error" && state.field
        ? inputs.current[state.field]
        : inputs.current.name;
    const timer = window.setTimeout(() => target?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [active, state]);

  if (state.status === "sent") {
    return (
      <div className="text-center pt-8 pb-1.5">
        <div className="w-[46px] h-[46px] rounded-full bg-navy-900 text-bone flex items-center justify-center mx-auto mb-[18px] text-[20px]">
          ✓
        </div>
        <h3 id="leadModalTitle" className="text-[24px]">
          ¡Listo!
        </h3>
        <p className="mt-2.5 text-charcoal text-[14px] leading-[1.5]">
          Recibimos tus datos{plan ? ` para el plan ${plan}` : ""}. Un asesor de
          Animal te va a contactar a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <>
      <h3 id="leadModalTitle" className="mt-2.5 text-[24px]">
        {plan ? `Plan ${plan}` : "Empezá tu prueba"}
      </h3>
      <p className="mt-2.5 text-charcoal text-[14px] leading-[1.5]">
        Dejanos tus datos y un asesor de Animal te va a contactar para coordinar
        todo.
      </p>

      <form className="mt-6 flex flex-col gap-3.5" action={submit}>
        <input type="hidden" name="plan" value={plan ?? ""} />
        <input type="hidden" name="cta" value={cta} />
        {/* Honeypot: hidden from people, filled by bots */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="leadWebsite">Sitio web</label>
          <input
            id="leadWebsite"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {FIELDS.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block mb-1.5 text-[11.5px] tracking-[0.08em] uppercase font-display font-semibold text-stone"
            >
              {field.label}
            </label>
            <input
              ref={(el) => {
                inputs.current[field.name] = el;
              }}
              id={field.id}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              defaultValue={state.values?.[field.name] ?? ""}
              required
              disabled={pending}
              aria-invalid={
                state.status === "error" && state.field === field.name
                  ? true
                  : undefined
              }
              className={cx(
                "w-full border bg-bone px-3 py-[13px] font-body text-[15px] text-ink rounded-px focus:outline-2 focus:outline-navy-700 focus:outline-offset-1 focus:border-navy-700 disabled:opacity-60",
                state.status === "error" && state.field === field.name
                  ? "border-alert"
                  : "border-mist",
              )}
            />
          </div>
        ))}

        {state.status === "error" && (
          <p role="alert" className="text-[13px] leading-[1.45] text-alert">
            {state.message}
          </p>
        )}

        <Button
          type="submit"
          variant="dark"
          className="mt-1.5 w-full justify-center disabled:opacity-70"
          disabled={pending}
        >
          {pending ? "Enviando…" : "Enviar"}
        </Button>

        <p className="text-[11.5px] leading-[1.5] text-stone">
          Al enviar aceptás nuestra{" "}
          <Link href="/privacidad" className="underline hover:text-charcoal">
            política de privacidad
          </Link>
          . Usamos tus datos solo para contactarte.
        </p>
      </form>
    </>
  );
}
