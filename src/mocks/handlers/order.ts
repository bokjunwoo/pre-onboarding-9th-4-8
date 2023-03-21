import { rest } from 'msw';
import { formatDollarToNumber } from '@/lib/utils/formattingHelper';
import { generateStartAndEndDate } from '@/lib/utils/generator';
import mockData from '../storage/mock_data.json';

export const orderListHandlers = [
  rest.get('/mock/order', (req, res, ctx) => {
    const offset = Number(req.url.searchParams.get('offset'));
    const limit = Number(req.url.searchParams.get('limit'));
    const date = req.url.searchParams.get('date');
    const customer = req.url.searchParams.get('customer');

    let copiedMockData = [...mockData];

    if (date) {
      copiedMockData = copiedMockData.filter(
        (item) => item.transaction_time.split(' ')[0] === date,
      );
    }

    if (customer) {
      copiedMockData = copiedMockData.filter(
        (item) => item.customer_name === customer,
      );
    }

    const { startDate, endDate } = generateStartAndEndDate(copiedMockData);

    return res(
      ctx.json({
        order: [...copiedMockData].splice(offset * limit, limit),
        orderInfo: {
          totalCount: copiedMockData.length,
          totalCurrency: copiedMockData.reduce(
            (acc, cur) => acc + formatDollarToNumber(cur.currency),
            0,
          ),
          startDate: startDate || date,
          endDate: endDate || date,
        },
      }),
    );
  }),

  rest.get('/mock/customers', (req, res, ctx) => {
    const customers = [...new Set(mockData.map((item) => item.customer_name))];

    return res(
      ctx.json({
        customers,
      }),
    );
  }),
];
