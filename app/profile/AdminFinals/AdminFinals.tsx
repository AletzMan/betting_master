import { useEffect, useState } from "react"
import { IParticipants } from "@/app/types/types"
import { QualifiedTeams } from "@/app/finals/components/Quarterfinals"
import { Button } from "@/app/components/Button/Button"
import { ArrowUpIcon, LotteryIcon, LuckIcon } from "@/app/svg"
import { GetFinalParticipants, UpdateFinalParticipants } from "@/app/config/firebase"
import styles from "./adminfinals.module.scss"
import stylesGeneral from "../profile.module.scss"

export default function AdminFinals() {
    const [participants, setParticipants] = useState<IParticipants[]>()
    const [finalistTeams, setFinalistTeams] = useState<string[]>([])

    useEffect(() => {
        //GetParticipants()
        const finalist = QualifiedTeams.flatMap(team => team.name)
        setFinalistTeams(finalist)
    }, [])

    const HandleDrawTeams = async () => {
        let randomNumbers: number[] = []
        // Llenar el arreglo con los números del 1 al 8
        for (let i = 1; i <= 8; i++) {
            randomNumbers.push(i);
        }

        let numerosAleatorios = [];
        // Muestreo aleatorio sin reemplazo
        for (let index = 0; index < 8; index++) {

            while (randomNumbers.length > 0) {
                const indice = Math.floor(Math.random() * randomNumbers.length)
                numerosAleatorios.push(randomNumbers[indice])
                randomNumbers.splice(indice, 1)
            }
        }

        console.log(numerosAleatorios)

        if (participants) {
            const newParticipants = [...participants]
            for (let index = 0; index < 8; index++) {
                newParticipants[index].team = finalistTeams[numerosAleatorios[index] - 1]
            }
            setParticipants(newParticipants)

            newParticipants.forEach(participant => {
                const reponse = UpdateFinalParticipants(participant.uid, participant.team)
            })

        }
    }

    const GetParticipants = async () => {
        const data = await GetFinalParticipants()

        if (data.length > 0) {
            setParticipants(data)
        } else {
            setParticipants([])
        }
    }

    return (
        <details className={stylesGeneral.details} name="adminpanel">
            <summary className={stylesGeneral.details_summary}>
                <div className={stylesGeneral.details_title}>
                    <LotteryIcon className={stylesGeneral.details_icon} />
                    Administración de Sorteo
                </div>
                <ArrowUpIcon className={stylesGeneral.details_arrow} />
            </summary>

            <article className={styles.details}>
                {participants?.length === 8 && <Button props={{ onClick: HandleDrawTeams }} text="Sortear" icon={<LuckIcon className={""} />} />}
            </article>
        </details>
    )
}

/*const data = [
           {
               team: '',
               uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
               userInfo: {
                   photo:
                       'https://lh3.googleusercontent.com/a/ACg8ocJ7E4PzlEjRsIqGpdN71kUe-sG33WN9UXMQ61Wpp0oVP2U=s96-c',
                   email: 'alejo2986@gmail.com',
                   uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                   name: 'Alejandro Garcia'
               },
               id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
           },
           {
               team: '',
               uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
               userInfo: {
                   photo:
                       'https://lh3.googleusercontent.com/a/ACg8ocJV7zokRNBsZLofjwaVPe9HJrOz487ZQduUXf6n3bO7=s96-c',
                   email: 'alejo2986@gmail.com',
                   uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                   name: 'Judith Garcia'
               },
               id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
           },
           {
               team: '',
               uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
               userInfo: {
                   photo:
                       'https://lh3.googleusercontent.com/a/ACg8ocLZzEGfe6SOAX62JGMV4TKbreD5d0lkuA6Pidwx7Mt2=s96-c',
                   email: 'alejo2986@gmail.com',
                   uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                   name: 'JK Garcia'
               },
               id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
           },
           {
               team: '',
               uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
               userInfo: {
                   photo:
                       'https://lh3.googleusercontent.com/a/ACg8ocJHdeCqmsWqnlERyNQu_m-MLBuqe6FVeLSsJSMM4Efr=s96-c',
                   email: 'alejo2986@gmail.com',
                   uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                   name: 'Paty Garcia'
               },
               id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
           },
           {
               team: '',
               uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
               userInfo: {
                   photo:
                       'https://lh3.googleusercontent.com/a/ACg8ocLA92MJoEylcI8tY0R26cCh9ok-aZdPN1UOMty4ESIJ=s96-c',
                   email: 'alejo2986@gmail.com',
                   uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                   name: 'Ma del Rosario'
               },
               id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
           },
           {
               team: '',
               uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
               userInfo: {
                   photo:
                       'https://lh3.googleusercontent.com/a/ACg8ocKulEAaKcIXyW5CAeLySco3xBveoDj0prmY8LMeQ0IP=s96-c',
                   email: 'alejo2986@gmail.com',
                   uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                   name: 'Juan Galvan'
               },
               id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
           },
           {
               team: '',
               uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
               userInfo: {
                   photo:
                       'https://lh3.googleusercontent.com/a/ACg8ocInVz5eFzExt4oD9KmQjLH_akceoyNSIPbbbzcnSYsW=s96-c',
                   email: 'alejo2986@gmail.com',
                   uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                   name: 'Aide Alonso'
               },
               id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
           },
           {
               team: '',
               uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
               userInfo: {
                   photo:
                       'https://lh3.googleusercontent.com/a/ACg8ocJHvPhVKJiHO1-lxgi0jGlJnSlIbGY43RpR0EFCIhzI=s96-c',
                   email: 'alejo2986@gmail.com',
                   uid: 'AGstpoT4F9WHdWIwZjbHP6TRHea2',
                   name: 'Lola Torres'
               },
               id: '544684cf-ccfe-4946-95ec-09dfcf137c53'
           }
       ]
       */