import Link from 'next/link'
import { Button } from 'primereact/button'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0e1315] to-[#161d21] p-4 text-[rgba(255,255,255,0.87)]">
            <div className="max-w-md w-full mx-auto text-center space-y-8">
                <div className="relative">
                    <div className="absolute -top-24 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full flex items-center justify-center">
                                <i className='pi pi-ban text-red-800' style={{ fontSize: "5.6em" }} />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#f42c2c] flex items-center justify-center text-white font-bold">
                                404
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#161d21] border border-[#263238] rounded-lg shadow-xl p-8 pt-16">
                    <h1 className="text-3xl font-bold mb-2 text-primary">Página no encontrada</h1>
                    <p className="text-[rgba(255,255,255,0.6)] mb-6">
                        Lo sentimos, la página que estás buscando no existe o ha sido movida.
                    </p>

                    <div className="space-y-4">
                        <div className="h-2 w-full bg-[#0e1315] rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-1/3 rounded-full animate-pulse"></div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">

                            <Link className='text-cyan-500' href="/">
                                Volver al inicio
                            </Link>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#263238] text-sm text-[rgba(255,255,255,0.6)]">
                        <p>Si crees que esto es un error, por favor contacta al administrador o intenta nuevamente más tarde.</p>
                    </div>
                </div>

                <div className="text-sm text-[rgba(255,255,255,0.6)]">
                    © {new Date().getFullYear()} Quinielas - Todos los derechos reservados - Alejandro Garcia
                </div>
            </div>
        </div>
    )
}