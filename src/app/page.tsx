'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import useLogin from '@/feature/auth/hooks/useLogin'
import Image from 'next/image'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

// Yup schema
const schema = yup.object({
  email: yup
    .string()
    .email('Format email tidak valid')
    .required('Email tidak boleh kosong'),
  password: yup.string().required('Password tidak boleh kosong')
})

type FormData = yup.InferType<typeof schema>

export default function AuthenticationPage() {

  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const { mutateAsync, isPending } = useLogin()

  const onSubmit = async (data: FormData) => {
    await mutateAsync({ body: data })
    // Simulasi login / panggil API di sini
  }

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/examples/authentication"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>

      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative gap-4 z-20 flex items-center text-xl font-bold">

          <Image src='/LOGO_KEMENTERIAN_PERHUBUNGAN_REPUBLIK_INDONESIA.png' alt='Logo Kementerian Perhubungan Republik Indonesia' width={50} height={50} className="relative z-20 " />
          DISHUB BANYUMAS
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-4xl font-bold">
              Sistem Pengelolaan Gudang Dinas Perhubungan
            </p>
            <p className="text-sm">
              Sistem ini merupakan platform internal resmi Dinas Perhubungan yang digunakan untuk mengelola data barang masuk, barang keluar, dan inventaris logistik gudang secara terpusat, efisien, dan transparan.
            </p>
            {/* <footer className="text-sm">Sofia Davis</footer> */}
          </blockquote>
        </div>
      </div>

      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Masuk sebagai Petugas
            </h1>
            <p className="text-sm text-muted-foreground">
              Silakan login menggunakan akun yang telah diberikan untuk mengakses fitur pengelolaan.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="text"
                placeholder="email@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                {...register('password')}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-[50%] text-sm text-muted-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <Button
              type="submit"
              loading={isSubmitting || isPending}
              className="ml-auto mt-6 w-full"
              disabled={isSubmitting || !isDirty || !isValid || isPending}
            >
              Masuk
            </Button>
          </form>
          <p className="text-sm text-muted-foreground">
            Harap menjaga kerahasiaan akun Anda. Segala aktivitas dalam sistem ini tercatat dan diawasi untuk kepentingan keamanan dan audit.            </p>
        </div>
      </div>
    </div>
  )
}
