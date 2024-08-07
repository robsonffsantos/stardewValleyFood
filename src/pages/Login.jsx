import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"

const Login = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Obrigatório"),
  })

  const handleSubmit = (values) => {
    console.log(values)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <Link to="/">
                    <h2 className="text-2xl hover:bg-blue-700 mb-4 text-center rounded bg-blue-500 text-white p-4">Stardew Valley Food</h2>
                </Link>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Senha
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-24 rounded focus:outline-none focus:shadow-outline"
                  >
                    Entrar
                  </button>
                  <p>ou</p>
                  <Link to ="/register">
                    <a>Registre-se</a>
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

export default Login
