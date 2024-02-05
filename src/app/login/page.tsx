"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { UserLoginSchema } from "../lib/form_schema";
import { z } from "zod";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {

    let [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    let [errors, setErrors] = useState<z.inferFlattenedErrors<typeof UserLoginSchema>>();
    let urlSearchParams = useSearchParams()

    async function onSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        try {

            const validatedData = UserLoginSchema.parse(formData);

            let email = validatedData.email;
            let password = validatedData.password;

            await signIn("credentials", {email: email, password: password, callbackUrl: "/profile"})

        } catch(error) {

            if(error instanceof z.ZodError) {
                setErrors(error.flatten())
            }

        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const {name, value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

    }

    return(
        <main className="flex flex-col bg-white items-center space-y-5 justify-center min-h-screen">
            
            <form onSubmit={onSubmit} className="bg-gray-100 md:max-w-md flex flex-col w-full px-6 py-2 md:rounded-xl border border-gray-500">

                <div className="font-bold text-2xl mb-8 mt-6 text-center">Inicia sesión en tu cuenta</div>

                { urlSearchParams.get("error") &&

                    <p className="text-danger-500 text-md text-center">Las credenciales no son correctas</p>
                
                } 

                <div className="flex flex-col space-y-1 mb-6">

                    <span className="text-md">Email:</span>
                    <input value={formData.email} onChange={handleChange} placeholder="ejemplo@email.com" className="p-2 rounded-md focus:ring-blue-600" type="email" name="email" />

                    {errors?.fieldErrors.email && 
                        <p className="text-danger-500 text-md">{errors.fieldErrors.email}</p>
                    }

                </div>

                <div className="flex flex-col space-y-1 mb-6">

                    <span className="text-md">Pasword:</span>
                    <input value={formData.password} onChange={handleChange} placeholder="*****" className="p-2 rounded-md focus:ring-blue-600" type="password" name="password" />

                    {errors?.fieldErrors.password && 
                        <p className="text-danger-500 text-md">{errors.fieldErrors.password}</p>
                    }

                </div>

                <div className="flex flex-row justify-between">

                    <div className="flex flex-row space-x-2">

                        <input type="checkbox" name="remember" />
                        <span className="text-md">Recordarme</span>

                    </div>

                    <a className="text-blue-700" href="#" >Olvidaste la contraseña?</a>

                </div>

                <button className="bg-blue-500 rounded-md p-1 mt-6" type="submit">Iniciar sesión</button>

                <div className="text-xs mt-3 mb-4">

                   No tienes cuenta? <Link className="text-blue-700" href={"/signup"}>Crea una cuenta</Link>
                
                </div>

            </form>

        </main>
    );

}