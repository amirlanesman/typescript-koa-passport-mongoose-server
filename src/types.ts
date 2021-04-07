import { RouterParamContext } from '@koa/router';
import { Context, DefaultState, ParameterizedContext } from 'koa';

export type RContext = ParameterizedContext<DefaultState, Context & RouterParamContext<DefaultState, Context>>;

// export type RContext = Context & RouterContext;
