import Image from "next/image";
import Link from "next/link"; // Importa el componente Link de Next.js

export function AboutMeCompanyProfile() {
  return (
    <div className="w-full">
      <main className="py-12 md:py-24 border px-4 md:px-12 lg:px-44">
        <section className="px-2 md:px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="w-full border p-4 md:p-6 lg:p-0">
              <h2 className="text-xl md:text-2xl font-bold mb-4">About Acme Inc.</h2>
              <p className="text-muted-foreground mb-4 md:mb-6">
                Acme Inc. is a leading provider of innovative solutions for businesses of all sizes. Founded in 1985, we
                have a rich history of delivering cutting-edge products and exceptional customer service. Our mission is
                to empower our clients to achieve their goals and thrive in the digital age.
              </p>
              <p className="text-muted-foreground mb-4">
                Over the years, we have grown to become a trusted partner for thousands of organizations around the
                world. Our team of dedicated professionals is committed to staying at the forefront of industry trends
                and continuously improving our offerings to meet the evolving needs of our clients.
              </p>
              {/* Botón de enlace */}
              <Link href="https://www.acmeinc.com">
                <span className="inline-block mt-4 px-4 md:px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                  Visit our website
                </span>
              </Link>
            </div>
            <div className="relative w-full h-48 md:h-64 lg:h-auto">
              <Image
                src="/placeholder.svg"
                layout="fill"
                objectFit="cover"
                alt="Acme Inc. Office"
                className="rounded-lg"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
