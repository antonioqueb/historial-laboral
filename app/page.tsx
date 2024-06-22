
import SearchHome from "@/components/SearchHome";
import Header from "@/components/Header";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main className="w-full">
        <SearchHome />
      </main>
    </>
  );
};

export default Home;
