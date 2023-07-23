import JoinRoom from "@/components/JoinRoom";
import useHasMounted from "@/utils/hooks/useHasMounted";

export default function Home() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  return (
    <main className="bg-dark-choco h-screen w-screen">
      <JoinRoom />
    </main >
  )
}
