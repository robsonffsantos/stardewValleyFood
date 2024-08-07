import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const Register = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    password: Yup.string()
      .min(8, 'A senha deve ter pelo menos 8 caracteres')
      .matches(/[a-z]/, 'A senha deve ter pelo menos uma letra minúscula')
      .matches(/[A-Z]/, 'A senha deve ter pelo menos uma letra maiúscula')
      .matches(/\d/, 'A senha deve ter pelo menos um número')
      .required('Senha é obrigatória'),
  })

  const handleSubmit = (values) => {
    localStorage.setItem('user', JSON.stringify(values))
    navigate('/login')
  }

  return (
    <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-md">
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                {() => (
                    <Form className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <Link to="/">
                            <h2 className="text-2xl hover:bg-blue-700 mb-4 text-center rounded bg-blue-500 text-white p-4">Stardew Valley Food</h2>
                        </Link>
                        <h2 className="text-2xl text-center rounded p-6">Registrar</h2>
                        <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Nome</label>
                        <Field name="name" type="text" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <Field name="email" type="email" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Senha</label>
                        <Field name="password" type="password" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded focus:outline-none focus:shadow-outline"
                            >Registrar</button>
                            <p>ou</p>
                            <Link to ="/login">
                                <a className="hover:underline">Login</a>
                            </Link>
                        </div>
                    </Form>
                )}
                </Formik>
            </div>
        </div>
        <Footer />      
    </div>
  )
}

export default Register
