import { Outlet } from "react-router";
import { PokemonProvider } from "../context";
import { Navbar } from "../components";

const MainLayout = () => {
  return (
    <div className="text-gray-300 bg-gradient-to-b from-purple-900 via-blue-800 to-blue-600 flex-col min-h-screen">
      <Navbar />
      <PokemonProvider>
        <main className="flex-grow flex flex-col">
          <Outlet />
        </main>
      </PokemonProvider>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
