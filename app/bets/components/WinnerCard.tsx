import Image from "next/image"
import { IUser, UserSession } from "@/types/types"
import { TeamsLogos } from "@/constants/constants"
import { useEffect, useState } from "react"

interface Props {
    participant: UserSession | IUser
    name_bet?: string
    name_team?: string
}

export default function WinnerCard({ participant, name_bet, name_team }: Props) {
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        setIsLoaded(true)
    }, [])
    return (



        <div
            className={`relative rounded-xl overflow-hidden transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"} animate-(--animate-scale)`}
            style={{
                width: "150px", height: "215px"
            }}
        >
            {/* Enhanced metallic border */}
            <div
                className="absolute inset-0 rounded-xl border-[3px]  border-transparent z-10"
                style={{
                    background: `linear-gradient(135deg, 
                          #ffffff 0%, 
                          #e2e2e2 10%, 
                          #c3c3c3 20%, 
                          #8f8f8f 30%, 
                          #a0a0a0 40%, 
                          #d6d6d6 50%, 
                          #a0a0a0 60%, 
                          #8f8f8f 70%, 
                          #c3c3c3 80%, 
                          #e2e2e2 90%, 
                          #ffffff 100%) border-box`,
                    backgroundSize: "200% 200%",
                    animation: "borderGradient 6s linear infinite, shimmer 3s infinite",
                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(255, 255, 255, 0.3)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                }}
            />

            {/* Automatic diagonal shine effect */}
            <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
                <div className="diagonal-shine"></div>
            </div>

            {/* Card content with enhanced metallic look */}
            <div
                className="relative z-0 border-0 overflow-hidden shadow-xl"
                style={{
                    background: `linear-gradient(145deg, #2e2d2d, #101010)`,
                    boxShadow: `inset 0 1px 1px rgba(255, 255, 255, 0.3), 
                                    inset 0 -1px 1px rgba(0, 0, 0, 0.5), 
                                    0 5px 15px rgba(0, 0, 0, 0.7)`,
                }}
            >
                <div className="flex flex-col items-center gap-1.5  relative ">
                    {/* Metallic texture overlay */}
                    <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                    />

                    {/* Trophy banner with enhanced metallic look */}
                    <div
                        className="relative overflow-hidden p-1"
                        style={{
                            background: `linear-gradient(to right, 
                              #dfbe07 0%, 
                              #fde674 20%, 
                              #ffd700 40%, 
                              #f8e275 60%, 
                              #ffd700 80%, 
                              #f5df6f 100%)`,
                            backgroundSize: "200% 100%",
                            animation: "shimmerGold 3s linear infinite",
                            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.6)",
                        }}
                    >
                        <div className="py-1 px-4 flex items-center justify-center gap-2 font-bold text-black relative z-10">
                            <i className="h-5 w-5 text-black pi pi-trophy" />
                            <span className="text-sm">¡GANADOR!</span>
                            <i className="h-5 w-5 text-black pi pi-trophy" />
                        </div>
                        {/* Metallic shine effect on banner */}
                        <div
                            className="absolute inset-0 opacity-40"
                            style={{
                                background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.8) 50%, transparent 100%)",
                                animation: "sweepShine 2s ease-in-out infinite",
                                transform: "skewX(-20deg)",
                            }}
                        />
                    </div>

                    {/* Winner image */}
                    <div className="relative w-15 aspect-square overflow-hidden mt-2 rounded-sm">
                        <Image
                            src={participant.image}
                            alt={`Foto de ${participant.name}`} width={50} height={50}
                            className="w-full h-full object-cover rounded-sm"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-sm"></div>

                        {/* Metallic frame around image */}
                        <div
                            className="absolute inset-0 pointer-events-none border-2 rounded-sm"
                            style={{
                                borderImage: "linear-gradient(45deg, #c0c0c0, #f5f5f5, #c0c0c0, #8b8b8b, #c0c0c0) 1",
                                boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.5)",
                            }}
                        />
                    </div>

                    {/* Winner info with enhanced metallic look */}
                    <div className="p-4 text-center">
                        <h2
                            className="text-sm font-bold mb-1"
                            style={{
                                background: "linear-gradient(to right, #ffd700, #fff6c8, #ffd700, #fff6c8, #ffd700)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundSize: "200% auto",
                                animation: "shimmerGold 3s linear infinite",
                                textShadow: "0 0 5px rgba(255, 215, 0, 0.3)",
                            }}
                        >
                            {participant.name}
                        </h2>
                        <div className="px-2 py-1 text-sm rounded-sm text-gray-950 font-bold" style={{
                            background: `linear-gradient(to right, 
                              #757575 0%, 
                              #c8c8c8 20%, 
                              #e2e2e2 40%, 
                              #c9c9c9 60%, 
                              #a7a7a7 80%, 
                              #eaeaea 100%)`,
                        }}>
                            {name_bet || name_team}
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
                    @keyframes borderGradient {
                      0% { background-position: 0% 50%; }
                      50% { background-position: 100% 50%; }
                      100% { background-position: 0% 50%; }
                    }
                    
                    @keyframes shimmer {
                      0% { opacity: 0.7; }
                      50% { opacity: 1; }
                      100% { opacity: 0.7; }
                    }
                    
                    @keyframes shimmerGold {
                      0% { background-position: 0% 50%; }
                      100% { background-position: 100% 50%; }
                    }
                    
                    @keyframes sweepShine {
                      0% { left: -100%; }
                      100% { left: 100%; }
                    }
                    
                    .diagonal-shine {
                      position: absolute;
                      top: -100%;
                      left: -100%;
                      width: 60%;
                      height: 200%;
                      background: linear-gradient(
                        to bottom right,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0) 45%,
                        rgba(255, 255, 255, 0.2) 50%,
                        rgba(255, 255, 255, 0) 55%,
                        rgba(255, 255, 255, 0) 100%
                      );
                      transform: rotate(45deg);
                      animation: diagonalShine 3s ease-in-out infinite;
                    }
                    
                    @keyframes diagonalShine {
                      0% {
                        top: -100%;
                        left: -100%;
                      }
                      100% {
                        top: 100%;
                        left: 100%;
                      }
                    }
                  `}</style>
        </div>


    )
}


{/*<div className={styles.winner}   >
            <picture className={styles.winner_picture}>
                <Image className={styles.winner_image} src={participant.image || "/user-icon.png"} alt="Winner" width={100} height={100} />
            </picture>
            <span className={styles.winner_name}>{participant?.name}</span>
            {name_team &&
                <div className={styles.winner_logo}>
                    {TeamsLogos.find(team => team.name === name_team)?.logo || "/user-icon.png"}
                </div>}
            <span className={styles.winner_bet}>{name_bet || name_team}</span>
            <WinnerIcon className={styles.winner_icon} />
            </div>*/}