export const getSpecialties = async () => {
    const response = await fetch("http://localhost:5141/Lookup/specialties");

    if (!response.ok) {
        throw new Error("Failed to fetch doctors");
    }

    return response.json();
};