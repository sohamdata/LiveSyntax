import JoinRoom from "@/components/JoinRoom";
import useHasMounted from "@/utils/hooks/useHasMounted";
import Head from "next/head";

export default function Home() {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  return (
    <>
      <Head>
        <title>LiveSyntax</title>
        <meta name='description' content='Code with your friends in real time!' />
      </Head>
      <main className="bg-dark-choco h-screen w-screen">
        <JoinRoom />
      </main>
    </>
  )
}
