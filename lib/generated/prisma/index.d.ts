
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model V2_format
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type V2_format = $Result.DefaultSelection<Prisma.$V2_formatPayload>
/**
 * Model requestlist
 * This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type requestlist = $Result.DefaultSelection<Prisma.$requestlistPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more V2_formats
 * const v2_formats = await prisma.v2_format.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more V2_formats
   * const v2_formats = await prisma.v2_format.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.v2_format`: Exposes CRUD operations for the **V2_format** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more V2_formats
    * const v2_formats = await prisma.v2_format.findMany()
    * ```
    */
  get v2_format(): Prisma.V2_formatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestlist`: Exposes CRUD operations for the **requestlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Requestlists
    * const requestlists = await prisma.requestlist.findMany()
    * ```
    */
  get requestlist(): Prisma.requestlistDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    V2_format: 'V2_format',
    requestlist: 'requestlist'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "v2_format" | "requestlist"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      V2_format: {
        payload: Prisma.$V2_formatPayload<ExtArgs>
        fields: Prisma.V2_formatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.V2_formatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.V2_formatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>
          }
          findFirst: {
            args: Prisma.V2_formatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.V2_formatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>
          }
          findMany: {
            args: Prisma.V2_formatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>[]
          }
          create: {
            args: Prisma.V2_formatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>
          }
          createMany: {
            args: Prisma.V2_formatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.V2_formatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>[]
          }
          delete: {
            args: Prisma.V2_formatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>
          }
          update: {
            args: Prisma.V2_formatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>
          }
          deleteMany: {
            args: Prisma.V2_formatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.V2_formatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.V2_formatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>[]
          }
          upsert: {
            args: Prisma.V2_formatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$V2_formatPayload>
          }
          aggregate: {
            args: Prisma.V2_formatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateV2_format>
          }
          groupBy: {
            args: Prisma.V2_formatGroupByArgs<ExtArgs>
            result: $Utils.Optional<V2_formatGroupByOutputType>[]
          }
          count: {
            args: Prisma.V2_formatCountArgs<ExtArgs>
            result: $Utils.Optional<V2_formatCountAggregateOutputType> | number
          }
        }
      }
      requestlist: {
        payload: Prisma.$requestlistPayload<ExtArgs>
        fields: Prisma.requestlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.requestlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.requestlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>
          }
          findFirst: {
            args: Prisma.requestlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.requestlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>
          }
          findMany: {
            args: Prisma.requestlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>[]
          }
          create: {
            args: Prisma.requestlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>
          }
          createMany: {
            args: Prisma.requestlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.requestlistCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>[]
          }
          delete: {
            args: Prisma.requestlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>
          }
          update: {
            args: Prisma.requestlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>
          }
          deleteMany: {
            args: Prisma.requestlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.requestlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.requestlistUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>[]
          }
          upsert: {
            args: Prisma.requestlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$requestlistPayload>
          }
          aggregate: {
            args: Prisma.RequestlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestlist>
          }
          groupBy: {
            args: Prisma.requestlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestlistGroupByOutputType>[]
          }
          count: {
            args: Prisma.requestlistCountArgs<ExtArgs>
            result: $Utils.Optional<RequestlistCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    v2_format?: V2_formatOmit
    requestlist?: requestlistOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model V2_format
   */

  export type AggregateV2_format = {
    _count: V2_formatCountAggregateOutputType | null
    _avg: V2_formatAvgAggregateOutputType | null
    _sum: V2_formatSumAggregateOutputType | null
    _min: V2_formatMinAggregateOutputType | null
    _max: V2_formatMaxAggregateOutputType | null
  }

  export type V2_formatAvgAggregateOutputType = {
    scraping_likes: number | null
    scraping_comments: number | null
    scraping_shares: number | null
    scraping_ctr: number | null
    scraping_ctr_top: number | null
    scraping_cvr_top: number | null
    system_id: number | null
  }

  export type V2_formatSumAggregateOutputType = {
    scraping_likes: bigint | null
    scraping_comments: bigint | null
    scraping_shares: bigint | null
    scraping_ctr: bigint | null
    scraping_ctr_top: bigint | null
    scraping_cvr_top: bigint | null
    system_id: bigint | null
  }

  export type V2_formatMinAggregateOutputType = {
    system_status: string | null
    search_url: string | null
    scraping_brand: string | null
    scraping_industry: string | null
    scraping_caption: string | null
    scraping_landingpage: string | null
    scraping_likes: bigint | null
    scraping_comments: bigint | null
    scraping_shares: bigint | null
    scraping_ctr: bigint | null
    scraping_budget: string | null
    scraping_ctr_top: bigint | null
    scraping_cvr_top: bigint | null
    system_id: bigint | null
    search_condition: string | null
    video_product_category: string | null
    video_product_details: string | null
    video_target_age: string | null
    video_target_gender: string | null
    video_content_type: string | null
    video_content_summary: string | null
    video_content_music: string | null
    video_content_speed: string | null
    video_target_details: string | null
    system_usable: boolean | null
    video_url: string | null
  }

  export type V2_formatMaxAggregateOutputType = {
    system_status: string | null
    search_url: string | null
    scraping_brand: string | null
    scraping_industry: string | null
    scraping_caption: string | null
    scraping_landingpage: string | null
    scraping_likes: bigint | null
    scraping_comments: bigint | null
    scraping_shares: bigint | null
    scraping_ctr: bigint | null
    scraping_budget: string | null
    scraping_ctr_top: bigint | null
    scraping_cvr_top: bigint | null
    system_id: bigint | null
    search_condition: string | null
    video_product_category: string | null
    video_product_details: string | null
    video_target_age: string | null
    video_target_gender: string | null
    video_content_type: string | null
    video_content_summary: string | null
    video_content_music: string | null
    video_content_speed: string | null
    video_target_details: string | null
    system_usable: boolean | null
    video_url: string | null
  }

  export type V2_formatCountAggregateOutputType = {
    system_status: number
    search_url: number
    scraping_brand: number
    scraping_industry: number
    scraping_caption: number
    scraping_landingpage: number
    scraping_likes: number
    scraping_comments: number
    scraping_shares: number
    scraping_ctr: number
    scraping_budget: number
    scraping_ctr_top: number
    scraping_ctr_sec: number
    scraping_cvr_top: number
    scraping_cvr_sec: number
    system_id: number
    search_condition: number
    video_product_category: number
    video_product_details: number
    video_target_age: number
    video_target_gender: number
    video_content_type: number
    video_content_summary: number
    video_content_music: number
    video_content_speed: number
    video_target_details: number
    system_usable: number
    video_url: number
    _all: number
  }


  export type V2_formatAvgAggregateInputType = {
    scraping_likes?: true
    scraping_comments?: true
    scraping_shares?: true
    scraping_ctr?: true
    scraping_ctr_top?: true
    scraping_cvr_top?: true
    system_id?: true
  }

  export type V2_formatSumAggregateInputType = {
    scraping_likes?: true
    scraping_comments?: true
    scraping_shares?: true
    scraping_ctr?: true
    scraping_ctr_top?: true
    scraping_cvr_top?: true
    system_id?: true
  }

  export type V2_formatMinAggregateInputType = {
    system_status?: true
    search_url?: true
    scraping_brand?: true
    scraping_industry?: true
    scraping_caption?: true
    scraping_landingpage?: true
    scraping_likes?: true
    scraping_comments?: true
    scraping_shares?: true
    scraping_ctr?: true
    scraping_budget?: true
    scraping_ctr_top?: true
    scraping_cvr_top?: true
    system_id?: true
    search_condition?: true
    video_product_category?: true
    video_product_details?: true
    video_target_age?: true
    video_target_gender?: true
    video_content_type?: true
    video_content_summary?: true
    video_content_music?: true
    video_content_speed?: true
    video_target_details?: true
    system_usable?: true
    video_url?: true
  }

  export type V2_formatMaxAggregateInputType = {
    system_status?: true
    search_url?: true
    scraping_brand?: true
    scraping_industry?: true
    scraping_caption?: true
    scraping_landingpage?: true
    scraping_likes?: true
    scraping_comments?: true
    scraping_shares?: true
    scraping_ctr?: true
    scraping_budget?: true
    scraping_ctr_top?: true
    scraping_cvr_top?: true
    system_id?: true
    search_condition?: true
    video_product_category?: true
    video_product_details?: true
    video_target_age?: true
    video_target_gender?: true
    video_content_type?: true
    video_content_summary?: true
    video_content_music?: true
    video_content_speed?: true
    video_target_details?: true
    system_usable?: true
    video_url?: true
  }

  export type V2_formatCountAggregateInputType = {
    system_status?: true
    search_url?: true
    scraping_brand?: true
    scraping_industry?: true
    scraping_caption?: true
    scraping_landingpage?: true
    scraping_likes?: true
    scraping_comments?: true
    scraping_shares?: true
    scraping_ctr?: true
    scraping_budget?: true
    scraping_ctr_top?: true
    scraping_ctr_sec?: true
    scraping_cvr_top?: true
    scraping_cvr_sec?: true
    system_id?: true
    search_condition?: true
    video_product_category?: true
    video_product_details?: true
    video_target_age?: true
    video_target_gender?: true
    video_content_type?: true
    video_content_summary?: true
    video_content_music?: true
    video_content_speed?: true
    video_target_details?: true
    system_usable?: true
    video_url?: true
    _all?: true
  }

  export type V2_formatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which V2_format to aggregate.
     */
    where?: V2_formatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of V2_formats to fetch.
     */
    orderBy?: V2_formatOrderByWithRelationInput | V2_formatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: V2_formatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` V2_formats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` V2_formats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned V2_formats
    **/
    _count?: true | V2_formatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: V2_formatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: V2_formatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: V2_formatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: V2_formatMaxAggregateInputType
  }

  export type GetV2_formatAggregateType<T extends V2_formatAggregateArgs> = {
        [P in keyof T & keyof AggregateV2_format]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateV2_format[P]>
      : GetScalarType<T[P], AggregateV2_format[P]>
  }




  export type V2_formatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: V2_formatWhereInput
    orderBy?: V2_formatOrderByWithAggregationInput | V2_formatOrderByWithAggregationInput[]
    by: V2_formatScalarFieldEnum[] | V2_formatScalarFieldEnum
    having?: V2_formatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: V2_formatCountAggregateInputType | true
    _avg?: V2_formatAvgAggregateInputType
    _sum?: V2_formatSumAggregateInputType
    _min?: V2_formatMinAggregateInputType
    _max?: V2_formatMaxAggregateInputType
  }

  export type V2_formatGroupByOutputType = {
    system_status: string
    search_url: string | null
    scraping_brand: string | null
    scraping_industry: string | null
    scraping_caption: string | null
    scraping_landingpage: string | null
    scraping_likes: bigint | null
    scraping_comments: bigint | null
    scraping_shares: bigint | null
    scraping_ctr: bigint | null
    scraping_budget: string | null
    scraping_ctr_top: bigint | null
    scraping_ctr_sec: JsonValue | null
    scraping_cvr_top: bigint | null
    scraping_cvr_sec: JsonValue | null
    system_id: bigint
    search_condition: string | null
    video_product_category: string | null
    video_product_details: string | null
    video_target_age: string | null
    video_target_gender: string | null
    video_content_type: string | null
    video_content_summary: string | null
    video_content_music: string | null
    video_content_speed: string | null
    video_target_details: string | null
    system_usable: boolean | null
    video_url: string | null
    _count: V2_formatCountAggregateOutputType | null
    _avg: V2_formatAvgAggregateOutputType | null
    _sum: V2_formatSumAggregateOutputType | null
    _min: V2_formatMinAggregateOutputType | null
    _max: V2_formatMaxAggregateOutputType | null
  }

  type GetV2_formatGroupByPayload<T extends V2_formatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<V2_formatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof V2_formatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], V2_formatGroupByOutputType[P]>
            : GetScalarType<T[P], V2_formatGroupByOutputType[P]>
        }
      >
    >


  export type V2_formatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    system_status?: boolean
    search_url?: boolean
    scraping_brand?: boolean
    scraping_industry?: boolean
    scraping_caption?: boolean
    scraping_landingpage?: boolean
    scraping_likes?: boolean
    scraping_comments?: boolean
    scraping_shares?: boolean
    scraping_ctr?: boolean
    scraping_budget?: boolean
    scraping_ctr_top?: boolean
    scraping_ctr_sec?: boolean
    scraping_cvr_top?: boolean
    scraping_cvr_sec?: boolean
    system_id?: boolean
    search_condition?: boolean
    video_product_category?: boolean
    video_product_details?: boolean
    video_target_age?: boolean
    video_target_gender?: boolean
    video_content_type?: boolean
    video_content_summary?: boolean
    video_content_music?: boolean
    video_content_speed?: boolean
    video_target_details?: boolean
    system_usable?: boolean
    video_url?: boolean
  }, ExtArgs["result"]["v2_format"]>

  export type V2_formatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    system_status?: boolean
    search_url?: boolean
    scraping_brand?: boolean
    scraping_industry?: boolean
    scraping_caption?: boolean
    scraping_landingpage?: boolean
    scraping_likes?: boolean
    scraping_comments?: boolean
    scraping_shares?: boolean
    scraping_ctr?: boolean
    scraping_budget?: boolean
    scraping_ctr_top?: boolean
    scraping_ctr_sec?: boolean
    scraping_cvr_top?: boolean
    scraping_cvr_sec?: boolean
    system_id?: boolean
    search_condition?: boolean
    video_product_category?: boolean
    video_product_details?: boolean
    video_target_age?: boolean
    video_target_gender?: boolean
    video_content_type?: boolean
    video_content_summary?: boolean
    video_content_music?: boolean
    video_content_speed?: boolean
    video_target_details?: boolean
    system_usable?: boolean
    video_url?: boolean
  }, ExtArgs["result"]["v2_format"]>

  export type V2_formatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    system_status?: boolean
    search_url?: boolean
    scraping_brand?: boolean
    scraping_industry?: boolean
    scraping_caption?: boolean
    scraping_landingpage?: boolean
    scraping_likes?: boolean
    scraping_comments?: boolean
    scraping_shares?: boolean
    scraping_ctr?: boolean
    scraping_budget?: boolean
    scraping_ctr_top?: boolean
    scraping_ctr_sec?: boolean
    scraping_cvr_top?: boolean
    scraping_cvr_sec?: boolean
    system_id?: boolean
    search_condition?: boolean
    video_product_category?: boolean
    video_product_details?: boolean
    video_target_age?: boolean
    video_target_gender?: boolean
    video_content_type?: boolean
    video_content_summary?: boolean
    video_content_music?: boolean
    video_content_speed?: boolean
    video_target_details?: boolean
    system_usable?: boolean
    video_url?: boolean
  }, ExtArgs["result"]["v2_format"]>

  export type V2_formatSelectScalar = {
    system_status?: boolean
    search_url?: boolean
    scraping_brand?: boolean
    scraping_industry?: boolean
    scraping_caption?: boolean
    scraping_landingpage?: boolean
    scraping_likes?: boolean
    scraping_comments?: boolean
    scraping_shares?: boolean
    scraping_ctr?: boolean
    scraping_budget?: boolean
    scraping_ctr_top?: boolean
    scraping_ctr_sec?: boolean
    scraping_cvr_top?: boolean
    scraping_cvr_sec?: boolean
    system_id?: boolean
    search_condition?: boolean
    video_product_category?: boolean
    video_product_details?: boolean
    video_target_age?: boolean
    video_target_gender?: boolean
    video_content_type?: boolean
    video_content_summary?: boolean
    video_content_music?: boolean
    video_content_speed?: boolean
    video_target_details?: boolean
    system_usable?: boolean
    video_url?: boolean
  }

  export type V2_formatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"system_status" | "search_url" | "scraping_brand" | "scraping_industry" | "scraping_caption" | "scraping_landingpage" | "scraping_likes" | "scraping_comments" | "scraping_shares" | "scraping_ctr" | "scraping_budget" | "scraping_ctr_top" | "scraping_ctr_sec" | "scraping_cvr_top" | "scraping_cvr_sec" | "system_id" | "search_condition" | "video_product_category" | "video_product_details" | "video_target_age" | "video_target_gender" | "video_content_type" | "video_content_summary" | "video_content_music" | "video_content_speed" | "video_target_details" | "system_usable" | "video_url", ExtArgs["result"]["v2_format"]>

  export type $V2_formatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "V2_format"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      system_status: string
      search_url: string | null
      scraping_brand: string | null
      scraping_industry: string | null
      scraping_caption: string | null
      scraping_landingpage: string | null
      scraping_likes: bigint | null
      scraping_comments: bigint | null
      scraping_shares: bigint | null
      scraping_ctr: bigint | null
      scraping_budget: string | null
      scraping_ctr_top: bigint | null
      scraping_ctr_sec: Prisma.JsonValue | null
      scraping_cvr_top: bigint | null
      scraping_cvr_sec: Prisma.JsonValue | null
      system_id: bigint
      search_condition: string | null
      video_product_category: string | null
      video_product_details: string | null
      video_target_age: string | null
      video_target_gender: string | null
      video_content_type: string | null
      video_content_summary: string | null
      video_content_music: string | null
      video_content_speed: string | null
      video_target_details: string | null
      system_usable: boolean | null
      video_url: string | null
    }, ExtArgs["result"]["v2_format"]>
    composites: {}
  }

  type V2_formatGetPayload<S extends boolean | null | undefined | V2_formatDefaultArgs> = $Result.GetResult<Prisma.$V2_formatPayload, S>

  type V2_formatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<V2_formatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: V2_formatCountAggregateInputType | true
    }

  export interface V2_formatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['V2_format'], meta: { name: 'V2_format' } }
    /**
     * Find zero or one V2_format that matches the filter.
     * @param {V2_formatFindUniqueArgs} args - Arguments to find a V2_format
     * @example
     * // Get one V2_format
     * const v2_format = await prisma.v2_format.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends V2_formatFindUniqueArgs>(args: SelectSubset<T, V2_formatFindUniqueArgs<ExtArgs>>): Prisma__V2_formatClient<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one V2_format that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {V2_formatFindUniqueOrThrowArgs} args - Arguments to find a V2_format
     * @example
     * // Get one V2_format
     * const v2_format = await prisma.v2_format.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends V2_formatFindUniqueOrThrowArgs>(args: SelectSubset<T, V2_formatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__V2_formatClient<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first V2_format that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {V2_formatFindFirstArgs} args - Arguments to find a V2_format
     * @example
     * // Get one V2_format
     * const v2_format = await prisma.v2_format.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends V2_formatFindFirstArgs>(args?: SelectSubset<T, V2_formatFindFirstArgs<ExtArgs>>): Prisma__V2_formatClient<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first V2_format that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {V2_formatFindFirstOrThrowArgs} args - Arguments to find a V2_format
     * @example
     * // Get one V2_format
     * const v2_format = await prisma.v2_format.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends V2_formatFindFirstOrThrowArgs>(args?: SelectSubset<T, V2_formatFindFirstOrThrowArgs<ExtArgs>>): Prisma__V2_formatClient<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more V2_formats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {V2_formatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all V2_formats
     * const v2_formats = await prisma.v2_format.findMany()
     * 
     * // Get first 10 V2_formats
     * const v2_formats = await prisma.v2_format.findMany({ take: 10 })
     * 
     * // Only select the `system_status`
     * const v2_formatWithSystem_statusOnly = await prisma.v2_format.findMany({ select: { system_status: true } })
     * 
     */
    findMany<T extends V2_formatFindManyArgs>(args?: SelectSubset<T, V2_formatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a V2_format.
     * @param {V2_formatCreateArgs} args - Arguments to create a V2_format.
     * @example
     * // Create one V2_format
     * const V2_format = await prisma.v2_format.create({
     *   data: {
     *     // ... data to create a V2_format
     *   }
     * })
     * 
     */
    create<T extends V2_formatCreateArgs>(args: SelectSubset<T, V2_formatCreateArgs<ExtArgs>>): Prisma__V2_formatClient<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many V2_formats.
     * @param {V2_formatCreateManyArgs} args - Arguments to create many V2_formats.
     * @example
     * // Create many V2_formats
     * const v2_format = await prisma.v2_format.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends V2_formatCreateManyArgs>(args?: SelectSubset<T, V2_formatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many V2_formats and returns the data saved in the database.
     * @param {V2_formatCreateManyAndReturnArgs} args - Arguments to create many V2_formats.
     * @example
     * // Create many V2_formats
     * const v2_format = await prisma.v2_format.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many V2_formats and only return the `system_status`
     * const v2_formatWithSystem_statusOnly = await prisma.v2_format.createManyAndReturn({
     *   select: { system_status: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends V2_formatCreateManyAndReturnArgs>(args?: SelectSubset<T, V2_formatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a V2_format.
     * @param {V2_formatDeleteArgs} args - Arguments to delete one V2_format.
     * @example
     * // Delete one V2_format
     * const V2_format = await prisma.v2_format.delete({
     *   where: {
     *     // ... filter to delete one V2_format
     *   }
     * })
     * 
     */
    delete<T extends V2_formatDeleteArgs>(args: SelectSubset<T, V2_formatDeleteArgs<ExtArgs>>): Prisma__V2_formatClient<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one V2_format.
     * @param {V2_formatUpdateArgs} args - Arguments to update one V2_format.
     * @example
     * // Update one V2_format
     * const v2_format = await prisma.v2_format.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends V2_formatUpdateArgs>(args: SelectSubset<T, V2_formatUpdateArgs<ExtArgs>>): Prisma__V2_formatClient<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more V2_formats.
     * @param {V2_formatDeleteManyArgs} args - Arguments to filter V2_formats to delete.
     * @example
     * // Delete a few V2_formats
     * const { count } = await prisma.v2_format.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends V2_formatDeleteManyArgs>(args?: SelectSubset<T, V2_formatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more V2_formats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {V2_formatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many V2_formats
     * const v2_format = await prisma.v2_format.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends V2_formatUpdateManyArgs>(args: SelectSubset<T, V2_formatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more V2_formats and returns the data updated in the database.
     * @param {V2_formatUpdateManyAndReturnArgs} args - Arguments to update many V2_formats.
     * @example
     * // Update many V2_formats
     * const v2_format = await prisma.v2_format.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more V2_formats and only return the `system_status`
     * const v2_formatWithSystem_statusOnly = await prisma.v2_format.updateManyAndReturn({
     *   select: { system_status: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends V2_formatUpdateManyAndReturnArgs>(args: SelectSubset<T, V2_formatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one V2_format.
     * @param {V2_formatUpsertArgs} args - Arguments to update or create a V2_format.
     * @example
     * // Update or create a V2_format
     * const v2_format = await prisma.v2_format.upsert({
     *   create: {
     *     // ... data to create a V2_format
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the V2_format we want to update
     *   }
     * })
     */
    upsert<T extends V2_formatUpsertArgs>(args: SelectSubset<T, V2_formatUpsertArgs<ExtArgs>>): Prisma__V2_formatClient<$Result.GetResult<Prisma.$V2_formatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of V2_formats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {V2_formatCountArgs} args - Arguments to filter V2_formats to count.
     * @example
     * // Count the number of V2_formats
     * const count = await prisma.v2_format.count({
     *   where: {
     *     // ... the filter for the V2_formats we want to count
     *   }
     * })
    **/
    count<T extends V2_formatCountArgs>(
      args?: Subset<T, V2_formatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], V2_formatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a V2_format.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {V2_formatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends V2_formatAggregateArgs>(args: Subset<T, V2_formatAggregateArgs>): Prisma.PrismaPromise<GetV2_formatAggregateType<T>>

    /**
     * Group by V2_format.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {V2_formatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends V2_formatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: V2_formatGroupByArgs['orderBy'] }
        : { orderBy?: V2_formatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, V2_formatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetV2_formatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the V2_format model
   */
  readonly fields: V2_formatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for V2_format.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__V2_formatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the V2_format model
   */
  interface V2_formatFieldRefs {
    readonly system_status: FieldRef<"V2_format", 'String'>
    readonly search_url: FieldRef<"V2_format", 'String'>
    readonly scraping_brand: FieldRef<"V2_format", 'String'>
    readonly scraping_industry: FieldRef<"V2_format", 'String'>
    readonly scraping_caption: FieldRef<"V2_format", 'String'>
    readonly scraping_landingpage: FieldRef<"V2_format", 'String'>
    readonly scraping_likes: FieldRef<"V2_format", 'BigInt'>
    readonly scraping_comments: FieldRef<"V2_format", 'BigInt'>
    readonly scraping_shares: FieldRef<"V2_format", 'BigInt'>
    readonly scraping_ctr: FieldRef<"V2_format", 'BigInt'>
    readonly scraping_budget: FieldRef<"V2_format", 'String'>
    readonly scraping_ctr_top: FieldRef<"V2_format", 'BigInt'>
    readonly scraping_ctr_sec: FieldRef<"V2_format", 'Json'>
    readonly scraping_cvr_top: FieldRef<"V2_format", 'BigInt'>
    readonly scraping_cvr_sec: FieldRef<"V2_format", 'Json'>
    readonly system_id: FieldRef<"V2_format", 'BigInt'>
    readonly search_condition: FieldRef<"V2_format", 'String'>
    readonly video_product_category: FieldRef<"V2_format", 'String'>
    readonly video_product_details: FieldRef<"V2_format", 'String'>
    readonly video_target_age: FieldRef<"V2_format", 'String'>
    readonly video_target_gender: FieldRef<"V2_format", 'String'>
    readonly video_content_type: FieldRef<"V2_format", 'String'>
    readonly video_content_summary: FieldRef<"V2_format", 'String'>
    readonly video_content_music: FieldRef<"V2_format", 'String'>
    readonly video_content_speed: FieldRef<"V2_format", 'String'>
    readonly video_target_details: FieldRef<"V2_format", 'String'>
    readonly system_usable: FieldRef<"V2_format", 'Boolean'>
    readonly video_url: FieldRef<"V2_format", 'String'>
  }
    

  // Custom InputTypes
  /**
   * V2_format findUnique
   */
  export type V2_formatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * Filter, which V2_format to fetch.
     */
    where: V2_formatWhereUniqueInput
  }

  /**
   * V2_format findUniqueOrThrow
   */
  export type V2_formatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * Filter, which V2_format to fetch.
     */
    where: V2_formatWhereUniqueInput
  }

  /**
   * V2_format findFirst
   */
  export type V2_formatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * Filter, which V2_format to fetch.
     */
    where?: V2_formatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of V2_formats to fetch.
     */
    orderBy?: V2_formatOrderByWithRelationInput | V2_formatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for V2_formats.
     */
    cursor?: V2_formatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` V2_formats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` V2_formats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of V2_formats.
     */
    distinct?: V2_formatScalarFieldEnum | V2_formatScalarFieldEnum[]
  }

  /**
   * V2_format findFirstOrThrow
   */
  export type V2_formatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * Filter, which V2_format to fetch.
     */
    where?: V2_formatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of V2_formats to fetch.
     */
    orderBy?: V2_formatOrderByWithRelationInput | V2_formatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for V2_formats.
     */
    cursor?: V2_formatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` V2_formats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` V2_formats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of V2_formats.
     */
    distinct?: V2_formatScalarFieldEnum | V2_formatScalarFieldEnum[]
  }

  /**
   * V2_format findMany
   */
  export type V2_formatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * Filter, which V2_formats to fetch.
     */
    where?: V2_formatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of V2_formats to fetch.
     */
    orderBy?: V2_formatOrderByWithRelationInput | V2_formatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing V2_formats.
     */
    cursor?: V2_formatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` V2_formats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` V2_formats.
     */
    skip?: number
    distinct?: V2_formatScalarFieldEnum | V2_formatScalarFieldEnum[]
  }

  /**
   * V2_format create
   */
  export type V2_formatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * The data needed to create a V2_format.
     */
    data?: XOR<V2_formatCreateInput, V2_formatUncheckedCreateInput>
  }

  /**
   * V2_format createMany
   */
  export type V2_formatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many V2_formats.
     */
    data: V2_formatCreateManyInput | V2_formatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * V2_format createManyAndReturn
   */
  export type V2_formatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * The data used to create many V2_formats.
     */
    data: V2_formatCreateManyInput | V2_formatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * V2_format update
   */
  export type V2_formatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * The data needed to update a V2_format.
     */
    data: XOR<V2_formatUpdateInput, V2_formatUncheckedUpdateInput>
    /**
     * Choose, which V2_format to update.
     */
    where: V2_formatWhereUniqueInput
  }

  /**
   * V2_format updateMany
   */
  export type V2_formatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update V2_formats.
     */
    data: XOR<V2_formatUpdateManyMutationInput, V2_formatUncheckedUpdateManyInput>
    /**
     * Filter which V2_formats to update
     */
    where?: V2_formatWhereInput
    /**
     * Limit how many V2_formats to update.
     */
    limit?: number
  }

  /**
   * V2_format updateManyAndReturn
   */
  export type V2_formatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * The data used to update V2_formats.
     */
    data: XOR<V2_formatUpdateManyMutationInput, V2_formatUncheckedUpdateManyInput>
    /**
     * Filter which V2_formats to update
     */
    where?: V2_formatWhereInput
    /**
     * Limit how many V2_formats to update.
     */
    limit?: number
  }

  /**
   * V2_format upsert
   */
  export type V2_formatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * The filter to search for the V2_format to update in case it exists.
     */
    where: V2_formatWhereUniqueInput
    /**
     * In case the V2_format found by the `where` argument doesn't exist, create a new V2_format with this data.
     */
    create: XOR<V2_formatCreateInput, V2_formatUncheckedCreateInput>
    /**
     * In case the V2_format was found with the provided `where` argument, update it with this data.
     */
    update: XOR<V2_formatUpdateInput, V2_formatUncheckedUpdateInput>
  }

  /**
   * V2_format delete
   */
  export type V2_formatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
    /**
     * Filter which V2_format to delete.
     */
    where: V2_formatWhereUniqueInput
  }

  /**
   * V2_format deleteMany
   */
  export type V2_formatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which V2_formats to delete
     */
    where?: V2_formatWhereInput
    /**
     * Limit how many V2_formats to delete.
     */
    limit?: number
  }

  /**
   * V2_format without action
   */
  export type V2_formatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the V2_format
     */
    select?: V2_formatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the V2_format
     */
    omit?: V2_formatOmit<ExtArgs> | null
  }


  /**
   * Model requestlist
   */

  export type AggregateRequestlist = {
    _count: RequestlistCountAggregateOutputType | null
    _avg: RequestlistAvgAggregateOutputType | null
    _sum: RequestlistSumAggregateOutputType | null
    _min: RequestlistMinAggregateOutputType | null
    _max: RequestlistMaxAggregateOutputType | null
  }

  export type RequestlistAvgAggregateOutputType = {
    id: number | null
  }

  export type RequestlistSumAggregateOutputType = {
    id: bigint | null
  }

  export type RequestlistMinAggregateOutputType = {
    id: bigint | null
    created_at: Date | null
    name: string | null
    company_name: string | null
    email: string | null
    tiktok_url: string | null
  }

  export type RequestlistMaxAggregateOutputType = {
    id: bigint | null
    created_at: Date | null
    name: string | null
    company_name: string | null
    email: string | null
    tiktok_url: string | null
  }

  export type RequestlistCountAggregateOutputType = {
    id: number
    created_at: number
    name: number
    company_name: number
    email: number
    tiktok_url: number
    _all: number
  }


  export type RequestlistAvgAggregateInputType = {
    id?: true
  }

  export type RequestlistSumAggregateInputType = {
    id?: true
  }

  export type RequestlistMinAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    company_name?: true
    email?: true
    tiktok_url?: true
  }

  export type RequestlistMaxAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    company_name?: true
    email?: true
    tiktok_url?: true
  }

  export type RequestlistCountAggregateInputType = {
    id?: true
    created_at?: true
    name?: true
    company_name?: true
    email?: true
    tiktok_url?: true
    _all?: true
  }

  export type RequestlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which requestlist to aggregate.
     */
    where?: requestlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of requestlists to fetch.
     */
    orderBy?: requestlistOrderByWithRelationInput | requestlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: requestlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` requestlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` requestlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned requestlists
    **/
    _count?: true | RequestlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestlistAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestlistSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestlistMaxAggregateInputType
  }

  export type GetRequestlistAggregateType<T extends RequestlistAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestlist[P]>
      : GetScalarType<T[P], AggregateRequestlist[P]>
  }




  export type requestlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: requestlistWhereInput
    orderBy?: requestlistOrderByWithAggregationInput | requestlistOrderByWithAggregationInput[]
    by: RequestlistScalarFieldEnum[] | RequestlistScalarFieldEnum
    having?: requestlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestlistCountAggregateInputType | true
    _avg?: RequestlistAvgAggregateInputType
    _sum?: RequestlistSumAggregateInputType
    _min?: RequestlistMinAggregateInputType
    _max?: RequestlistMaxAggregateInputType
  }

  export type RequestlistGroupByOutputType = {
    id: bigint
    created_at: Date
    name: string | null
    company_name: string | null
    email: string | null
    tiktok_url: string | null
    _count: RequestlistCountAggregateOutputType | null
    _avg: RequestlistAvgAggregateOutputType | null
    _sum: RequestlistSumAggregateOutputType | null
    _min: RequestlistMinAggregateOutputType | null
    _max: RequestlistMaxAggregateOutputType | null
  }

  type GetRequestlistGroupByPayload<T extends requestlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestlistGroupByOutputType[P]>
            : GetScalarType<T[P], RequestlistGroupByOutputType[P]>
        }
      >
    >


  export type requestlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    company_name?: boolean
    email?: boolean
    tiktok_url?: boolean
  }, ExtArgs["result"]["requestlist"]>

  export type requestlistSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    company_name?: boolean
    email?: boolean
    tiktok_url?: boolean
  }, ExtArgs["result"]["requestlist"]>

  export type requestlistSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    name?: boolean
    company_name?: boolean
    email?: boolean
    tiktok_url?: boolean
  }, ExtArgs["result"]["requestlist"]>

  export type requestlistSelectScalar = {
    id?: boolean
    created_at?: boolean
    name?: boolean
    company_name?: boolean
    email?: boolean
    tiktok_url?: boolean
  }

  export type requestlistOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "name" | "company_name" | "email" | "tiktok_url", ExtArgs["result"]["requestlist"]>

  export type $requestlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "requestlist"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      created_at: Date
      name: string | null
      company_name: string | null
      email: string | null
      tiktok_url: string | null
    }, ExtArgs["result"]["requestlist"]>
    composites: {}
  }

  type requestlistGetPayload<S extends boolean | null | undefined | requestlistDefaultArgs> = $Result.GetResult<Prisma.$requestlistPayload, S>

  type requestlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<requestlistFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestlistCountAggregateInputType | true
    }

  export interface requestlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['requestlist'], meta: { name: 'requestlist' } }
    /**
     * Find zero or one Requestlist that matches the filter.
     * @param {requestlistFindUniqueArgs} args - Arguments to find a Requestlist
     * @example
     * // Get one Requestlist
     * const requestlist = await prisma.requestlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends requestlistFindUniqueArgs>(args: SelectSubset<T, requestlistFindUniqueArgs<ExtArgs>>): Prisma__requestlistClient<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Requestlist that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {requestlistFindUniqueOrThrowArgs} args - Arguments to find a Requestlist
     * @example
     * // Get one Requestlist
     * const requestlist = await prisma.requestlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends requestlistFindUniqueOrThrowArgs>(args: SelectSubset<T, requestlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__requestlistClient<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Requestlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {requestlistFindFirstArgs} args - Arguments to find a Requestlist
     * @example
     * // Get one Requestlist
     * const requestlist = await prisma.requestlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends requestlistFindFirstArgs>(args?: SelectSubset<T, requestlistFindFirstArgs<ExtArgs>>): Prisma__requestlistClient<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Requestlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {requestlistFindFirstOrThrowArgs} args - Arguments to find a Requestlist
     * @example
     * // Get one Requestlist
     * const requestlist = await prisma.requestlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends requestlistFindFirstOrThrowArgs>(args?: SelectSubset<T, requestlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__requestlistClient<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Requestlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {requestlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Requestlists
     * const requestlists = await prisma.requestlist.findMany()
     * 
     * // Get first 10 Requestlists
     * const requestlists = await prisma.requestlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestlistWithIdOnly = await prisma.requestlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends requestlistFindManyArgs>(args?: SelectSubset<T, requestlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Requestlist.
     * @param {requestlistCreateArgs} args - Arguments to create a Requestlist.
     * @example
     * // Create one Requestlist
     * const Requestlist = await prisma.requestlist.create({
     *   data: {
     *     // ... data to create a Requestlist
     *   }
     * })
     * 
     */
    create<T extends requestlistCreateArgs>(args: SelectSubset<T, requestlistCreateArgs<ExtArgs>>): Prisma__requestlistClient<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Requestlists.
     * @param {requestlistCreateManyArgs} args - Arguments to create many Requestlists.
     * @example
     * // Create many Requestlists
     * const requestlist = await prisma.requestlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends requestlistCreateManyArgs>(args?: SelectSubset<T, requestlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Requestlists and returns the data saved in the database.
     * @param {requestlistCreateManyAndReturnArgs} args - Arguments to create many Requestlists.
     * @example
     * // Create many Requestlists
     * const requestlist = await prisma.requestlist.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Requestlists and only return the `id`
     * const requestlistWithIdOnly = await prisma.requestlist.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends requestlistCreateManyAndReturnArgs>(args?: SelectSubset<T, requestlistCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Requestlist.
     * @param {requestlistDeleteArgs} args - Arguments to delete one Requestlist.
     * @example
     * // Delete one Requestlist
     * const Requestlist = await prisma.requestlist.delete({
     *   where: {
     *     // ... filter to delete one Requestlist
     *   }
     * })
     * 
     */
    delete<T extends requestlistDeleteArgs>(args: SelectSubset<T, requestlistDeleteArgs<ExtArgs>>): Prisma__requestlistClient<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Requestlist.
     * @param {requestlistUpdateArgs} args - Arguments to update one Requestlist.
     * @example
     * // Update one Requestlist
     * const requestlist = await prisma.requestlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends requestlistUpdateArgs>(args: SelectSubset<T, requestlistUpdateArgs<ExtArgs>>): Prisma__requestlistClient<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Requestlists.
     * @param {requestlistDeleteManyArgs} args - Arguments to filter Requestlists to delete.
     * @example
     * // Delete a few Requestlists
     * const { count } = await prisma.requestlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends requestlistDeleteManyArgs>(args?: SelectSubset<T, requestlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Requestlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {requestlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Requestlists
     * const requestlist = await prisma.requestlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends requestlistUpdateManyArgs>(args: SelectSubset<T, requestlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Requestlists and returns the data updated in the database.
     * @param {requestlistUpdateManyAndReturnArgs} args - Arguments to update many Requestlists.
     * @example
     * // Update many Requestlists
     * const requestlist = await prisma.requestlist.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Requestlists and only return the `id`
     * const requestlistWithIdOnly = await prisma.requestlist.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends requestlistUpdateManyAndReturnArgs>(args: SelectSubset<T, requestlistUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Requestlist.
     * @param {requestlistUpsertArgs} args - Arguments to update or create a Requestlist.
     * @example
     * // Update or create a Requestlist
     * const requestlist = await prisma.requestlist.upsert({
     *   create: {
     *     // ... data to create a Requestlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Requestlist we want to update
     *   }
     * })
     */
    upsert<T extends requestlistUpsertArgs>(args: SelectSubset<T, requestlistUpsertArgs<ExtArgs>>): Prisma__requestlistClient<$Result.GetResult<Prisma.$requestlistPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Requestlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {requestlistCountArgs} args - Arguments to filter Requestlists to count.
     * @example
     * // Count the number of Requestlists
     * const count = await prisma.requestlist.count({
     *   where: {
     *     // ... the filter for the Requestlists we want to count
     *   }
     * })
    **/
    count<T extends requestlistCountArgs>(
      args?: Subset<T, requestlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Requestlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RequestlistAggregateArgs>(args: Subset<T, RequestlistAggregateArgs>): Prisma.PrismaPromise<GetRequestlistAggregateType<T>>

    /**
     * Group by Requestlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {requestlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends requestlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: requestlistGroupByArgs['orderBy'] }
        : { orderBy?: requestlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, requestlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the requestlist model
   */
  readonly fields: requestlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for requestlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__requestlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the requestlist model
   */
  interface requestlistFieldRefs {
    readonly id: FieldRef<"requestlist", 'BigInt'>
    readonly created_at: FieldRef<"requestlist", 'DateTime'>
    readonly name: FieldRef<"requestlist", 'String'>
    readonly company_name: FieldRef<"requestlist", 'String'>
    readonly email: FieldRef<"requestlist", 'String'>
    readonly tiktok_url: FieldRef<"requestlist", 'String'>
  }
    

  // Custom InputTypes
  /**
   * requestlist findUnique
   */
  export type requestlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * Filter, which requestlist to fetch.
     */
    where: requestlistWhereUniqueInput
  }

  /**
   * requestlist findUniqueOrThrow
   */
  export type requestlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * Filter, which requestlist to fetch.
     */
    where: requestlistWhereUniqueInput
  }

  /**
   * requestlist findFirst
   */
  export type requestlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * Filter, which requestlist to fetch.
     */
    where?: requestlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of requestlists to fetch.
     */
    orderBy?: requestlistOrderByWithRelationInput | requestlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for requestlists.
     */
    cursor?: requestlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` requestlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` requestlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of requestlists.
     */
    distinct?: RequestlistScalarFieldEnum | RequestlistScalarFieldEnum[]
  }

  /**
   * requestlist findFirstOrThrow
   */
  export type requestlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * Filter, which requestlist to fetch.
     */
    where?: requestlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of requestlists to fetch.
     */
    orderBy?: requestlistOrderByWithRelationInput | requestlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for requestlists.
     */
    cursor?: requestlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` requestlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` requestlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of requestlists.
     */
    distinct?: RequestlistScalarFieldEnum | RequestlistScalarFieldEnum[]
  }

  /**
   * requestlist findMany
   */
  export type requestlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * Filter, which requestlists to fetch.
     */
    where?: requestlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of requestlists to fetch.
     */
    orderBy?: requestlistOrderByWithRelationInput | requestlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing requestlists.
     */
    cursor?: requestlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` requestlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` requestlists.
     */
    skip?: number
    distinct?: RequestlistScalarFieldEnum | RequestlistScalarFieldEnum[]
  }

  /**
   * requestlist create
   */
  export type requestlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * The data needed to create a requestlist.
     */
    data?: XOR<requestlistCreateInput, requestlistUncheckedCreateInput>
  }

  /**
   * requestlist createMany
   */
  export type requestlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many requestlists.
     */
    data: requestlistCreateManyInput | requestlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * requestlist createManyAndReturn
   */
  export type requestlistCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * The data used to create many requestlists.
     */
    data: requestlistCreateManyInput | requestlistCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * requestlist update
   */
  export type requestlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * The data needed to update a requestlist.
     */
    data: XOR<requestlistUpdateInput, requestlistUncheckedUpdateInput>
    /**
     * Choose, which requestlist to update.
     */
    where: requestlistWhereUniqueInput
  }

  /**
   * requestlist updateMany
   */
  export type requestlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update requestlists.
     */
    data: XOR<requestlistUpdateManyMutationInput, requestlistUncheckedUpdateManyInput>
    /**
     * Filter which requestlists to update
     */
    where?: requestlistWhereInput
    /**
     * Limit how many requestlists to update.
     */
    limit?: number
  }

  /**
   * requestlist updateManyAndReturn
   */
  export type requestlistUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * The data used to update requestlists.
     */
    data: XOR<requestlistUpdateManyMutationInput, requestlistUncheckedUpdateManyInput>
    /**
     * Filter which requestlists to update
     */
    where?: requestlistWhereInput
    /**
     * Limit how many requestlists to update.
     */
    limit?: number
  }

  /**
   * requestlist upsert
   */
  export type requestlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * The filter to search for the requestlist to update in case it exists.
     */
    where: requestlistWhereUniqueInput
    /**
     * In case the requestlist found by the `where` argument doesn't exist, create a new requestlist with this data.
     */
    create: XOR<requestlistCreateInput, requestlistUncheckedCreateInput>
    /**
     * In case the requestlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<requestlistUpdateInput, requestlistUncheckedUpdateInput>
  }

  /**
   * requestlist delete
   */
  export type requestlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
    /**
     * Filter which requestlist to delete.
     */
    where: requestlistWhereUniqueInput
  }

  /**
   * requestlist deleteMany
   */
  export type requestlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which requestlists to delete
     */
    where?: requestlistWhereInput
    /**
     * Limit how many requestlists to delete.
     */
    limit?: number
  }

  /**
   * requestlist without action
   */
  export type requestlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the requestlist
     */
    select?: requestlistSelect<ExtArgs> | null
    /**
     * Omit specific fields from the requestlist
     */
    omit?: requestlistOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const V2_formatScalarFieldEnum: {
    system_status: 'system_status',
    search_url: 'search_url',
    scraping_brand: 'scraping_brand',
    scraping_industry: 'scraping_industry',
    scraping_caption: 'scraping_caption',
    scraping_landingpage: 'scraping_landingpage',
    scraping_likes: 'scraping_likes',
    scraping_comments: 'scraping_comments',
    scraping_shares: 'scraping_shares',
    scraping_ctr: 'scraping_ctr',
    scraping_budget: 'scraping_budget',
    scraping_ctr_top: 'scraping_ctr_top',
    scraping_ctr_sec: 'scraping_ctr_sec',
    scraping_cvr_top: 'scraping_cvr_top',
    scraping_cvr_sec: 'scraping_cvr_sec',
    system_id: 'system_id',
    search_condition: 'search_condition',
    video_product_category: 'video_product_category',
    video_product_details: 'video_product_details',
    video_target_age: 'video_target_age',
    video_target_gender: 'video_target_gender',
    video_content_type: 'video_content_type',
    video_content_summary: 'video_content_summary',
    video_content_music: 'video_content_music',
    video_content_speed: 'video_content_speed',
    video_target_details: 'video_target_details',
    system_usable: 'system_usable',
    video_url: 'video_url'
  };

  export type V2_formatScalarFieldEnum = (typeof V2_formatScalarFieldEnum)[keyof typeof V2_formatScalarFieldEnum]


  export const RequestlistScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    name: 'name',
    company_name: 'company_name',
    email: 'email',
    tiktok_url: 'tiktok_url'
  };

  export type RequestlistScalarFieldEnum = (typeof RequestlistScalarFieldEnum)[keyof typeof RequestlistScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type V2_formatWhereInput = {
    AND?: V2_formatWhereInput | V2_formatWhereInput[]
    OR?: V2_formatWhereInput[]
    NOT?: V2_formatWhereInput | V2_formatWhereInput[]
    system_status?: StringFilter<"V2_format"> | string
    search_url?: StringNullableFilter<"V2_format"> | string | null
    scraping_brand?: StringNullableFilter<"V2_format"> | string | null
    scraping_industry?: StringNullableFilter<"V2_format"> | string | null
    scraping_caption?: StringNullableFilter<"V2_format"> | string | null
    scraping_landingpage?: StringNullableFilter<"V2_format"> | string | null
    scraping_likes?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_comments?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_shares?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_ctr?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_budget?: StringNullableFilter<"V2_format"> | string | null
    scraping_ctr_top?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_ctr_sec?: JsonNullableFilter<"V2_format">
    scraping_cvr_top?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_cvr_sec?: JsonNullableFilter<"V2_format">
    system_id?: BigIntFilter<"V2_format"> | bigint | number
    search_condition?: StringNullableFilter<"V2_format"> | string | null
    video_product_category?: StringNullableFilter<"V2_format"> | string | null
    video_product_details?: StringNullableFilter<"V2_format"> | string | null
    video_target_age?: StringNullableFilter<"V2_format"> | string | null
    video_target_gender?: StringNullableFilter<"V2_format"> | string | null
    video_content_type?: StringNullableFilter<"V2_format"> | string | null
    video_content_summary?: StringNullableFilter<"V2_format"> | string | null
    video_content_music?: StringNullableFilter<"V2_format"> | string | null
    video_content_speed?: StringNullableFilter<"V2_format"> | string | null
    video_target_details?: StringNullableFilter<"V2_format"> | string | null
    system_usable?: BoolNullableFilter<"V2_format"> | boolean | null
    video_url?: StringNullableFilter<"V2_format"> | string | null
  }

  export type V2_formatOrderByWithRelationInput = {
    system_status?: SortOrder
    search_url?: SortOrderInput | SortOrder
    scraping_brand?: SortOrderInput | SortOrder
    scraping_industry?: SortOrderInput | SortOrder
    scraping_caption?: SortOrderInput | SortOrder
    scraping_landingpage?: SortOrderInput | SortOrder
    scraping_likes?: SortOrderInput | SortOrder
    scraping_comments?: SortOrderInput | SortOrder
    scraping_shares?: SortOrderInput | SortOrder
    scraping_ctr?: SortOrderInput | SortOrder
    scraping_budget?: SortOrderInput | SortOrder
    scraping_ctr_top?: SortOrderInput | SortOrder
    scraping_ctr_sec?: SortOrderInput | SortOrder
    scraping_cvr_top?: SortOrderInput | SortOrder
    scraping_cvr_sec?: SortOrderInput | SortOrder
    system_id?: SortOrder
    search_condition?: SortOrderInput | SortOrder
    video_product_category?: SortOrderInput | SortOrder
    video_product_details?: SortOrderInput | SortOrder
    video_target_age?: SortOrderInput | SortOrder
    video_target_gender?: SortOrderInput | SortOrder
    video_content_type?: SortOrderInput | SortOrder
    video_content_summary?: SortOrderInput | SortOrder
    video_content_music?: SortOrderInput | SortOrder
    video_content_speed?: SortOrderInput | SortOrder
    video_target_details?: SortOrderInput | SortOrder
    system_usable?: SortOrderInput | SortOrder
    video_url?: SortOrderInput | SortOrder
  }

  export type V2_formatWhereUniqueInput = Prisma.AtLeast<{
    system_id?: bigint | number
    AND?: V2_formatWhereInput | V2_formatWhereInput[]
    OR?: V2_formatWhereInput[]
    NOT?: V2_formatWhereInput | V2_formatWhereInput[]
    system_status?: StringFilter<"V2_format"> | string
    search_url?: StringNullableFilter<"V2_format"> | string | null
    scraping_brand?: StringNullableFilter<"V2_format"> | string | null
    scraping_industry?: StringNullableFilter<"V2_format"> | string | null
    scraping_caption?: StringNullableFilter<"V2_format"> | string | null
    scraping_landingpage?: StringNullableFilter<"V2_format"> | string | null
    scraping_likes?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_comments?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_shares?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_ctr?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_budget?: StringNullableFilter<"V2_format"> | string | null
    scraping_ctr_top?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_ctr_sec?: JsonNullableFilter<"V2_format">
    scraping_cvr_top?: BigIntNullableFilter<"V2_format"> | bigint | number | null
    scraping_cvr_sec?: JsonNullableFilter<"V2_format">
    search_condition?: StringNullableFilter<"V2_format"> | string | null
    video_product_category?: StringNullableFilter<"V2_format"> | string | null
    video_product_details?: StringNullableFilter<"V2_format"> | string | null
    video_target_age?: StringNullableFilter<"V2_format"> | string | null
    video_target_gender?: StringNullableFilter<"V2_format"> | string | null
    video_content_type?: StringNullableFilter<"V2_format"> | string | null
    video_content_summary?: StringNullableFilter<"V2_format"> | string | null
    video_content_music?: StringNullableFilter<"V2_format"> | string | null
    video_content_speed?: StringNullableFilter<"V2_format"> | string | null
    video_target_details?: StringNullableFilter<"V2_format"> | string | null
    system_usable?: BoolNullableFilter<"V2_format"> | boolean | null
    video_url?: StringNullableFilter<"V2_format"> | string | null
  }, "system_id">

  export type V2_formatOrderByWithAggregationInput = {
    system_status?: SortOrder
    search_url?: SortOrderInput | SortOrder
    scraping_brand?: SortOrderInput | SortOrder
    scraping_industry?: SortOrderInput | SortOrder
    scraping_caption?: SortOrderInput | SortOrder
    scraping_landingpage?: SortOrderInput | SortOrder
    scraping_likes?: SortOrderInput | SortOrder
    scraping_comments?: SortOrderInput | SortOrder
    scraping_shares?: SortOrderInput | SortOrder
    scraping_ctr?: SortOrderInput | SortOrder
    scraping_budget?: SortOrderInput | SortOrder
    scraping_ctr_top?: SortOrderInput | SortOrder
    scraping_ctr_sec?: SortOrderInput | SortOrder
    scraping_cvr_top?: SortOrderInput | SortOrder
    scraping_cvr_sec?: SortOrderInput | SortOrder
    system_id?: SortOrder
    search_condition?: SortOrderInput | SortOrder
    video_product_category?: SortOrderInput | SortOrder
    video_product_details?: SortOrderInput | SortOrder
    video_target_age?: SortOrderInput | SortOrder
    video_target_gender?: SortOrderInput | SortOrder
    video_content_type?: SortOrderInput | SortOrder
    video_content_summary?: SortOrderInput | SortOrder
    video_content_music?: SortOrderInput | SortOrder
    video_content_speed?: SortOrderInput | SortOrder
    video_target_details?: SortOrderInput | SortOrder
    system_usable?: SortOrderInput | SortOrder
    video_url?: SortOrderInput | SortOrder
    _count?: V2_formatCountOrderByAggregateInput
    _avg?: V2_formatAvgOrderByAggregateInput
    _max?: V2_formatMaxOrderByAggregateInput
    _min?: V2_formatMinOrderByAggregateInput
    _sum?: V2_formatSumOrderByAggregateInput
  }

  export type V2_formatScalarWhereWithAggregatesInput = {
    AND?: V2_formatScalarWhereWithAggregatesInput | V2_formatScalarWhereWithAggregatesInput[]
    OR?: V2_formatScalarWhereWithAggregatesInput[]
    NOT?: V2_formatScalarWhereWithAggregatesInput | V2_formatScalarWhereWithAggregatesInput[]
    system_status?: StringWithAggregatesFilter<"V2_format"> | string
    search_url?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    scraping_brand?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    scraping_industry?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    scraping_caption?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    scraping_landingpage?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    scraping_likes?: BigIntNullableWithAggregatesFilter<"V2_format"> | bigint | number | null
    scraping_comments?: BigIntNullableWithAggregatesFilter<"V2_format"> | bigint | number | null
    scraping_shares?: BigIntNullableWithAggregatesFilter<"V2_format"> | bigint | number | null
    scraping_ctr?: BigIntNullableWithAggregatesFilter<"V2_format"> | bigint | number | null
    scraping_budget?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    scraping_ctr_top?: BigIntNullableWithAggregatesFilter<"V2_format"> | bigint | number | null
    scraping_ctr_sec?: JsonNullableWithAggregatesFilter<"V2_format">
    scraping_cvr_top?: BigIntNullableWithAggregatesFilter<"V2_format"> | bigint | number | null
    scraping_cvr_sec?: JsonNullableWithAggregatesFilter<"V2_format">
    system_id?: BigIntWithAggregatesFilter<"V2_format"> | bigint | number
    search_condition?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_product_category?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_product_details?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_target_age?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_target_gender?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_content_type?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_content_summary?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_content_music?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_content_speed?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    video_target_details?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
    system_usable?: BoolNullableWithAggregatesFilter<"V2_format"> | boolean | null
    video_url?: StringNullableWithAggregatesFilter<"V2_format"> | string | null
  }

  export type requestlistWhereInput = {
    AND?: requestlistWhereInput | requestlistWhereInput[]
    OR?: requestlistWhereInput[]
    NOT?: requestlistWhereInput | requestlistWhereInput[]
    id?: BigIntFilter<"requestlist"> | bigint | number
    created_at?: DateTimeFilter<"requestlist"> | Date | string
    name?: StringNullableFilter<"requestlist"> | string | null
    company_name?: StringNullableFilter<"requestlist"> | string | null
    email?: StringNullableFilter<"requestlist"> | string | null
    tiktok_url?: StringNullableFilter<"requestlist"> | string | null
  }

  export type requestlistOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrderInput | SortOrder
    company_name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    tiktok_url?: SortOrderInput | SortOrder
  }

  export type requestlistWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: requestlistWhereInput | requestlistWhereInput[]
    OR?: requestlistWhereInput[]
    NOT?: requestlistWhereInput | requestlistWhereInput[]
    created_at?: DateTimeFilter<"requestlist"> | Date | string
    name?: StringNullableFilter<"requestlist"> | string | null
    company_name?: StringNullableFilter<"requestlist"> | string | null
    email?: StringNullableFilter<"requestlist"> | string | null
    tiktok_url?: StringNullableFilter<"requestlist"> | string | null
  }, "id">

  export type requestlistOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrderInput | SortOrder
    company_name?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    tiktok_url?: SortOrderInput | SortOrder
    _count?: requestlistCountOrderByAggregateInput
    _avg?: requestlistAvgOrderByAggregateInput
    _max?: requestlistMaxOrderByAggregateInput
    _min?: requestlistMinOrderByAggregateInput
    _sum?: requestlistSumOrderByAggregateInput
  }

  export type requestlistScalarWhereWithAggregatesInput = {
    AND?: requestlistScalarWhereWithAggregatesInput | requestlistScalarWhereWithAggregatesInput[]
    OR?: requestlistScalarWhereWithAggregatesInput[]
    NOT?: requestlistScalarWhereWithAggregatesInput | requestlistScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"requestlist"> | bigint | number
    created_at?: DateTimeWithAggregatesFilter<"requestlist"> | Date | string
    name?: StringNullableWithAggregatesFilter<"requestlist"> | string | null
    company_name?: StringNullableWithAggregatesFilter<"requestlist"> | string | null
    email?: StringNullableWithAggregatesFilter<"requestlist"> | string | null
    tiktok_url?: StringNullableWithAggregatesFilter<"requestlist"> | string | null
  }

  export type V2_formatCreateInput = {
    system_status?: string
    search_url?: string | null
    scraping_brand?: string | null
    scraping_industry?: string | null
    scraping_caption?: string | null
    scraping_landingpage?: string | null
    scraping_likes?: bigint | number | null
    scraping_comments?: bigint | number | null
    scraping_shares?: bigint | number | null
    scraping_ctr?: bigint | number | null
    scraping_budget?: string | null
    scraping_ctr_top?: bigint | number | null
    scraping_ctr_sec?: NullableJsonNullValueInput | InputJsonValue
    scraping_cvr_top?: bigint | number | null
    scraping_cvr_sec?: NullableJsonNullValueInput | InputJsonValue
    system_id?: bigint | number
    search_condition?: string | null
    video_product_category?: string | null
    video_product_details?: string | null
    video_target_age?: string | null
    video_target_gender?: string | null
    video_content_type?: string | null
    video_content_summary?: string | null
    video_content_music?: string | null
    video_content_speed?: string | null
    video_target_details?: string | null
    system_usable?: boolean | null
    video_url?: string | null
  }

  export type V2_formatUncheckedCreateInput = {
    system_status?: string
    search_url?: string | null
    scraping_brand?: string | null
    scraping_industry?: string | null
    scraping_caption?: string | null
    scraping_landingpage?: string | null
    scraping_likes?: bigint | number | null
    scraping_comments?: bigint | number | null
    scraping_shares?: bigint | number | null
    scraping_ctr?: bigint | number | null
    scraping_budget?: string | null
    scraping_ctr_top?: bigint | number | null
    scraping_ctr_sec?: NullableJsonNullValueInput | InputJsonValue
    scraping_cvr_top?: bigint | number | null
    scraping_cvr_sec?: NullableJsonNullValueInput | InputJsonValue
    system_id?: bigint | number
    search_condition?: string | null
    video_product_category?: string | null
    video_product_details?: string | null
    video_target_age?: string | null
    video_target_gender?: string | null
    video_content_type?: string | null
    video_content_summary?: string | null
    video_content_music?: string | null
    video_content_speed?: string | null
    video_target_details?: string | null
    system_usable?: boolean | null
    video_url?: string | null
  }

  export type V2_formatUpdateInput = {
    system_status?: StringFieldUpdateOperationsInput | string
    search_url?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_brand?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_industry?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_caption?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_landingpage?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_likes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_comments?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_shares?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_ctr?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_budget?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_ctr_top?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_ctr_sec?: NullableJsonNullValueInput | InputJsonValue
    scraping_cvr_top?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_cvr_sec?: NullableJsonNullValueInput | InputJsonValue
    system_id?: BigIntFieldUpdateOperationsInput | bigint | number
    search_condition?: NullableStringFieldUpdateOperationsInput | string | null
    video_product_category?: NullableStringFieldUpdateOperationsInput | string | null
    video_product_details?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_age?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_type?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_summary?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_music?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_speed?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_details?: NullableStringFieldUpdateOperationsInput | string | null
    system_usable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type V2_formatUncheckedUpdateInput = {
    system_status?: StringFieldUpdateOperationsInput | string
    search_url?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_brand?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_industry?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_caption?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_landingpage?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_likes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_comments?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_shares?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_ctr?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_budget?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_ctr_top?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_ctr_sec?: NullableJsonNullValueInput | InputJsonValue
    scraping_cvr_top?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_cvr_sec?: NullableJsonNullValueInput | InputJsonValue
    system_id?: BigIntFieldUpdateOperationsInput | bigint | number
    search_condition?: NullableStringFieldUpdateOperationsInput | string | null
    video_product_category?: NullableStringFieldUpdateOperationsInput | string | null
    video_product_details?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_age?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_type?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_summary?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_music?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_speed?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_details?: NullableStringFieldUpdateOperationsInput | string | null
    system_usable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type V2_formatCreateManyInput = {
    system_status?: string
    search_url?: string | null
    scraping_brand?: string | null
    scraping_industry?: string | null
    scraping_caption?: string | null
    scraping_landingpage?: string | null
    scraping_likes?: bigint | number | null
    scraping_comments?: bigint | number | null
    scraping_shares?: bigint | number | null
    scraping_ctr?: bigint | number | null
    scraping_budget?: string | null
    scraping_ctr_top?: bigint | number | null
    scraping_ctr_sec?: NullableJsonNullValueInput | InputJsonValue
    scraping_cvr_top?: bigint | number | null
    scraping_cvr_sec?: NullableJsonNullValueInput | InputJsonValue
    system_id?: bigint | number
    search_condition?: string | null
    video_product_category?: string | null
    video_product_details?: string | null
    video_target_age?: string | null
    video_target_gender?: string | null
    video_content_type?: string | null
    video_content_summary?: string | null
    video_content_music?: string | null
    video_content_speed?: string | null
    video_target_details?: string | null
    system_usable?: boolean | null
    video_url?: string | null
  }

  export type V2_formatUpdateManyMutationInput = {
    system_status?: StringFieldUpdateOperationsInput | string
    search_url?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_brand?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_industry?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_caption?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_landingpage?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_likes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_comments?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_shares?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_ctr?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_budget?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_ctr_top?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_ctr_sec?: NullableJsonNullValueInput | InputJsonValue
    scraping_cvr_top?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_cvr_sec?: NullableJsonNullValueInput | InputJsonValue
    system_id?: BigIntFieldUpdateOperationsInput | bigint | number
    search_condition?: NullableStringFieldUpdateOperationsInput | string | null
    video_product_category?: NullableStringFieldUpdateOperationsInput | string | null
    video_product_details?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_age?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_type?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_summary?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_music?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_speed?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_details?: NullableStringFieldUpdateOperationsInput | string | null
    system_usable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type V2_formatUncheckedUpdateManyInput = {
    system_status?: StringFieldUpdateOperationsInput | string
    search_url?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_brand?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_industry?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_caption?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_landingpage?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_likes?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_comments?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_shares?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_ctr?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_budget?: NullableStringFieldUpdateOperationsInput | string | null
    scraping_ctr_top?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_ctr_sec?: NullableJsonNullValueInput | InputJsonValue
    scraping_cvr_top?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    scraping_cvr_sec?: NullableJsonNullValueInput | InputJsonValue
    system_id?: BigIntFieldUpdateOperationsInput | bigint | number
    search_condition?: NullableStringFieldUpdateOperationsInput | string | null
    video_product_category?: NullableStringFieldUpdateOperationsInput | string | null
    video_product_details?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_age?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_gender?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_type?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_summary?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_music?: NullableStringFieldUpdateOperationsInput | string | null
    video_content_speed?: NullableStringFieldUpdateOperationsInput | string | null
    video_target_details?: NullableStringFieldUpdateOperationsInput | string | null
    system_usable?: NullableBoolFieldUpdateOperationsInput | boolean | null
    video_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type requestlistCreateInput = {
    id?: bigint | number
    created_at?: Date | string
    name?: string | null
    company_name?: string | null
    email?: string | null
    tiktok_url?: string | null
  }

  export type requestlistUncheckedCreateInput = {
    id?: bigint | number
    created_at?: Date | string
    name?: string | null
    company_name?: string | null
    email?: string | null
    tiktok_url?: string | null
  }

  export type requestlistUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    tiktok_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type requestlistUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    tiktok_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type requestlistCreateManyInput = {
    id?: bigint | number
    created_at?: Date | string
    name?: string | null
    company_name?: string | null
    email?: string | null
    tiktok_url?: string | null
  }

  export type requestlistUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    tiktok_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type requestlistUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    company_name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    tiktok_url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type V2_formatCountOrderByAggregateInput = {
    system_status?: SortOrder
    search_url?: SortOrder
    scraping_brand?: SortOrder
    scraping_industry?: SortOrder
    scraping_caption?: SortOrder
    scraping_landingpage?: SortOrder
    scraping_likes?: SortOrder
    scraping_comments?: SortOrder
    scraping_shares?: SortOrder
    scraping_ctr?: SortOrder
    scraping_budget?: SortOrder
    scraping_ctr_top?: SortOrder
    scraping_ctr_sec?: SortOrder
    scraping_cvr_top?: SortOrder
    scraping_cvr_sec?: SortOrder
    system_id?: SortOrder
    search_condition?: SortOrder
    video_product_category?: SortOrder
    video_product_details?: SortOrder
    video_target_age?: SortOrder
    video_target_gender?: SortOrder
    video_content_type?: SortOrder
    video_content_summary?: SortOrder
    video_content_music?: SortOrder
    video_content_speed?: SortOrder
    video_target_details?: SortOrder
    system_usable?: SortOrder
    video_url?: SortOrder
  }

  export type V2_formatAvgOrderByAggregateInput = {
    scraping_likes?: SortOrder
    scraping_comments?: SortOrder
    scraping_shares?: SortOrder
    scraping_ctr?: SortOrder
    scraping_ctr_top?: SortOrder
    scraping_cvr_top?: SortOrder
    system_id?: SortOrder
  }

  export type V2_formatMaxOrderByAggregateInput = {
    system_status?: SortOrder
    search_url?: SortOrder
    scraping_brand?: SortOrder
    scraping_industry?: SortOrder
    scraping_caption?: SortOrder
    scraping_landingpage?: SortOrder
    scraping_likes?: SortOrder
    scraping_comments?: SortOrder
    scraping_shares?: SortOrder
    scraping_ctr?: SortOrder
    scraping_budget?: SortOrder
    scraping_ctr_top?: SortOrder
    scraping_cvr_top?: SortOrder
    system_id?: SortOrder
    search_condition?: SortOrder
    video_product_category?: SortOrder
    video_product_details?: SortOrder
    video_target_age?: SortOrder
    video_target_gender?: SortOrder
    video_content_type?: SortOrder
    video_content_summary?: SortOrder
    video_content_music?: SortOrder
    video_content_speed?: SortOrder
    video_target_details?: SortOrder
    system_usable?: SortOrder
    video_url?: SortOrder
  }

  export type V2_formatMinOrderByAggregateInput = {
    system_status?: SortOrder
    search_url?: SortOrder
    scraping_brand?: SortOrder
    scraping_industry?: SortOrder
    scraping_caption?: SortOrder
    scraping_landingpage?: SortOrder
    scraping_likes?: SortOrder
    scraping_comments?: SortOrder
    scraping_shares?: SortOrder
    scraping_ctr?: SortOrder
    scraping_budget?: SortOrder
    scraping_ctr_top?: SortOrder
    scraping_cvr_top?: SortOrder
    system_id?: SortOrder
    search_condition?: SortOrder
    video_product_category?: SortOrder
    video_product_details?: SortOrder
    video_target_age?: SortOrder
    video_target_gender?: SortOrder
    video_content_type?: SortOrder
    video_content_summary?: SortOrder
    video_content_music?: SortOrder
    video_content_speed?: SortOrder
    video_target_details?: SortOrder
    system_usable?: SortOrder
    video_url?: SortOrder
  }

  export type V2_formatSumOrderByAggregateInput = {
    scraping_likes?: SortOrder
    scraping_comments?: SortOrder
    scraping_shares?: SortOrder
    scraping_ctr?: SortOrder
    scraping_ctr_top?: SortOrder
    scraping_cvr_top?: SortOrder
    system_id?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type requestlistCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    company_name?: SortOrder
    email?: SortOrder
    tiktok_url?: SortOrder
  }

  export type requestlistAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type requestlistMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    company_name?: SortOrder
    email?: SortOrder
    tiktok_url?: SortOrder
  }

  export type requestlistMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    name?: SortOrder
    company_name?: SortOrder
    email?: SortOrder
    tiktok_url?: SortOrder
  }

  export type requestlistSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel> | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}