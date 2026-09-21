import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import Countries from './components/countries/Countries'
import  {Suspense}  from 'react'
import Country from './components/Country/Country'

const countriesPromise = fetch(`https://openapi.programming-hero.com/api/all`).then(res => res.json())


function App() {
  

  return (
    <>
    <div>

      <h1> React Part - 2</h1>

    </div>
    <br />
    <br />


    <Suspense fallback="Loading...">
      <Countries countriesPromise={countriesPromise}></Countries> 
    </Suspense>

    {/* <Country></Country> */}

    </>
  )
}

export default App
