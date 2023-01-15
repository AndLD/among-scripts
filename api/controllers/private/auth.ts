import { FastifyReply, FastifyRequest } from 'fastify'

async function getVerify(req: FastifyRequest, reply: FastifyReply) {
    reply.send()
}

export const authPrivateControllers = {
    getVerify
}
