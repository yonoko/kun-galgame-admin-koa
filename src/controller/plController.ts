import { Context } from 'koa'
import PLService from '@/service/plService'

type SortField = 'time' | 'amount'
type SortOrder = 'asc' | 'desc'

class PLController {
  async createIncome(ctx: Context) {
    const { reason, time, amount } = ctx.request.body

    const timeStamp = parseInt(time)
    await PLService.createIncome(reason, timeStamp, amount)
    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  async createExpenditure(ctx: Context) {
    const { reason, time, amount } = ctx.request.body
    await PLService.createExpenditure(reason, time, amount)
    ctx.body = {
      code: 200,
      message: 'OK',
      data: {},
    }
  }

  async getIncomes(ctx: Context) {
    const page = parseInt(ctx.query.page as string)
    const limit = parseInt(ctx.query.limit as string)
    const sortField = ctx.query.sortField as SortField
    const sortOrder = ctx.query.sortOrder as SortOrder

    const incomes = await PLService.getIncomes(
      page,
      limit,
      sortField,
      sortOrder
    )
    ctx.body = {
      code: 200,
      message: 'OK',
      data: incomes,
    }
  }

  async getExpenditures(ctx: Context) {
    const page = parseInt(ctx.query.page as string)
    const limit = parseInt(ctx.query.limit as string)
    const sortField = ctx.query.sortField as SortField
    const sortOrder = ctx.query.sortOrder as SortOrder

    const expenditures = await PLService.getExpenditures(
      page,
      limit,
      sortField,
      sortOrder
    )
    ctx.body = {
      code: 200,
      message: 'OK',
      data: expenditures,
    }
  }

  async getPLStatement(ctx: Context) {
    const responseData = await PLService.getPLStatement()

    ctx.body = {
      code: 200,
      message: 'OK',
      data: responseData,
    }
  }
}

export default new PLController()
