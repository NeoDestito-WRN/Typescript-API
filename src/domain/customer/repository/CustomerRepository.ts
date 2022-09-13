import { tokens } from '@di/tokens';
import {
  IRepositoryCustomer,
  ICustomer,
} from '@interfaces/domain/customer/repository';
import { IDatabaseClient } from '@interfaces/infrastructure';
import { Collection, Document } from 'mongodb';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CustomerRepository implements IRepositoryCustomer {
  private collection: Collection<Document>;
  constructor(
    @inject(tokens.DatabaseClient)
    private dbClient: IDatabaseClient,
  ) {
    this.collection = dbClient.getInstance().collection('Customer');
  }

  public async create(entity: ICustomer) {
    return await this.collection.insertOne(entity);
  }

  public async read(id: number) {
    return await this.collection.findOne({ _id: id });
  }

  public async readAll() {
    return await this.collection.find().toArray();
  }

  public async update(id: number, newEntity: ICustomer) {
    return await this.collection.updateOne({ _id: id }, newEntity);
  }

  public async delete(id: number) {
    return await this.collection.deleteOne({ _id: id });
  }
}
