import bcrypt from "bcrypt";

const solt_rounds = 10

export function HashPassword(password){
    return bcrypt.hash(password, solt_rounds)
}

export function ComparePassword(password, hashedPassword){
    return bcrypt.compare(password, hashedPassword)
}