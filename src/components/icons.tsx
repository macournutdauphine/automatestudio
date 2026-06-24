import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12h12" />
      <path d="m13 6 6 6-6 6" />
    </IconBase>
  );
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </IconBase>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m6 9 6 6 6-6" />
    </IconBase>
  );
}

export function ClipboardListIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="8" y="4" width="8" height="3" rx="1" />
      <path d="M9 7h6" />
      <rect x="6" y="6" width="12" height="14" rx="2" />
      <path d="M9 12h6" />
      <path d="M9 16h4" />
    </IconBase>
  );
}

export function PackageSearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M21 8.5V16l-9 5-9-5V8.5" />
      <path d="m3.5 8.5 8.5 5 8.5-5" />
      <path d="M12 4 3.5 8.5 12 13l8.5-4.5L12 4Z" />
      <circle cx="17.5" cy="17.5" r="2.5" />
      <path d="m19.3 19.3 1.7 1.7" />
    </IconBase>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3 19 6v5c0 4.7-2.9 8.5-7 10-4.1-1.5-7-5.3-7-10V6l7-3Z" />
      <path d="m9.2 12 1.9 1.9L15.5 9.5" />
    </IconBase>
  );
}

export function FileCheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 3h5l5 5v13H8z" />
      <path d="M13 3v5h5" />
      <path d="m10 14 1.7 1.7L15 12.4" />
    </IconBase>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="5.5" />
      <path d="m15.5 15.5 4 4" />
    </IconBase>
  );
}

export function FunnelIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 6h16" />
      <path d="M7 10h10" />
      <path d="M10 14h4" />
      <path d="M11.5 14v5l1.5 1.5" />
    </IconBase>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14.5 4.5a4.5 4.5 0 0 0-5 5l-5.5 5.5 5 5 5.5-5.5a4.5 4.5 0 0 0 5-5l-2.8 1.8-3-3 1.8-2.8Z" />
      <path d="M9.2 15.8 8 17" />
    </IconBase>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </IconBase>
  );
}

export function CopyIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="9" y="9" width="9" height="9" rx="2" />
      <rect x="6" y="6" width="9" height="9" rx="2" />
    </IconBase>
  );
}

export function BarChartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 19V5" />
      <path d="M5 19h14" />
      <rect x="8" y="11" width="2.5" height="5" rx="0.8" />
      <rect x="12" y="8" width="2.5" height="8" rx="0.8" />
      <rect x="16" y="6" width="2.5" height="10" rx="0.8" />
    </IconBase>
  );
}

export function FileTextIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 3h5l5 5v13H8z" />
      <path d="M13 3v5h5" />
      <path d="M10 13h4" />
      <path d="M10 16h6" />
    </IconBase>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3 13.4 8.2 18 10l-4.6 1.8L12 17l-1.4-5.2L6 10l4.6-1.8L12 3Z" />
      <path d="M18 4.5 18.7 7 21 8l-2.3 1-0.7 2.5-.7-2.5L15 8l2.3-1z" />
    </IconBase>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M15 17H9c.8-1 1-2 1-3.5V11a2 2 0 1 1 4 0v2.5c0 1.5.2 2.5 1 3.5Z" />
      <path d="M7 17h10" />
      <path d="M10 17a2 2 0 0 0 4 0" />
      <path d="M18 16c0-1.2-.5-2.1-1-3V10a5 5 0 0 0-10 0v3c-.5.9-1 1.8-1 3h12Z" />
    </IconBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="m5.5 8.5 6.5 5 6.5-5" />
    </IconBase>
  );
}

export function DatabaseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
      <path d="M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
    </IconBase>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M9.5 11.2a2.8 2.8 0 1 0-2.8-2.8 2.8 2.8 0 0 0 2.8 2.8Z" />
      <path d="M17 11.2a2.3 2.3 0 1 0-2.3-2.3 2.3 2.3 0 0 0 2.3 2.3Z" />
      <path d="M4.8 18c.5-2.5 2.3-4 4.7-4s4.2 1.5 4.7 4" />
      <path d="M14.2 18c.3-1.8 1.6-3 3.2-3 1.5 0 2.6.9 3 2.5" />
    </IconBase>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 20h14" />
      <path d="M7 20V6l5-2 5 2v14" />
      <path d="M10 9h1.5" />
      <path d="M13.5 9H15" />
      <path d="M10 12h1.5" />
      <path d="M13.5 12H15" />
      <path d="M10 15h1.5" />
      <path d="M13.5 15H15" />
    </IconBase>
  );
}

export function FactoryIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 20h16" />
      <path d="M5 20V11l5 3V11l5 3V8l4-2v14" />
      <path d="M8 7v4" />
      <path d="M12 10v4" />
    </IconBase>
  );
}

export function GraduationCapIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3 9.5 12 5l9 4.5-9 4.5-9-4.5Z" />
      <path d="M7 11.3V15c0 1.2 2.2 2.5 5 2.5s5-1.3 5-2.5v-3.7" />
      <path d="M21 9.5v5" />
    </IconBase>
  );
}

export function PackageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3 20 7v10l-8 4-8-4V7l8-4Z" />
      <path d="M12 3v18" />
      <path d="M4 7l8 4 8-4" />
    </IconBase>
  );
}

export function RocketIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 4c3.2.2 4.8 1.8 5 5-1.9 1.8-3.8 3.6-5.7 5.5l-3.8-3.8L14 4Z" />
      <path d="M10.5 10.5 6.5 11 4 16l5-2.5.5-4Z" />
      <path d="M8 16.5 7 20l3.5-1" />
    </IconBase>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4v16" />
      <path d="M5 7h14" />
      <path d="M7.5 7 4.5 12h6L7.5 7Z" />
      <path d="M16.5 7 13.5 12h6l-3-5Z" />
      <path d="M6 20h12" />
    </IconBase>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="8" />
      <path d="m9.5 12 1.9 1.9L15.5 10" />
    </IconBase>
  );
}

export function XIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </IconBase>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 4 4 8l8 4 8-4-8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </IconBase>
  );
}
