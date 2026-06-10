export async function getRandomCard() {
  try {
    const response = await fetch(`http://localhost:3000/api/cards/random`);

    if (!response.ok) {
      throw new Error("Could not fetch Data");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
