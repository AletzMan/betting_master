import { GoogleIcon } from "@/svg";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Divider } from "primereact/divider";

export default function LoginOptions() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';
    const HandleSignInWithGoogle = (provider: string) => {

        signIn(provider, { redirect: true, redirectTo: callbackUrl });
    }


    return (
        <article className="flex flex-col gap-2.5 p-3 items-center w-full">
            <Divider >
                <span className="">Inicia sesión para crear tus quinielas.</span>
            </Divider>
            <button type="button" className="flex flex-row items-center gap-2.5 w-full max-w-65 bg-(--surface-b) border-1 border-(--surface-d) rounded-md py-2.5 px-5 hover:bg-(--surface-e) cursor-pointer" onClick={() => HandleSignInWithGoogle("google")} >
                <GoogleIcon className="w-6 h-6" />
                Continuar con Google
            </button>
            {/*<Button className="w-full max-w-57" label="Continuar con X" severity="secondary" icon="pi pi-twitter" onClick={() => HandleSignInWithGoogle("twitter")} />*/}
            <Divider />
        </article>
    )
}