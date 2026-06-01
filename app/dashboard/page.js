export default async function Page() {
  const response = await fetch('http://localhost:3000/api/user');
  const data = await response.json();

  return (
    <>
      <main>Dashboard page</main>
      <h1>Hello, {data.name}</h1>
    </>
  )
}