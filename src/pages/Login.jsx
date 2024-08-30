import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useAuth } from "../context/LoginContext"

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email inválido").required("Obrigatório"),
    password: Yup.string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("Obrigatório"),
  })

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const success = login(values.email, values.password)
    if (success) {
      navigate("/")
    } else {
      setErrors({ email: "Email ou senha incorretos" })
    }
    setSubmitting(false)
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
              <Form className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4">
                <Link to="/">
                  <h2 className="text-2xl hover:bg-blue-700 mb-4 text-center rounded bg-blue-500 text-white p-4">
                    Stardew Valley Food
                  </h2>
                </Link>
                <h2 className="text-2xl text-center rounded p-6">Login</h2>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
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
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline mb-2"
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
                  <Link to="/register">
                    <span className="hover:underline">Registre-se</span>
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

