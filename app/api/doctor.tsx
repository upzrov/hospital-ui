export const getDoctors = async () => {
    const response = await fetch("http://localhost:5141/Doctor");

    if (!response.ok) {
        throw new Error("Failed to fetch doctors");
    }

    return response.json();
};