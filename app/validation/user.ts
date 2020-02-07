
import Joi from '@hapi/joi';
import { PASSWORD_REGEX, POSTCODE_REGEX } from '../lib/constants';
import debug from '../lib/debug';
const log = debug('app/validation/user');

export const userCredentialsSchema = Joi.object().keys({
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required(),
  password: Joi.string()
    .regex(PASSWORD_REGEX)
    .required(),
});

export const userDetailsSchema = Joi.object().keys({
  address: {
    line1: Joi.string().required(),
    line2: Joi.string(),
    postcode: Joi.string().regex(POSTCODE_REGEX),
    town: Joi.string().required(),
  },
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

export function validateCredentials(email, password): boolean {
  const { error } = userCredentialsSchema.validate({ email, password });

  if (!error) {
    return true;
  }

  log.error(error);
}

export function validateUserDetails(user): boolean {
  const { error } = userDetailsSchema.validate(user);

  if (!error) {
    return true;
  }

  log.error(error);
}
