import Link from "next/link";
import PageContainer from "./components/PageContainer";

export default function Home() {
  return (
    <PageContainer>
      <h1 className="text-3xl">Choose your own adventure creator</h1>
      <h2>
        Create your own choose your own adventure story and share it with others
      </h2>

      <Link href="/read" className="border p-2">
        Read stories
      </Link>
      <Link href="/story-editor" className="border p-2">
        Create new story
      </Link>
    </PageContainer>
  );
}
