type Doctor = {
    doctorId: number,
    fullName: string,
    specialty: number,
    email: string,
    phoneNumber: number,
}

type Service = {
    serviceId: number,
    name: string,
    description: string,
    price: number,
    durationMinutes: number,
    specialty: number,
}