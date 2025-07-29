
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
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
 * Model project
 * This model contains row level security and requires additional setup for migrations. Visit https://pris.ly/d/row-level-security for more info.
 */
export type project = $Result.DefaultSelection<Prisma.$projectPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

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

  /**
   * `prisma.project`: Exposes CRUD operations for the **project** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Projects
    * const projects = await prisma.project.findMany()
    * ```
    */
  get project(): Prisma.projectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    V2_format: 'V2_format',
    requestlist: 'requestlist',
    project: 'project',
    Transaction: 'Transaction'
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
      modelProps: "user" | "v2_format" | "requestlist" | "project" | "transaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
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
      project: {
        payload: Prisma.$projectPayload<ExtArgs>
        fields: Prisma.projectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.projectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.projectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>
          }
          findFirst: {
            args: Prisma.projectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.projectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>
          }
          findMany: {
            args: Prisma.projectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>[]
          }
          create: {
            args: Prisma.projectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>
          }
          createMany: {
            args: Prisma.projectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.projectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>[]
          }
          delete: {
            args: Prisma.projectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>
          }
          update: {
            args: Prisma.projectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>
          }
          deleteMany: {
            args: Prisma.projectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.projectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.projectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>[]
          }
          upsert: {
            args: Prisma.projectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$projectPayload>
          }
          aggregate: {
            args: Prisma.ProjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProject>
          }
          groupBy: {
            args: Prisma.projectGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.projectCountArgs<ExtArgs>
            result: $Utils.Optional<ProjectCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
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
    user?: UserOmit
    v2_format?: V2_formatOmit
    requestlist?: requestlistOmit
    project?: projectOmit
    transaction?: TransactionOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    project: number
    transaction: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | UserCountOutputTypeCountProjectArgs
    transaction?: boolean | UserCountOutputTypeCountTransactionArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProjectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    credit: number | null
  }

  export type UserSumAggregateOutputType = {
    id: bigint | null
    credit: number | null
  }

  export type UserMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    email: string | null
    phoneNumber: string | null
    tiktokUsername: string | null
    credit: number | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    email: string | null
    phoneNumber: string | null
    tiktokUsername: string | null
    credit: number | null
    createdAt: Date | null
    updatedAt: Date | null
    firstName: string | null
    lastName: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    userId: number
    email: number
    phoneNumber: number
    tiktokUsername: number
    credit: number
    createdAt: number
    updatedAt: number
    firstName: number
    lastName: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    credit?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    credit?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    phoneNumber?: true
    tiktokUsername?: true
    credit?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    phoneNumber?: true
    tiktokUsername?: true
    credit?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    phoneNumber?: true
    tiktokUsername?: true
    credit?: true
    createdAt?: true
    updatedAt?: true
    firstName?: true
    lastName?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: bigint
    userId: string
    email: string
    phoneNumber: string | null
    tiktokUsername: string | null
    credit: number
    createdAt: Date
    updatedAt: Date
    firstName: string
    lastName: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    phoneNumber?: boolean
    tiktokUsername?: boolean
    credit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
    project?: boolean | User$projectArgs<ExtArgs>
    transaction?: boolean | User$transactionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    phoneNumber?: boolean
    tiktokUsername?: boolean
    credit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    phoneNumber?: boolean
    tiktokUsername?: boolean
    credit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    userId?: boolean
    email?: boolean
    phoneNumber?: boolean
    tiktokUsername?: boolean
    credit?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    firstName?: boolean
    lastName?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "email" | "phoneNumber" | "tiktokUsername" | "credit" | "createdAt" | "updatedAt" | "firstName" | "lastName", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    project?: boolean | User$projectArgs<ExtArgs>
    transaction?: boolean | User$transactionArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      project: Prisma.$projectPayload<ExtArgs>[]
      transaction: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string
      email: string
      phoneNumber: string | null
      tiktokUsername: string | null
      credit: number
      createdAt: Date
      updatedAt: Date
      firstName: string
      lastName: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    project<T extends User$projectArgs<ExtArgs> = {}>(args?: Subset<T, User$projectArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transaction<T extends User$transactionArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'BigInt'>
    readonly userId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly tiktokUsername: FieldRef<"User", 'String'>
    readonly credit: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.project
   */
  export type User$projectArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    where?: projectWhereInput
    orderBy?: projectOrderByWithRelationInput | projectOrderByWithRelationInput[]
    cursor?: projectWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * User.transaction
   */
  export type User$transactionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


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
   * Model project
   */

  export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  export type ProjectAvgAggregateOutputType = {
    hook_count: number | null
    content_count: number | null
    id: number | null
  }

  export type ProjectSumAggregateOutputType = {
    hook_count: number | null
    content_count: number | null
    id: bigint | null
  }

  export type ProjectMinAggregateOutputType = {
    system_userid: string | null
    system_createdAt: Date | null
    hook_count: number | null
    content_count: number | null
    id: bigint | null
  }

  export type ProjectMaxAggregateOutputType = {
    system_userid: string | null
    system_createdAt: Date | null
    hook_count: number | null
    content_count: number | null
    id: bigint | null
  }

  export type ProjectCountAggregateOutputType = {
    system_userid: number
    system_createdAt: number
    userinput: number
    comment: number
    hook: number
    hook_count: number
    content: number
    content_count: number
    id: number
    _all: number
  }


  export type ProjectAvgAggregateInputType = {
    hook_count?: true
    content_count?: true
    id?: true
  }

  export type ProjectSumAggregateInputType = {
    hook_count?: true
    content_count?: true
    id?: true
  }

  export type ProjectMinAggregateInputType = {
    system_userid?: true
    system_createdAt?: true
    hook_count?: true
    content_count?: true
    id?: true
  }

  export type ProjectMaxAggregateInputType = {
    system_userid?: true
    system_createdAt?: true
    hook_count?: true
    content_count?: true
    id?: true
  }

  export type ProjectCountAggregateInputType = {
    system_userid?: true
    system_createdAt?: true
    userinput?: true
    comment?: true
    hook?: true
    hook_count?: true
    content?: true
    content_count?: true
    id?: true
    _all?: true
  }

  export type ProjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which project to aggregate.
     */
    where?: projectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectOrderByWithRelationInput | projectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: projectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned projects
    **/
    _count?: true | ProjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProjectMaxAggregateInputType
  }

  export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
        [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProject[P]>
      : GetScalarType<T[P], AggregateProject[P]>
  }




  export type projectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: projectWhereInput
    orderBy?: projectOrderByWithAggregationInput | projectOrderByWithAggregationInput[]
    by: ProjectScalarFieldEnum[] | ProjectScalarFieldEnum
    having?: projectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProjectCountAggregateInputType | true
    _avg?: ProjectAvgAggregateInputType
    _sum?: ProjectSumAggregateInputType
    _min?: ProjectMinAggregateInputType
    _max?: ProjectMaxAggregateInputType
  }

  export type ProjectGroupByOutputType = {
    system_userid: string
    system_createdAt: Date
    userinput: JsonValue | null
    comment: JsonValue | null
    hook: JsonValue | null
    hook_count: number | null
    content: JsonValue | null
    content_count: number | null
    id: bigint
    _count: ProjectCountAggregateOutputType | null
    _avg: ProjectAvgAggregateOutputType | null
    _sum: ProjectSumAggregateOutputType | null
    _min: ProjectMinAggregateOutputType | null
    _max: ProjectMaxAggregateOutputType | null
  }

  type GetProjectGroupByPayload<T extends projectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProjectGroupByOutputType[P]>
            : GetScalarType<T[P], ProjectGroupByOutputType[P]>
        }
      >
    >


  export type projectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    system_userid?: boolean
    system_createdAt?: boolean
    userinput?: boolean
    comment?: boolean
    hook?: boolean
    hook_count?: boolean
    content?: boolean
    content_count?: boolean
    id?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type projectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    system_userid?: boolean
    system_createdAt?: boolean
    userinput?: boolean
    comment?: boolean
    hook?: boolean
    hook_count?: boolean
    content?: boolean
    content_count?: boolean
    id?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type projectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    system_userid?: boolean
    system_createdAt?: boolean
    userinput?: boolean
    comment?: boolean
    hook?: boolean
    hook_count?: boolean
    content?: boolean
    content_count?: boolean
    id?: boolean
    User?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["project"]>

  export type projectSelectScalar = {
    system_userid?: boolean
    system_createdAt?: boolean
    userinput?: boolean
    comment?: boolean
    hook?: boolean
    hook_count?: boolean
    content?: boolean
    content_count?: boolean
    id?: boolean
  }

  export type projectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"system_userid" | "system_createdAt" | "userinput" | "comment" | "hook" | "hook_count" | "content" | "content_count" | "id", ExtArgs["result"]["project"]>
  export type projectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type projectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type projectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $projectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "project"
    objects: {
      User: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      system_userid: string
      system_createdAt: Date
      userinput: Prisma.JsonValue | null
      comment: Prisma.JsonValue | null
      hook: Prisma.JsonValue | null
      hook_count: number | null
      content: Prisma.JsonValue | null
      content_count: number | null
      id: bigint
    }, ExtArgs["result"]["project"]>
    composites: {}
  }

  type projectGetPayload<S extends boolean | null | undefined | projectDefaultArgs> = $Result.GetResult<Prisma.$projectPayload, S>

  type projectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<projectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProjectCountAggregateInputType | true
    }

  export interface projectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['project'], meta: { name: 'project' } }
    /**
     * Find zero or one Project that matches the filter.
     * @param {projectFindUniqueArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends projectFindUniqueArgs>(args: SelectSubset<T, projectFindUniqueArgs<ExtArgs>>): Prisma__projectClient<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Project that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {projectFindUniqueOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends projectFindUniqueOrThrowArgs>(args: SelectSubset<T, projectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__projectClient<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectFindFirstArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends projectFindFirstArgs>(args?: SelectSubset<T, projectFindFirstArgs<ExtArgs>>): Prisma__projectClient<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Project that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectFindFirstOrThrowArgs} args - Arguments to find a Project
     * @example
     * // Get one Project
     * const project = await prisma.project.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends projectFindFirstOrThrowArgs>(args?: SelectSubset<T, projectFindFirstOrThrowArgs<ExtArgs>>): Prisma__projectClient<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Projects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Projects
     * const projects = await prisma.project.findMany()
     * 
     * // Get first 10 Projects
     * const projects = await prisma.project.findMany({ take: 10 })
     * 
     * // Only select the `system_userid`
     * const projectWithSystem_useridOnly = await prisma.project.findMany({ select: { system_userid: true } })
     * 
     */
    findMany<T extends projectFindManyArgs>(args?: SelectSubset<T, projectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Project.
     * @param {projectCreateArgs} args - Arguments to create a Project.
     * @example
     * // Create one Project
     * const Project = await prisma.project.create({
     *   data: {
     *     // ... data to create a Project
     *   }
     * })
     * 
     */
    create<T extends projectCreateArgs>(args: SelectSubset<T, projectCreateArgs<ExtArgs>>): Prisma__projectClient<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Projects.
     * @param {projectCreateManyArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends projectCreateManyArgs>(args?: SelectSubset<T, projectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Projects and returns the data saved in the database.
     * @param {projectCreateManyAndReturnArgs} args - Arguments to create many Projects.
     * @example
     * // Create many Projects
     * const project = await prisma.project.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Projects and only return the `system_userid`
     * const projectWithSystem_useridOnly = await prisma.project.createManyAndReturn({
     *   select: { system_userid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends projectCreateManyAndReturnArgs>(args?: SelectSubset<T, projectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Project.
     * @param {projectDeleteArgs} args - Arguments to delete one Project.
     * @example
     * // Delete one Project
     * const Project = await prisma.project.delete({
     *   where: {
     *     // ... filter to delete one Project
     *   }
     * })
     * 
     */
    delete<T extends projectDeleteArgs>(args: SelectSubset<T, projectDeleteArgs<ExtArgs>>): Prisma__projectClient<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Project.
     * @param {projectUpdateArgs} args - Arguments to update one Project.
     * @example
     * // Update one Project
     * const project = await prisma.project.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends projectUpdateArgs>(args: SelectSubset<T, projectUpdateArgs<ExtArgs>>): Prisma__projectClient<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Projects.
     * @param {projectDeleteManyArgs} args - Arguments to filter Projects to delete.
     * @example
     * // Delete a few Projects
     * const { count } = await prisma.project.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends projectDeleteManyArgs>(args?: SelectSubset<T, projectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends projectUpdateManyArgs>(args: SelectSubset<T, projectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Projects and returns the data updated in the database.
     * @param {projectUpdateManyAndReturnArgs} args - Arguments to update many Projects.
     * @example
     * // Update many Projects
     * const project = await prisma.project.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Projects and only return the `system_userid`
     * const projectWithSystem_useridOnly = await prisma.project.updateManyAndReturn({
     *   select: { system_userid: true },
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
    updateManyAndReturn<T extends projectUpdateManyAndReturnArgs>(args: SelectSubset<T, projectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Project.
     * @param {projectUpsertArgs} args - Arguments to update or create a Project.
     * @example
     * // Update or create a Project
     * const project = await prisma.project.upsert({
     *   create: {
     *     // ... data to create a Project
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Project we want to update
     *   }
     * })
     */
    upsert<T extends projectUpsertArgs>(args: SelectSubset<T, projectUpsertArgs<ExtArgs>>): Prisma__projectClient<$Result.GetResult<Prisma.$projectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Projects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectCountArgs} args - Arguments to filter Projects to count.
     * @example
     * // Count the number of Projects
     * const count = await prisma.project.count({
     *   where: {
     *     // ... the filter for the Projects we want to count
     *   }
     * })
    **/
    count<T extends projectCountArgs>(
      args?: Subset<T, projectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ProjectAggregateArgs>(args: Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>

    /**
     * Group by Project.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {projectGroupByArgs} args - Group by arguments.
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
      T extends projectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: projectGroupByArgs['orderBy'] }
        : { orderBy?: projectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, projectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the project model
   */
  readonly fields: projectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for project.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__projectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    User<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the project model
   */
  interface projectFieldRefs {
    readonly system_userid: FieldRef<"project", 'String'>
    readonly system_createdAt: FieldRef<"project", 'DateTime'>
    readonly userinput: FieldRef<"project", 'Json'>
    readonly comment: FieldRef<"project", 'Json'>
    readonly hook: FieldRef<"project", 'Json'>
    readonly hook_count: FieldRef<"project", 'Int'>
    readonly content: FieldRef<"project", 'Json'>
    readonly content_count: FieldRef<"project", 'Int'>
    readonly id: FieldRef<"project", 'BigInt'>
  }
    

  // Custom InputTypes
  /**
   * project findUnique
   */
  export type projectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * Filter, which project to fetch.
     */
    where: projectWhereUniqueInput
  }

  /**
   * project findUniqueOrThrow
   */
  export type projectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * Filter, which project to fetch.
     */
    where: projectWhereUniqueInput
  }

  /**
   * project findFirst
   */
  export type projectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * Filter, which project to fetch.
     */
    where?: projectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectOrderByWithRelationInput | projectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * project findFirstOrThrow
   */
  export type projectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * Filter, which project to fetch.
     */
    where?: projectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectOrderByWithRelationInput | projectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for projects.
     */
    cursor?: projectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of projects.
     */
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * project findMany
   */
  export type projectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * Filter, which projects to fetch.
     */
    where?: projectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of projects to fetch.
     */
    orderBy?: projectOrderByWithRelationInput | projectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing projects.
     */
    cursor?: projectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` projects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` projects.
     */
    skip?: number
    distinct?: ProjectScalarFieldEnum | ProjectScalarFieldEnum[]
  }

  /**
   * project create
   */
  export type projectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * The data needed to create a project.
     */
    data: XOR<projectCreateInput, projectUncheckedCreateInput>
  }

  /**
   * project createMany
   */
  export type projectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many projects.
     */
    data: projectCreateManyInput | projectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * project createManyAndReturn
   */
  export type projectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * The data used to create many projects.
     */
    data: projectCreateManyInput | projectCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * project update
   */
  export type projectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * The data needed to update a project.
     */
    data: XOR<projectUpdateInput, projectUncheckedUpdateInput>
    /**
     * Choose, which project to update.
     */
    where: projectWhereUniqueInput
  }

  /**
   * project updateMany
   */
  export type projectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update projects.
     */
    data: XOR<projectUpdateManyMutationInput, projectUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
  }

  /**
   * project updateManyAndReturn
   */
  export type projectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * The data used to update projects.
     */
    data: XOR<projectUpdateManyMutationInput, projectUncheckedUpdateManyInput>
    /**
     * Filter which projects to update
     */
    where?: projectWhereInput
    /**
     * Limit how many projects to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * project upsert
   */
  export type projectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * The filter to search for the project to update in case it exists.
     */
    where: projectWhereUniqueInput
    /**
     * In case the project found by the `where` argument doesn't exist, create a new project with this data.
     */
    create: XOR<projectCreateInput, projectUncheckedCreateInput>
    /**
     * In case the project was found with the provided `where` argument, update it with this data.
     */
    update: XOR<projectUpdateInput, projectUncheckedUpdateInput>
  }

  /**
   * project delete
   */
  export type projectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
    /**
     * Filter which project to delete.
     */
    where: projectWhereUniqueInput
  }

  /**
   * project deleteMany
   */
  export type projectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which projects to delete
     */
    where?: projectWhereInput
    /**
     * Limit how many projects to delete.
     */
    limit?: number
  }

  /**
   * project without action
   */
  export type projectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the project
     */
    select?: projectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the project
     */
    omit?: projectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: projectInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    id: number | null
    amount: number | null
    quantity: number | null
  }

  export type TransactionSumAggregateOutputType = {
    id: bigint | null
    amount: number | null
    quantity: number | null
  }

  export type TransactionMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    amount: number | null
    quantity: number | null
    stripeSessionId: string | null
    status: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    amount: number | null
    quantity: number | null
    stripeSessionId: string | null
    status: string | null
    type: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    userId: number
    amount: number
    quantity: number
    stripeSessionId: number
    status: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    id?: true
    amount?: true
    quantity?: true
  }

  export type TransactionSumAggregateInputType = {
    id?: true
    amount?: true
    quantity?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    quantity?: true
    stripeSessionId?: true
    status?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    quantity?: true
    stripeSessionId?: true
    status?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    userId?: true
    amount?: true
    quantity?: true
    stripeSessionId?: true
    status?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: bigint
    userId: string
    amount: number
    quantity: number
    stripeSessionId: string
    status: string
    type: string
    createdAt: Date
    updatedAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    quantity?: boolean
    stripeSessionId?: boolean
    status?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    quantity?: boolean
    stripeSessionId?: boolean
    status?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    amount?: boolean
    quantity?: boolean
    stripeSessionId?: boolean
    status?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    userId?: boolean
    amount?: boolean
    quantity?: boolean
    stripeSessionId?: boolean
    status?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "amount" | "quantity" | "stripeSessionId" | "status" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string
      amount: number
      quantity: number
      stripeSessionId: string
      status: string
      type: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
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
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
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
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'BigInt'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Int'>
    readonly quantity: FieldRef<"Transaction", 'Int'>
    readonly stripeSessionId: FieldRef<"Transaction", 'String'>
    readonly status: FieldRef<"Transaction", 'String'>
    readonly type: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
    readonly updatedAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    phoneNumber: 'phoneNumber',
    tiktokUsername: 'tiktokUsername',
    credit: 'credit',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    firstName: 'firstName',
    lastName: 'lastName'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


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


  export const ProjectScalarFieldEnum: {
    system_userid: 'system_userid',
    system_createdAt: 'system_createdAt',
    userinput: 'userinput',
    comment: 'comment',
    hook: 'hook',
    hook_count: 'hook_count',
    content: 'content',
    content_count: 'content_count',
    id: 'id'
  };

  export type ProjectScalarFieldEnum = (typeof ProjectScalarFieldEnum)[keyof typeof ProjectScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    amount: 'amount',
    quantity: 'quantity',
    stripeSessionId: 'stripeSessionId',
    status: 'status',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


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


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: BigIntFilter<"User"> | bigint | number
    userId?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phoneNumber?: StringNullableFilter<"User"> | string | null
    tiktokUsername?: StringNullableFilter<"User"> | string | null
    credit?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    project?: ProjectListRelationFilter
    transaction?: TransactionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    tiktokUsername?: SortOrderInput | SortOrder
    credit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    project?: projectOrderByRelationAggregateInput
    transaction?: TransactionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    userId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    phoneNumber?: StringNullableFilter<"User"> | string | null
    tiktokUsername?: StringNullableFilter<"User"> | string | null
    credit?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    project?: ProjectListRelationFilter
    transaction?: TransactionListRelationFilter
  }, "id" | "userId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    tiktokUsername?: SortOrderInput | SortOrder
    credit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"User"> | bigint | number
    userId?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    tiktokUsername?: StringNullableWithAggregatesFilter<"User"> | string | null
    credit?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
  }

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

  export type projectWhereInput = {
    AND?: projectWhereInput | projectWhereInput[]
    OR?: projectWhereInput[]
    NOT?: projectWhereInput | projectWhereInput[]
    system_userid?: StringFilter<"project"> | string
    system_createdAt?: DateTimeFilter<"project"> | Date | string
    userinput?: JsonNullableFilter<"project">
    comment?: JsonNullableFilter<"project">
    hook?: JsonNullableFilter<"project">
    hook_count?: IntNullableFilter<"project"> | number | null
    content?: JsonNullableFilter<"project">
    content_count?: IntNullableFilter<"project"> | number | null
    id?: BigIntFilter<"project"> | bigint | number
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type projectOrderByWithRelationInput = {
    system_userid?: SortOrder
    system_createdAt?: SortOrder
    userinput?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    hook?: SortOrderInput | SortOrder
    hook_count?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    content_count?: SortOrderInput | SortOrder
    id?: SortOrder
    User?: UserOrderByWithRelationInput
  }

  export type projectWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: projectWhereInput | projectWhereInput[]
    OR?: projectWhereInput[]
    NOT?: projectWhereInput | projectWhereInput[]
    system_userid?: StringFilter<"project"> | string
    system_createdAt?: DateTimeFilter<"project"> | Date | string
    userinput?: JsonNullableFilter<"project">
    comment?: JsonNullableFilter<"project">
    hook?: JsonNullableFilter<"project">
    hook_count?: IntNullableFilter<"project"> | number | null
    content?: JsonNullableFilter<"project">
    content_count?: IntNullableFilter<"project"> | number | null
    User?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "id">

  export type projectOrderByWithAggregationInput = {
    system_userid?: SortOrder
    system_createdAt?: SortOrder
    userinput?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    hook?: SortOrderInput | SortOrder
    hook_count?: SortOrderInput | SortOrder
    content?: SortOrderInput | SortOrder
    content_count?: SortOrderInput | SortOrder
    id?: SortOrder
    _count?: projectCountOrderByAggregateInput
    _avg?: projectAvgOrderByAggregateInput
    _max?: projectMaxOrderByAggregateInput
    _min?: projectMinOrderByAggregateInput
    _sum?: projectSumOrderByAggregateInput
  }

  export type projectScalarWhereWithAggregatesInput = {
    AND?: projectScalarWhereWithAggregatesInput | projectScalarWhereWithAggregatesInput[]
    OR?: projectScalarWhereWithAggregatesInput[]
    NOT?: projectScalarWhereWithAggregatesInput | projectScalarWhereWithAggregatesInput[]
    system_userid?: StringWithAggregatesFilter<"project"> | string
    system_createdAt?: DateTimeWithAggregatesFilter<"project"> | Date | string
    userinput?: JsonNullableWithAggregatesFilter<"project">
    comment?: JsonNullableWithAggregatesFilter<"project">
    hook?: JsonNullableWithAggregatesFilter<"project">
    hook_count?: IntNullableWithAggregatesFilter<"project"> | number | null
    content?: JsonNullableWithAggregatesFilter<"project">
    content_count?: IntNullableWithAggregatesFilter<"project"> | number | null
    id?: BigIntWithAggregatesFilter<"project"> | bigint | number
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: BigIntFilter<"Transaction"> | bigint | number
    userId?: StringFilter<"Transaction"> | string
    amount?: IntFilter<"Transaction"> | number
    quantity?: IntFilter<"Transaction"> | number
    stripeSessionId?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    quantity?: SortOrder
    stripeSessionId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    stripeSessionId?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    userId?: StringFilter<"Transaction"> | string
    amount?: IntFilter<"Transaction"> | number
    quantity?: IntFilter<"Transaction"> | number
    status?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "stripeSessionId">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    quantity?: SortOrder
    stripeSessionId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"Transaction"> | bigint | number
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: IntWithAggregatesFilter<"Transaction"> | number
    quantity?: IntWithAggregatesFilter<"Transaction"> | number
    stripeSessionId?: StringWithAggregatesFilter<"Transaction"> | string
    status?: StringWithAggregatesFilter<"Transaction"> | string
    type?: StringWithAggregatesFilter<"Transaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type UserCreateInput = {
    id?: bigint | number
    userId: string
    email: string
    phoneNumber?: string | null
    tiktokUsername?: string | null
    credit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    project?: projectCreateNestedManyWithoutUserInput
    transaction?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: bigint | number
    userId: string
    email: string
    phoneNumber?: string | null
    tiktokUsername?: string | null
    credit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    project?: projectUncheckedCreateNestedManyWithoutUserInput
    transaction?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokUsername?: NullableStringFieldUpdateOperationsInput | string | null
    credit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    project?: projectUpdateManyWithoutUserNestedInput
    transaction?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokUsername?: NullableStringFieldUpdateOperationsInput | string | null
    credit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    project?: projectUncheckedUpdateManyWithoutUserNestedInput
    transaction?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: bigint | number
    userId: string
    email: string
    phoneNumber?: string | null
    tiktokUsername?: string | null
    credit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
  }

  export type UserUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokUsername?: NullableStringFieldUpdateOperationsInput | string | null
    credit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokUsername?: NullableStringFieldUpdateOperationsInput | string | null
    credit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
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

  export type projectCreateInput = {
    system_createdAt?: Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: number | null
    id?: bigint | number
    User: UserCreateNestedOneWithoutProjectInput
  }

  export type projectUncheckedCreateInput = {
    system_userid: string
    system_createdAt?: Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: number | null
    id?: bigint | number
  }

  export type projectUpdateInput = {
    system_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: NullableIntFieldUpdateOperationsInput | number | null
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    User?: UserUpdateOneRequiredWithoutProjectNestedInput
  }

  export type projectUncheckedUpdateInput = {
    system_userid?: StringFieldUpdateOperationsInput | string
    system_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: NullableIntFieldUpdateOperationsInput | number | null
    id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type projectCreateManyInput = {
    system_userid: string
    system_createdAt?: Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: number | null
    id?: bigint | number
  }

  export type projectUpdateManyMutationInput = {
    system_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: NullableIntFieldUpdateOperationsInput | number | null
    id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type projectUncheckedUpdateManyInput = {
    system_userid?: StringFieldUpdateOperationsInput | string
    system_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: NullableIntFieldUpdateOperationsInput | number | null
    id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type TransactionCreateInput = {
    id?: bigint | number
    amount: number
    quantity: number
    stripeSessionId: string
    status: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: bigint | number
    userId: string
    amount: number
    quantity: number
    stripeSessionId: string
    status: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: bigint | number
    userId: string
    amount: number
    quantity: number
    stripeSessionId: string
    status: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
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

  export type ProjectListRelationFilter = {
    every?: projectWhereInput
    some?: projectWhereInput
    none?: projectWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type projectOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    tiktokUsername?: SortOrder
    credit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    credit?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    tiktokUsername?: SortOrder
    credit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    phoneNumber?: SortOrder
    tiktokUsername?: SortOrder
    credit?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    credit?: SortOrder
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

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
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

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type projectCountOrderByAggregateInput = {
    system_userid?: SortOrder
    system_createdAt?: SortOrder
    userinput?: SortOrder
    comment?: SortOrder
    hook?: SortOrder
    hook_count?: SortOrder
    content?: SortOrder
    content_count?: SortOrder
    id?: SortOrder
  }

  export type projectAvgOrderByAggregateInput = {
    hook_count?: SortOrder
    content_count?: SortOrder
    id?: SortOrder
  }

  export type projectMaxOrderByAggregateInput = {
    system_userid?: SortOrder
    system_createdAt?: SortOrder
    hook_count?: SortOrder
    content_count?: SortOrder
    id?: SortOrder
  }

  export type projectMinOrderByAggregateInput = {
    system_userid?: SortOrder
    system_createdAt?: SortOrder
    hook_count?: SortOrder
    content_count?: SortOrder
    id?: SortOrder
  }

  export type projectSumOrderByAggregateInput = {
    hook_count?: SortOrder
    content_count?: SortOrder
    id?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    quantity?: SortOrder
    stripeSessionId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    quantity?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    quantity?: SortOrder
    stripeSessionId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    amount?: SortOrder
    quantity?: SortOrder
    stripeSessionId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    quantity?: SortOrder
  }

  export type projectCreateNestedManyWithoutUserInput = {
    create?: XOR<projectCreateWithoutUserInput, projectUncheckedCreateWithoutUserInput> | projectCreateWithoutUserInput[] | projectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: projectCreateOrConnectWithoutUserInput | projectCreateOrConnectWithoutUserInput[]
    createMany?: projectCreateManyUserInputEnvelope
    connect?: projectWhereUniqueInput | projectWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type projectUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<projectCreateWithoutUserInput, projectUncheckedCreateWithoutUserInput> | projectCreateWithoutUserInput[] | projectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: projectCreateOrConnectWithoutUserInput | projectCreateOrConnectWithoutUserInput[]
    createMany?: projectCreateManyUserInputEnvelope
    connect?: projectWhereUniqueInput | projectWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type projectUpdateManyWithoutUserNestedInput = {
    create?: XOR<projectCreateWithoutUserInput, projectUncheckedCreateWithoutUserInput> | projectCreateWithoutUserInput[] | projectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: projectCreateOrConnectWithoutUserInput | projectCreateOrConnectWithoutUserInput[]
    upsert?: projectUpsertWithWhereUniqueWithoutUserInput | projectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: projectCreateManyUserInputEnvelope
    set?: projectWhereUniqueInput | projectWhereUniqueInput[]
    disconnect?: projectWhereUniqueInput | projectWhereUniqueInput[]
    delete?: projectWhereUniqueInput | projectWhereUniqueInput[]
    connect?: projectWhereUniqueInput | projectWhereUniqueInput[]
    update?: projectUpdateWithWhereUniqueWithoutUserInput | projectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: projectUpdateManyWithWhereWithoutUserInput | projectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: projectScalarWhereInput | projectScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type projectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<projectCreateWithoutUserInput, projectUncheckedCreateWithoutUserInput> | projectCreateWithoutUserInput[] | projectUncheckedCreateWithoutUserInput[]
    connectOrCreate?: projectCreateOrConnectWithoutUserInput | projectCreateOrConnectWithoutUserInput[]
    upsert?: projectUpsertWithWhereUniqueWithoutUserInput | projectUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: projectCreateManyUserInputEnvelope
    set?: projectWhereUniqueInput | projectWhereUniqueInput[]
    disconnect?: projectWhereUniqueInput | projectWhereUniqueInput[]
    delete?: projectWhereUniqueInput | projectWhereUniqueInput[]
    connect?: projectWhereUniqueInput | projectWhereUniqueInput[]
    update?: projectUpdateWithWhereUniqueWithoutUserInput | projectUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: projectUpdateManyWithWhereWithoutUserInput | projectUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: projectScalarWhereInput | projectScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserCreateNestedOneWithoutProjectInput = {
    create?: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutProjectNestedInput = {
    create?: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    connectOrCreate?: UserCreateOrConnectWithoutProjectInput
    upsert?: UserUpsertWithoutProjectInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProjectInput, UserUpdateWithoutProjectInput>, UserUncheckedUpdateWithoutProjectInput>
  }

  export type UserCreateNestedOneWithoutTransactionInput = {
    create?: XOR<UserCreateWithoutTransactionInput, UserUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTransactionNestedInput = {
    create?: XOR<UserCreateWithoutTransactionInput, UserUncheckedCreateWithoutTransactionInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionInput
    upsert?: UserUpsertWithoutTransactionInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionInput, UserUpdateWithoutTransactionInput>, UserUncheckedUpdateWithoutTransactionInput>
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

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
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

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type projectCreateWithoutUserInput = {
    system_createdAt?: Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: number | null
    id?: bigint | number
  }

  export type projectUncheckedCreateWithoutUserInput = {
    system_createdAt?: Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: number | null
    id?: bigint | number
  }

  export type projectCreateOrConnectWithoutUserInput = {
    where: projectWhereUniqueInput
    create: XOR<projectCreateWithoutUserInput, projectUncheckedCreateWithoutUserInput>
  }

  export type projectCreateManyUserInputEnvelope = {
    data: projectCreateManyUserInput | projectCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutUserInput = {
    id?: bigint | number
    amount: number
    quantity: number
    stripeSessionId: string
    status: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    amount: number
    quantity: number
    stripeSessionId: string
    status: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type projectUpsertWithWhereUniqueWithoutUserInput = {
    where: projectWhereUniqueInput
    update: XOR<projectUpdateWithoutUserInput, projectUncheckedUpdateWithoutUserInput>
    create: XOR<projectCreateWithoutUserInput, projectUncheckedCreateWithoutUserInput>
  }

  export type projectUpdateWithWhereUniqueWithoutUserInput = {
    where: projectWhereUniqueInput
    data: XOR<projectUpdateWithoutUserInput, projectUncheckedUpdateWithoutUserInput>
  }

  export type projectUpdateManyWithWhereWithoutUserInput = {
    where: projectScalarWhereInput
    data: XOR<projectUpdateManyMutationInput, projectUncheckedUpdateManyWithoutUserInput>
  }

  export type projectScalarWhereInput = {
    AND?: projectScalarWhereInput | projectScalarWhereInput[]
    OR?: projectScalarWhereInput[]
    NOT?: projectScalarWhereInput | projectScalarWhereInput[]
    system_userid?: StringFilter<"project"> | string
    system_createdAt?: DateTimeFilter<"project"> | Date | string
    userinput?: JsonNullableFilter<"project">
    comment?: JsonNullableFilter<"project">
    hook?: JsonNullableFilter<"project">
    hook_count?: IntNullableFilter<"project"> | number | null
    content?: JsonNullableFilter<"project">
    content_count?: IntNullableFilter<"project"> | number | null
    id?: BigIntFilter<"project"> | bigint | number
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: BigIntFilter<"Transaction"> | bigint | number
    userId?: StringFilter<"Transaction"> | string
    amount?: IntFilter<"Transaction"> | number
    quantity?: IntFilter<"Transaction"> | number
    stripeSessionId?: StringFilter<"Transaction"> | string
    status?: StringFilter<"Transaction"> | string
    type?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    updatedAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type UserCreateWithoutProjectInput = {
    id?: bigint | number
    userId: string
    email: string
    phoneNumber?: string | null
    tiktokUsername?: string | null
    credit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    transaction?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProjectInput = {
    id?: bigint | number
    userId: string
    email: string
    phoneNumber?: string | null
    tiktokUsername?: string | null
    credit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    transaction?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProjectInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
  }

  export type UserUpsertWithoutProjectInput = {
    update: XOR<UserUpdateWithoutProjectInput, UserUncheckedUpdateWithoutProjectInput>
    create: XOR<UserCreateWithoutProjectInput, UserUncheckedCreateWithoutProjectInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProjectInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProjectInput, UserUncheckedUpdateWithoutProjectInput>
  }

  export type UserUpdateWithoutProjectInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokUsername?: NullableStringFieldUpdateOperationsInput | string | null
    credit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    transaction?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProjectInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokUsername?: NullableStringFieldUpdateOperationsInput | string | null
    credit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    transaction?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutTransactionInput = {
    id?: bigint | number
    userId: string
    email: string
    phoneNumber?: string | null
    tiktokUsername?: string | null
    credit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    project?: projectCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionInput = {
    id?: bigint | number
    userId: string
    email: string
    phoneNumber?: string | null
    tiktokUsername?: string | null
    credit?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    firstName: string
    lastName: string
    project?: projectUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionInput, UserUncheckedCreateWithoutTransactionInput>
  }

  export type UserUpsertWithoutTransactionInput = {
    update: XOR<UserUpdateWithoutTransactionInput, UserUncheckedUpdateWithoutTransactionInput>
    create: XOR<UserCreateWithoutTransactionInput, UserUncheckedCreateWithoutTransactionInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionInput, UserUncheckedUpdateWithoutTransactionInput>
  }

  export type UserUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokUsername?: NullableStringFieldUpdateOperationsInput | string | null
    credit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    project?: projectUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    tiktokUsername?: NullableStringFieldUpdateOperationsInput | string | null
    credit?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    project?: projectUncheckedUpdateManyWithoutUserNestedInput
  }

  export type projectCreateManyUserInput = {
    system_createdAt?: Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: number | null
    id?: bigint | number
  }

  export type TransactionCreateManyUserInput = {
    id?: bigint | number
    amount: number
    quantity: number
    stripeSessionId: string
    status: string
    type: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type projectUpdateWithoutUserInput = {
    system_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: NullableIntFieldUpdateOperationsInput | number | null
    id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type projectUncheckedUpdateWithoutUserInput = {
    system_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: NullableIntFieldUpdateOperationsInput | number | null
    id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type projectUncheckedUpdateManyWithoutUserInput = {
    system_createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userinput?: NullableJsonNullValueInput | InputJsonValue
    comment?: NullableJsonNullValueInput | InputJsonValue
    hook?: NullableJsonNullValueInput | InputJsonValue
    hook_count?: NullableIntFieldUpdateOperationsInput | number | null
    content?: NullableJsonNullValueInput | InputJsonValue
    content_count?: NullableIntFieldUpdateOperationsInput | number | null
    id?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type TransactionUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    amount?: IntFieldUpdateOperationsInput | number
    quantity?: IntFieldUpdateOperationsInput | number
    stripeSessionId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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