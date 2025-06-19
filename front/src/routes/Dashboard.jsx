import { CircleArrowDown, CircleArrowUp } from 'lucide-react'
import React from 'react'
import Card from '../components/Card'

const Dashboard = () => {
    return (
        <>

            <h1 className='text-slate-800 text-4xl mt-1 front-bold'>Ultimos 6 movimientos</h1>

            <ul className="flex flex-col w-full h-full p-5 items-center gap-2">
                <Card type="ingreso" color="emerald" />
                <Card type="egreso" color="rose" />
                <Card type="ingreso" color="emerald" />
                <Card type="egreso" color="rose" />
                <Card type="ingreso" color="emerald" />
                <Card type="egreso" color="rose" />
            </ul>

            <p className='text-emerald-200 text-rose-200'></p>
        </>

    )
}

export default Dashboard