"use client"

import ListProposes from './ListProposes'



export default function PropuestasClient({ data }: { data: Array<any> }) {
    

    return (
        <div className="flex flex-col w-full h-screen overflow-auto">

            <main className="flex-1 h-full">
                <div className="h-full p-6">
                    <ListProposes data={data}></ListProposes>
                </div>
            </main>
        </div>
    )
}