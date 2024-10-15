import PageContainer from "../components/PageContainer";

export default function MyStoriesPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl">My stories</h1>
      <input placeholder="story name" className="border p-2"></input>
    </PageContainer>
  );
}
