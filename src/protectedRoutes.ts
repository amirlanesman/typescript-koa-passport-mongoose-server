// import { SwaggerRouter } from 'koa-swagger-decorator';
import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import TransactionController from './controller/transaction';

const protectedRouter = new Router<DefaultState, Context>();

const transactionRouter = new Router<DefaultState, Context>({ prefix: '/transactions' });

transactionRouter.get('/', TransactionController.getTransactions);
transactionRouter.post('/', TransactionController.insertTransaction);
transactionRouter.delete('/:id', TransactionController.deleteTransaction);

protectedRouter.use(transactionRouter.routes()).use(transactionRouter.allowedMethods());

// protectedRouter.put("/users/:id", user.updateUser);
// protectedRouter.delete("/users/:id", user.deleteUser);
// protectedRouter.delete("/testusers", user.deleteTestUsers);

export { protectedRouter };
