import type { FAQItem } from "../components/ui/FAQCard";

// The keys match the i18n qa.items array index
export const getFAQData = (t: (key: string) => string): FAQItem[] => [
  {
    id: 1,
    question: t("qa.items.0.question"),
    answer: t("qa.items.0.answer"),
    side: "left",
  },
  {
    id: 2,
    question: t("qa.items.1.question"),
    answer: t("qa.items.1.answer"),
    side: "left",
  },
  {
    id: 3,
    question: t("qa.items.2.question"),
    answer: t("qa.items.2.answer"),
    side: "left",
  },
  {
    id: 4,
    question: t("qa.items.3.question"),
    answer: t("qa.items.3.answer"),
    side: "right",
  },
  {
    id: 5,
    question: t("qa.items.4.question"),
    answer: t("qa.items.4.answer"),
    side: "right",
  },
  {
    id: 6,
    question: t("qa.items.5.question"),
    answer: t("qa.items.5.answer"),
    side: "right",
  },
];