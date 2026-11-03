import type { ReactNode } from "react";

type CardProps = {
  title: ReactNode;
  badge?: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
};

/** Card used to render a table row on phones (< 768px). */
export function MobileCard({ title, badge, children, actions }: CardProps) {
  return (
    <div className="m-card">
      <div className="m-card__header">
        <div className="m-card__title">{title}</div>
        {badge}
      </div>
      {children}
      {actions && <div className="m-card__actions">{actions}</div>}
    </div>
  );
}

export function MobileCardRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="m-card__row">
      <span className="m-card__label">{label}</span>
      <span className="m-card__value">{children}</span>
    </div>
  );
}

export function MobileCardStat({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="m-card__stat">
      <span className="m-card__label">{label}</span>
      <span className="m-card__stat-value">{children}</span>
    </div>
  );
}

/** Wrapper visible only on phones; shows an empty state when there are no rows. */
export function MobileCardList({
  isEmpty,
  emptyText = "No records yet.",
  children,
}: {
  isEmpty?: boolean;
  emptyText?: string;
  children: ReactNode;
}) {
  return (
    <div className="d-md-none">
      {isEmpty ? (
        <div className="m-card-empty">{emptyText}</div>
      ) : (
        <div className="m-card-list">{children}</div>
      )}
    </div>
  );
}
