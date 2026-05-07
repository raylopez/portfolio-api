import type { EndPointCreateAsync, EndPointUpdateAsync } from '../definitions/endpoints.ts'
import type { SocialItem as SocialSchema } from '../models/schema.ts'
import { SocialItem } from '../database/schema.ts'

export class SocialItemController {
    static create: EndPointCreateAsync<SocialSchema> = async (req, res) => {
        const socialItemCreated = await SocialItem.create(req.body)
        res.status(201).json(socialItemCreated)
    }

    static update: EndPointUpdateAsync<SocialItem> = async (req, res) => {
        const { id } = req.params
        const socialUpdateResult = await SocialItem.update(req.body, { where: { id } })
        const [affectedRows] = socialUpdateResult
        if (affectedRows > 0) {
            res.json({ message: 'Actualizado con éxito' })
            return
        }

        res.status(400).json({ message: 'No se pudo actualizar' })
    }
}