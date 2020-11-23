import mongoose from "mongoose"

const oid = mongoose.Types.ObjectId

export const valid_OId = (id) => {
    const isValid = oid.isValid(id)
    return !isValid ? oid(id) : id
}



