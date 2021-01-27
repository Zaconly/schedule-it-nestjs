import {
  BaseEntity,
  DeepPartial,
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult
} from "typeorm"

type Criteria<T> = string | string[] | number | number[] | Date | Date[] | FindConditions<T>

export class BaseService<T extends BaseEntity> {
  constructor(private readonly repository: Repository<T>) {}

  async find(conditions: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(conditions)
  }

  async findByIds(ids: string[], conditions: FindManyOptions<T>): Promise<T[]> {
    return this.repository.findByIds(ids, conditions)
  }

  async findAndCount(conditions: FindManyOptions<T>): Promise<[T[], number]> {
    return this.repository.findAndCount(conditions)
  }

  async findOne(conditions: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(conditions)
  }

  async create(entity: DeepPartial<T>): Promise<T> {
    const newUser = this.repository.create(entity)
    await newUser.save()

    return newUser
  }

  async modify(conditions: FindOneOptions<T>, entity: Partial<T>): Promise<T> {
    const currentEntity = await this.repository.findOneOrFail(conditions)

    Object.assign(currentEntity, entity)
    currentEntity.save()

    return currentEntity
  }

  async update(set: DeepPartial<T>, conditions: { where: DeepPartial<T> }): Promise<UpdateResult> {
    return this.repository.createQueryBuilder().update().set(set).where(conditions.where).execute()
  }

  async delete(criteria: Criteria<T>): Promise<DeleteResult> {
    return this.repository.delete(criteria)
  }
}
