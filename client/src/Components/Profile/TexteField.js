import { PromiseProvider } from 'mongoose'
import React from 'react'
import { ErrorMessage} from 'formik';


export const TexteField = ({label,name,value,onChange,type,...props}) => {
 
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input 
      id={name}
      name= {name}
      className="inputEdit"
      type={type}
      {...props}

      autoComplete="off"
      onChange={onChange}
      value={value}/>

      <ErrorMessage name={name}/>
    </div>
  )
}