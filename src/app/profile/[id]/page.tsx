// src/app/profile/[id]/page.tsx

export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params; // ✅ unwrap the Promise

  return (
    <div className="flex flex-col justify-center items-center h-screen py-2">
        <h1> Profile :</h1>
        <hr />
      <p>User Profile Page: </p>
      <span className="bg-green-500 px-3 py-2 rounded-lg ">{id}</span>
    </div>
  );
}
