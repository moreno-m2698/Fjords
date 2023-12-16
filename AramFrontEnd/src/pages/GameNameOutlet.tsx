import React from 'react'
import { Outlet, useParams } from 'react-router-dom'


function GameNameOutlet() {

    const { gameName } = useParams();
    console.log("In gameNameOutlet, gameName: " + gameName)
  return (
    <>
        <div>GameNameOutet</div>
        <Outlet context={{ gameName: gameName }}/>
    </>
  )
}

export default GameNameOutlet