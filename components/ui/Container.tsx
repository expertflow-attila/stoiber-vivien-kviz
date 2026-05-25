import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  width = "default",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  width?: "narrow" | "default" | "wide";
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}) {
  const widthClass =
    width === "narrow"
      ? "max-w-[760px]"
      : width === "wide"
      ? "max-w-[1180px]"
      : "max-w-[960px]";
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 sm:px-8 lg:px-10",
        widthClass,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
