import { CircleArrowDown, CircleArrowUp} from 'lucide-react'
import React from 'react'

const Card = ({type, color}) => {
  return (
      <li className="p-2 bg-stone-900 text-white rounded flex justify-between lg:w-5/10">
        <div>
          <p className={`flex text-2xl font-bold text-${color}-400 items-center gap-3`}>
            {type=="ingreso"?(<CircleArrowUp size={35} strokeWidth={3}/>):
            (<CircleArrowDown size={35} strokeWidth={3} />)}
            
            Descripcion
          </p>

          <p className="text-sm text-slate-300">Categoria</p>
        </div>
        <div>
          <p className={`text-xl font-bold text-${color}-400 text-end`}>$1000</p>
          <p className="text-sm">05/06/2025</p>
        </div>
      </li>
  )
}

export default Card;