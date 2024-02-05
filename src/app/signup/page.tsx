"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { UserSignUpSchema } from "../lib/form_schema";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { fetchUserSignUp } from "../lib/data";

export default function SignUpPage() {

    let [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeat: ''
    });

    let [errors, setErrors] = useState<z.inferFlattenedErrors<typeof UserSignUpSchema>>();
    let urlSearchParams = useSearchParams()

    async function onSubmit(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        try {

            const validatedData = UserSignUpSchema.parse(formData);

            fetchUserSignUp(validatedData.name, validatedData.email, validatedData.password)

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

                <div className="font-bold text-2xl mb-8 mt-6 text-center">Crea una cuenta</div>

                { urlSearchParams.get("error") &&

                    <p className="text-danger-500 text-md text-center">Las credenciales ya están registradas</p>
                
                } 

                <div className="flex flex-col space-y-1 mb-6">

                    <span className="text-md">Nombre:</span>
                    <input value={formData.name} onChange={handleChange} placeholder="Tu nombre" className="p-2 rounded-md focus:ring-blue-600" type="text" name="name" />

                    {errors?.fieldErrors.name && 
                        <p className="text-danger-500 text-md">{errors.fieldErrors.name}</p>
                    }

                </div>

                <div className="flex flex-col space-y-1 mb-6">

                    <span className="text-md">Email:</span>
                    <input value={formData.email} onChange={handleChange} placeholder="ejemplo@email.com" className="p-2 rounded-md focus:ring-blue-600" type="email" name="email" />

                    {errors?.fieldErrors.email && 
                        <p className="text-danger-500 text-md">{errors.fieldErrors.email}</p>
                    }

                </div>

                <div className="flex flex-col space-y-1 mb-6">

                    <span className="text-md">Contraseña:</span>
                    <input value={formData.password} onChange={handleChange} placeholder="*****" className="p-2 rounded-md focus:ring-blue-600" type="password" name="password" />

                    {errors?.fieldErrors.password && 
                        <p className="text-danger-500 text-md">{errors.fieldErrors.password}</p>
                    }

                </div>

                <div className="flex flex-col space-y-1 mb-6">

                    <span className="text-md">Repite la contraseña:</span>
                    <input value={formData.repeat} onChange={handleChange} placeholder="*****" className="p-2 rounded-md focus:ring-blue-600" type="password" name="repeat" />

                    {errors?.fieldErrors.repeat && 
                        <p className="text-danger-500 text-md">{errors.fieldErrors.repeat}</p>
                    }

                </div>

                <button className="bg-blue-500 rounded-md p-1 mt-6" type="submit">Crear cuenta</button>

                <div className="text-xs mt-3 mb-4">

                   Ya tienes cuenta? <Link className="text-blue-700" href={"/login"}>Inicia sesión</Link>
                
                </div>

            </form>

        </main>
    );

}