import { ApiService } from 'services/api.service'
import type { Link } from 'interfaces/link.interface'
import type { CustomResponse } from 'interfaces/response.interface'

export class LinkService extends ApiService {
  private base: string

  constructor() {
    super()
    this.base = '/links'
  }

  public async shorten(linkPayload: Pick<Link, 'alias' | 'target' | 'meta' | 'description'>) {
    return this.http<CustomResponse<Link>>(`${this.base}/shorten`, {
      body: linkPayload,
      method: 'POST',
    })
  }

  public async fetchLinks(offset = 0, limit = 5, search?: string) {
    return this.http<CustomResponse<{ links: Link[]; total: number }>>(`${this.base}`, {
      query: { limit, offset, search },
      method: 'GET',
    })
  }

  public async fetchLink(alias: string) {
    return this.http<CustomResponse<Link>>(`${this.base}/${alias}`, {
      method: 'GET',
    })
  }

  public async redirectProtectedLink(alias: string, useragent: string, password: string) {
    return this.http<CustomResponse<string>>(`${this.base}/redirect/${alias}`, {
      body: { password },
      headers: {
        'user-agent': useragent,
      },
      method: 'POST',
    })
  }

  public async deleteLink(alias: string) {
    return this.http<CustomResponse<Link>>(`${this.base}/${alias}`, {
      method: 'DELETE',
    })
  }
}
