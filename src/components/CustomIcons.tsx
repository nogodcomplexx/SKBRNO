import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

// 1. Sleek Straight Razor (Břitva)
export function StraightRazor({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Razor Blade */}
      <path d="M12 12l8.5-8.5c.8-.8.8-2 0-2.8s-2-.8-2.8 0L9.2 9.2" />
      <path d="M18.5 5.5l-6.5 6.5" />
      {/* Razor Handle */}
      <path d="M12 12c.5 1.5.2 3.2-.8 4.2l-5.5 5.5c-.8.8-2 .8-2.8 0s-.8-2 0-2.8L8.4 13.4c1-1 2.7-1.3 4.2-.8l-.6-.6z" />
      {/* Pivot screw */}
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// 2. Crossed Scissors & Comb (Střih)
export function ScissorsAndComb({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Comb (Left side) */}
      <path d="M4 4v16" />
      <path d="M4 6h4M4 8h4M4 10h4M4 12h4M4 14h4M4 16h4M4 18h4" />
      {/* Scissors (Right side) */}
      <circle cx="13" cy="17" r="2" />
      <circle cx="19" cy="17" r="2" />
      <path d="M14.5 15.5L16 12M17.5 15.5L16 12" />
      <path d="M16 12L13 5M16 12L19 5" />
    </svg>
  );
}

// 3. Premium Hair Dryer (Fénování & Styling)
export function HairDryer({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Dryer Body */}
      <path d="M4 8h10c1.1 0 2 .9 2 2v2c0 1.1-.9 2-2 2H4V8z" />
      {/* Back vent */}
      <path d="M3 9v4" />
      {/* Nozzle */}
      <path d="M16 10h2v2h-2v-2z" />
      {/* Handle */}
      <path d="M8 14v6c0 1.1-.9 2-2 2s-2-.9-2-2v-6" />
      {/* Air flows */}
      <path d="M20 9.5c1 .5 1 1.5 0 2M21 11c1 .5 1 1.5 0 2" />
    </svg>
  );
}

// 4. Cosmetic Oil Dropper Bottle (Péče o vlasy a vousy)
export function DropperBottle({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Bottle Body */}
      <path d="M7 11h10v9c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2v-9z" />
      {/* Neck */}
      <path d="M10 8h4v3h-4V8z" />
      {/* Dropper Cap */}
      <path d="M9 5h6v3H9V5z" />
      {/* Dropper Squeeze Bulb */}
      <path d="M11 2h2v3h-2V2z" />
      {/* Label outline */}
      <path d="M9 14h6v4H9v-4z" />
    </svg>
  );
}

// 5. Clean Beard & Mustache (Úprava vousů)
export function BeardAndMustache({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Mustache */}
      <path d="M12 14c-1.5-1.5-4-2-6-1.5-1.5.4-3.5 1.5-4.5 3 1.5 0 3-.5 4-1 1-.5 2-.5 3 .5l1.5 1.5 1.5-1.5c1-1 2-1 3-.5 1 .5 2.5 1 4 1-1-1.5-3-2.6-4.5-3-2-.5-4.5 0-6 1.5z" />
      {/* Beard outline */}
      <path d="M4 15.5c.5 2.5 2 4.5 4.5 5.5 2.2.9 4.8.9 7 0 2.5-1 4-3 4.5-5.5.5-2.5 0-3-.5-4" />
      <path d="M4 11.5c-.5 1-.5 2.5 0 4" />
    </svg>
  );
}

// 6. Luxury Barber Chair (Ateliér)
export function BarberChair({ size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Headrest */}
      <path d="M10 3h4v2h-4V3z" />
      {/* Backrest */}
      <path d="M7 6h10v6H7V6z" />
      {/* Armrests */}
      <path d="M5 11h2v3H5v-3zM17 11h2v3h-2v-3z" />
      {/* Seat */}
      <path d="M6 13h12v3H6v-3z" />
      {/* Chair base connector */}
      <path d="M12 16v4" />
      {/* Footrest */}
      <path d="M8 20h8" />
      {/* Circular base */}
      <path d="M5 21h14" />
    </svg>
  );
}
