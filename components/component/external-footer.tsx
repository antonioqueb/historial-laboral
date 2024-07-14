import Link from "next/link";

export function ExternalFooter() {
  return (
    <footer className="py-8 md:py-12 pt-4">
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
        <div className="flex flex-col items-start gap-4">
          <Link href="#" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-bold">Historial Laboral</span>
          </Link>
          <p className="text-muted-foreground">Providing high-quality products and services since 1990.</p>
        </div>
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold">Navigation</h3>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Home
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            About
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Products
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Contact
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-muted-foreground">
            123 Main Street
            <br />
            Anytown, USA 12345
          </p>
          <p className="text-muted-foreground">
            Phone: (123) 456-7890
            <br />
            Email: info@acme.com
          </p>
        </div>
        <div className="grid gap-1">
          <h3 className="text-lg font-semibold">Legal</h3>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-muted-foreground hover:underline" prefetch={false}>
            Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
