import PageContainer from "../components/PageContainer";

export default function StoryEditorPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl">Create new story</h1>
      <input placeholder="story name" className="border p-2"></input>
    </PageContainer>
  );
}
