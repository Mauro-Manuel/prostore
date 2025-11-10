import { neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client'
import ws from 'ws'

// Habilita WebSocket (necessário para ambientes edge/serverless)
neonConfig.webSocketConstructor = ws

const connectionString = `${process.env.DATABASE_URL}`

// Cria o adapter Neon com a connection string
const adapter = new PrismaNeon({
  connectionString,
  // opcionalmente: webSocketConstructor: ws,
})

// Cria o cliente Prisma com o adapter
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString()
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString()
        },
      },
    },
  },
})
