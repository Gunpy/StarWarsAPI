import React, {useEffect} from "react"
import AutoCompliteWripper from "./AutoCompliteWripper"
import StoreGetApi from "../Stor/getFromApi"
import {observer} from "mobx-react";

export default observer(() => {
        const {state, pending, getSwapi, getWorld, parseState} = StoreGetApi

        useEffect(() => {
            if (!parseState) {
                getSwapi("https://swapi.dev/api/people")
            }
        }, [])

        useEffect(() => {
            if (!parseState) {
                state?.forEach((e) => {
                    getWorld(e.homeworld)
                })
            }
        }, [pending])


        if (pending) {
            return <p>loading</p>
        }
        return (<>
            <AutoCompliteWripper

            />

        </>)
    }
)

