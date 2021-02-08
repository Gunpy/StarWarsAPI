import {action, makeObservable, observable, toJS} from "mobx";


class StoreGetApi {
    constructor() {
        makeObservable(this)
    }

    @observable  state = []
    @observable pending = true
    @observable worlds = []
    @observable  ready = false
    @observable films = []
    @observable selected = []
    @observable car = []
    @observable parseState = null
    @observable likesPiople = []


    @action getSwapi = async (url) => {
        this.pending = true
        try {
            const response = await fetch(url)
            const parseData = await response.json()
            this.state = parseData.results;
        } catch (e) {
            throw new Error(e)
        }
        this.pending = false
    }
    @action getWorld = async (url) => {
        this.ready = true
        try {
            const response = await fetch(url)
            const parseData = await response.json()
            this.worlds = [...this.worlds, parseData.name];
        } catch (e) {
            throw new Error(e)
        }
        this.ready = false
    }
    @action parseData = () => {
        this.parseState = this.state.map((e, index) => {
            const temp = {...e, home: this.worlds[index], likes: 0, disslike: 0}
            return temp
        })
    }
    @action getFilm = async (url) => {
        try {
            const response = await fetch(url)
            const parseData = await response.json()
            this.films = [...this.films, parseData.title]
            this.selected.film = this.films
        } catch (e) {
            throw new Error(e)
        }
    }
    @action setSelected = (data) => {
        this.selected = data
    }
    @action getCar = async (url) => {
        try {
            const response = await fetch(url)
            const parseData = await response.json()
            this.car = [...this.car, parseData.name]
            this.selected.car = this.car
        } catch (e) {
            throw new Error(e)
        }
    }
    @action addLikes = (name) => {
        this.parseState = this.parseState.map((e) => {
            if (e.name === name) {
                return {...e, likes: e.likes + 1}
            } else {
                return e
            }
        })
        console.log('current', toJS(this.parseState))
    }
    @action getLikesPeople = () => {
        this.likesPiople = this.parseState?.filter((e) => e.likes > 0)
    }
}

export default new StoreGetApi();