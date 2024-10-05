"use client";
import { useAuth } from "@/context/auth-context";

const Loading = () => {
  const { loading } = useAuth();

  if (!loading) return null;

  return (
    <div className="fixed w-full h-dvh z-[100] flex flex-col bg-primary-600/25 backdrop-blur-sm">
      <div className="mx-auto mb-auto mt-48 text-center">
        <img
          src="https://media.tenor.com/lCKwsD2OW1kAAAAi/happy-cat-happy-happy-cat.gif"
          className="scale-110 mr-6"
        />
        <h1 className="text-3xl mt-4 text-primary-800">
          กำลังโหลดข้อมูล
          <span className="loading-dot text-3xl" />
        </h1>
      </div>
    </div>
  );
};
export default Loading;
