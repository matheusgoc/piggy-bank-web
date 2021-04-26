import { CategoryModel } from '../models/CategoryModel'
import BaseService from './BaseService';

/**
 * CategoriesServiceApi
 * A service to handle the category's persistence at the API web service
 *
 * @extends BaseService
 */
export default class CategoryService extends BaseService {

  // Load the user's categories
  async load(): Promise<CategoryModel[] | undefined> {
    try {

      const res = await this.api.get('categories')
      return res.data.map((item): CategoryModel => {
        return this.mapToStore(item)
      })

    } catch(error) {

      const method = 'CategoriesServiceApi.load'
      const msg = 'Unable to retrieve categories from the server'
      this.handleHttpError(method, msg, error)
    }
  }

  // Search for categories
  async search(search: string): Promise<CategoryModel[] | undefined> {
    try {

      const res = await this.api.get('categories/search/' + search)

      return res.data.map((item): CategoryModel => {
        return this.mapToStore(item)
      })

    } catch(error) {

      const method = 'CategoriesServiceApi.load'
      const msg = 'Unable to retrieve categories from the server'
      this.handleHttpError(method, msg, error)
    }
  }

  // Map category to save it in the server
  private mapToApi(category: CategoryModel): object {
    return {
      id: category.id,
      name: category.name,
    }
  }

  // Map category from the server to a CategoryModel
  private mapToStore(category): CategoryModel {
    return {
      id: category['id'],
      name: category['name'],
      isNew: false,
    }
  }
}