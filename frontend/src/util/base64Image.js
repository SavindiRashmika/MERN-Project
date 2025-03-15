const base64Image = async(image) =>{
    const reader = new FileReader()
    reader.readAsDataURL(image)
    const data = await new Promise((resolve,reject) => {
        reader.onload = () => resolve(reader.result)

        reader.onerror = Error => reject(Error)
    })

    return data
}

export default base64Image