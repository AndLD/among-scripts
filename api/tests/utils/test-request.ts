import supertest, { Response } from 'supertest'
import { Any, HttpMethod } from '../../utils/types'

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080
const url = `http://${host}:${port}`

const server: any = supertest.agent(url)

export async function testRequest(
    {
        method = 'GET',
        route,
        id,
        query,
        body,
        resBody,
        resCode = 200,
        auth
    }: {
        method?: HttpMethod
        route: string
        id?: string | number
        query?: { [key: string]: string }
        body?: Any
        resBody?: Any
        resCode?: number
        auth?: string
    },
    callback?: (res: Response) => void
) {
    const url = `${route}${id ? `/${id}` : ''}${
        query && Object.keys(query).length
            ? `?${Object.keys(query)
                  .map((key) => `${key}=${query[key]}`)
                  .join('&')}`
            : ''
    }`

    const res: supertest.Response = await server[method.toLowerCase()](url)
        .set('Accept', /json/)
        .set('Authorization', auth ? auth : null)
        .send(body)
        .expect(resCode)

    resBody && expect(res.body).toEqual(expect.objectContaining(resBody))

    callback && callback(res)
}
