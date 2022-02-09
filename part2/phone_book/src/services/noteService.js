import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(responce => responce.data)
}

const create = (note) => {
    return axios.post(baseUrl, note).then(responce => responce.data)
}

const update = (id, note) => {
    return axios.put(`${baseUrl}/${id}`, note).then(responce => responce.data)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then(responce => responce.data)
}

export default {getAll, create, update, remove}
