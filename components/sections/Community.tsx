import { GOOGLE_STAT, REVIEWS } from "@/content/reviews";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";
import { cx } from "@/lib/cx";

export function Community() {
  return (
    <Section tone="bone">
      <Container className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-[clamp(30px,6vw,90px)] items-center">
        <div className="reveal border-l border-mist pl-7">
          <Kicker number="05" />
          <p
            className={cx(
              "font-display font-bold text-[clamp(64px,8vw,120px)] leading-[0.9]",
              GOOGLE_STAT.pending ? "text-navy-400" : "text-navy-900",
            )}
          >
            {GOOGLE_STAT.value}
          </p>
          <p className="mt-4 text-charcoal text-[14px] max-w-[32ch] leading-[1.55]">{GOOGLE_STAT.label}</p>
          <p className={cx("mt-2.5 text-[11.5px]", GOOGLE_STAT.pending ? "text-navy-600 italic" : "text-stone")}>
            {GOOGLE_STAT.note}
          </p>
        </div>

        <div className="reveal flex flex-col">
          {REVIEWS.map((review) => (
            <div
              key={review.author}
              className="py-6 first:pt-0 border-b border-mist flex flex-col md:flex-row gap-2 md:gap-5 items-start md:items-baseline justify-between"
            >
              <p
                className={cx(
                  "text-[18px] leading-[1.4] max-w-[34ch]",
                  review.pending ? "text-stone font-medium italic" : "font-semibold",
                )}
              >
                {review.quote}
              </p>
              <span className="font-display text-[11.5px] tracking-[0.08em] uppercase text-stone whitespace-nowrap">
                {review.author}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
