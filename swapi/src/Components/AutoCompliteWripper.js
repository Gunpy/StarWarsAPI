import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import React, {useEffect, useState} from "react";
import StoreGetApi from "../Stor/getFromApi";
import {observer} from "mobx-react";



export default observer(() => {
    const {
        worlds,
        state,
        parseData,
        getFilm,
        selected,
        setSelected,
        getCar,
        parseState,
        addLikes,
        getLikesPeople,
        likesPiople
    } = StoreGetApi;
    const [flag, setFlag] = useState(false)
    const [likeFlag, setLikeFlag] = useState(false)

    useEffect(() => {
        if (state.length === worlds.length) {
            parseData()
        }
    }, [worlds])
    useEffect(() => {
        selected?.films?.forEach((e) => {
            getFilm(e)
        })
        selected?.vehicles?.forEach((e) => {
            getCar(e)
        })
    }, [flag])

    useEffect(() => {
        getLikesPeople()
    }, [likeFlag])

    return (<>
        <div className='motherDiv'>
            <Autocomplete

                id="combo-box-demo"
                getOptionSelected={(a, b) => {
                    if (a.name === b.name) {
                        setFlag(true)
                        setSelected(b)
                    }
                }}
                options={parseState}
                getOptionLabel={(option) => {
                    return `${option.name},${option.gender},${option.home}`
                }}
                style={{width: 300, padding: 100}}
                renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined"/>}
            />
        </div>
        <div className='motherLi'>
            <li>{selected.name}</li>
            <li>{selected.height}</li>
            <li>{selected.mass}</li>
            <li>{selected.hair_color}</li>
            <li>{selected.skin_color}</li>
            <li>{selected.eye_color}</li>
            <li>{selected.birth_year}</li>
            <li>{selected.home}</li>
            <li>{selected.car}</li>
            <li>{selected.film}</li>
        </div>

        <button onClick={() => {
            addLikes(selected.name)
            setLikeFlag(!likeFlag)
        }}>
            Like
        </button>
        {likesPiople && <div>{likesPiople.map((e) => <p>{e.name}</p>)}</div>}
    </>)
})

