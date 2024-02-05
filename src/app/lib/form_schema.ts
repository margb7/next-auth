import { z } from "zod";

export const UserLoginSchema = z.object({
    email: z.string().email({message: "Debe contener un email válido"}),
    password: z.string()
})

export const UserSignUpSchema = z.object({
    name: z.string().min(5, {message: "Debe contener más de 5 caracteres"}),
    email: z.string().email({message: "Debe contener un email válido"}),
    password: z.string().min(8, {message: "Debe contener más de 7 caracteres"}),
    repeat: z.string().min(8, {message: "Debe contener más de 7 caracteres"})
}).superRefine(({repeat, password}, ctx) => {

    if(repeat != password) {

        ctx.addIssue({code: "custom", message: "La contraseña no coincide", path: ["repeat"]})

    }

})

