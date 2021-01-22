import Joi from "@hapi/joi"

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
  PORT: Joi.number().default(4000),
  DB_TYPE: Joi.string().valid("mysql", "mariadb").default("mysql"),
  DB_HOST: Joi.string().default("localhost"),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().default("root"),
  DB_PASSWORD: Joi.string().default("root"),
  DB_NAME: Joi.string().default("scheduleitdb"),
  DEBUG: Joi.boolean().default("false"),
  ACCESS_TOKEN_SECRET: Joi.string().required()
})
