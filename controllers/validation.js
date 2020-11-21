import Joi from "joi";

const validation = (data, type) => {
    const schema = Joi.object().keys({
        email: Joi.string().email({
            minDomainSegments: 2
        }).required(),
        password: Joi.string().min(2).required(),

    })

if (type === "signin") {
   const extended = schema.keys({
    name: Joi.string().min(2).required(),
   })

   return extended.validateAsync({
       email: data.email,
       name: data.name,
       password: data.password,
   }).catch(error => {
       console.log('object', error) 
   })
}   else {
    return schema.validateAsync(
        {
            email: data.email,
            password: data.password,
        }
    ).catch(error => {
       console.log('error', error)})
}
    
}



export default validation