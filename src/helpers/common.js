function redirect(hist, params, path) {
    hist.push({ pathname: path, state: params })
}

const obj = { redirect }

export default obj;