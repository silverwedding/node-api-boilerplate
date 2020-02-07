import Model from '../../connection';

export class User extends Model {
  public static tableName = 'users';

  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;
}
