type Doctor = {
    doctorId: number,
    fullName: string,
    specialty: number,
    email: string,
    photoUrl: string,
    gender: number,
    services: Service[],
}

type Service = {
    serviceId: number,
    name: string,
    description: string,
    price: number,
    durationMinutes: number,
    specialty: number,
}