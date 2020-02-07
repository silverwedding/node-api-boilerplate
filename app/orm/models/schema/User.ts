import Model from '../../connection';

export class User extends Model {
  public static tableName = 'users';

  public readonly id: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly password: string;
  public readonly address: {
    line1?: string;
    line2?: string;
    line3?: string;
    town?: string;
    postcode?: string;
    country?: string;
  };
}
