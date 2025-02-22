import { AdminIcon, ArrowUpIcon } from "@/app/svg"
import { Fieldset } from "primereact/fieldset"
import { Checkbox } from "primereact/checkbox"


export function AppConfig() {

    return (
        <div className="flex flex-col gap-2 relative h-[calc(100svh-9rem)]">
            <Fieldset legend="Paginas visibles">
                <div className="flex flex-col gap-2">
                    <label className="flex flex-row gap-2.5 items-center" >
                        <Checkbox checked type="checkbox" />
                        Quinielas
                    </label>
                    <label className="flex flex-row gap-2.5 items-center" >
                        <Checkbox checked type="checkbox" />
                        Finales
                    </label>
                    <label className="flex flex-row gap-2.5 items-center" >
                        <Checkbox checked type="checkbox" />
                        Resultados
                    </label>
                    <label className="flex flex-row gap-2.5 items-center" >
                        <Checkbox checked type="checkbox" />
                        Posiciones
                    </label>
                    <label className="flex flex-row gap-2.5 items-center" >
                        <Checkbox checked type="checkbox" />
                        Estadísticas
                    </label>
                </div>
            </Fieldset>
        </div>
    )
}