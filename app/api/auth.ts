export async function signIn(form: { email: string; password: string }) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/sign-in`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    },
  );

  if (!response.ok) {
    alert("Невірний email або пароль");
    return;
  }

  return response.json();
}

export async function signUp(form: {
  name: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  password: string;
  email: string;
}) {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/sign-up`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error:", errorData);
    return;
  }

  const data = await response.json();
  console.log("SUCCESS:", data);

  alert("Реєстрація успішна!");
}

export async function getRole() {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/Auth/role`,
  );

  if (!response.ok) {
    console.error(await response.json());
    throw new Error("Failed to fetch user role, user may be unathorized");
  }
}
