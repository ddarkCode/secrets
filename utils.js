module.exports =  (function utils(){

    const checkPassword = ({password}) => {
        return new Promise((resolve, reject) => {
            if (password === 'ILoveBacon') {
                resolve(true)
            } else {
                reject(false)
            }
        })
    }
    return {checkPassword}
}())