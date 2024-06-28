'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResponseSearch from "@/components/ResponseSearch";
import { getReviewsByNSS } from "@/utils/fetchData";

export default function Component() {
  const [nss, setNss] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/tablero');
    }
  }, [status, router]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await getReviewsByNSS(nss);
      setReviews(data.reviews);
    } catch (err) {
      setError("Error al obtener las reseñas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center lg:py-12 justify-center h-screen bg-zinc-100 dark:bg-zinc-900 w-full">
      <div className="container max-w-7xl px-4 md:px-6">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl 2xl:text-8xl pt-24">Buscar Historial Laboral</h1>
            <p className="mt-3 text-xl text-zinc-500 dark:text-zinc-400 2xl:text-2xl">
              Encuentra el antecedente laboral de tus candidatos a través de su NSS.
            </p>
          </div>
          <div className="rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <form className="flex items-center space-x-3" onSubmit={handleSearch}>
              <div className="flex-1">
                <Input
                  className="w-full rounded-md border-zinc-300 shadow-sm focus:border-zinc-500 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-500 text-lg"
                  placeholder="Ingresar NSS"
                  type="text"
                  value={nss}
                  onChange={(e) => setNss(e.target.value)}
                />
              </div>
              <Button className="shrink-0 text-lg" type="submit" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
            </form>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <ResponseSearch reviews={reviews} />
        </div>
      </div>
    </main>
  );
}
