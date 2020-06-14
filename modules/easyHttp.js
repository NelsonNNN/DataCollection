class EasyHttp {

    async get(url){
        const responce = await fetch(url)
        const resData = await responce.json()

        return resData
    }

    async post(url, data){
        const responce = await fetch(url, {
            method: 'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(data)
        })
        const resData = await responce.json()
        return resData
    }

    async put(url, data){
        const responce = await fetch(url, {
            method: 'PUT',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(data)
        })
        const resData = await responce.json()
        return resData
    }

    async delete(url){
        const responce = await fetch(url, {
            method: 'DELETE',
            headers:{'Content-type':'application/json'},
        })
        const resData = await responce.json()
        return resData
    }
}

export const http = new EasyHttp