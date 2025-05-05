import { sample } from 'effector'
import {
  getNodoorsOfficesByCity,
  getNodoorsOfficesByCityFx,
  makePayment,
  makePaymentFx,
} from '.'

sample({
  clock: getNodoorsOfficesByCity,
  source: {},
  fn: (_, data) => data,
  target: getNodoorsOfficesByCityFx,
})

sample({
  clock: makePayment,
  source: {},
  fn: (_, data) => data,
  target: makePaymentFx,
})
