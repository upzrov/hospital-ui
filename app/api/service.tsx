export const getServices = async () => {
    const response = await fetch("http://localhost:5141/Service");

    if (!response.ok) {
        throw new Error("Failed to fetch services");
    }

    return response.json();
};