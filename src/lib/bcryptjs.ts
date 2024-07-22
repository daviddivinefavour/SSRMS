import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const validateStudentPassword = (
  password: string,
  hashedPassword: string
) => compareSync(password, hashedPassword)

export const hashString = (str: string) => hashSync(str, genSaltSync(11))
