import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface User {
  email: string;
  xp: number;
}

export default function Leaderboard() {
  const { token } = useAuth(); 
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return; 

    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("http://localhost:4001/users/leaderboard", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch leaderboard");
        }

        const data = await res.json();
        setUsers(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [token]);

  if (!token) return <p className="text-center mt-12 text-white">Please login to view the leaderboard.</p>;

  if (loading) return <p className="text-center mt-12 text-white">Loading leaderboard...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center mt-12 text-white">
      <h1 className="text-yellow-400 text-3xl font-bold mb-8">Leaderboard</h1>
      <table className="min-w-[400px] bg-gray-800 rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Platz</th>
            <th className="py-2 px-4 text-left">Spieler</th>
            <th className="py-2 px-4 text-right">XP</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.email} className="border-t border-gray-600">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4 text-right">{user.xp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
