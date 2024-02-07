import mongoose from 'mongoose'

async function connect () {
  const uri = process.env.DB_CONNECTION_NOSQL
  return await mongoose.connect(uri)
}

export { connect }
