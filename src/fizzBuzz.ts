type ArrayOfRange<N extends number, Arr extends unknown[] = []> = Arr['length'] extends N
    ? Arr
    : ArrayOfRange<N, [...Arr, unknown]>

type HasNoRemainder<N extends unknown[], Div extends unknown[]> = N extends []
    ? true
    : N extends [...Div, ...infer Rest]
        ? HasNoRemainder<Rest, Div>
        : false

type IsDivisibleBy<N extends number, Div extends number> = HasNoRemainder<
    ArrayOfRange<N>,
    ArrayOfRange<Div>
    >

type NumberRange<T extends number, Y extends number[] = []> = Y['length'] extends T
    ? Y
    : NumberRange<T, [...Y, Y['length']]>

type GetFizz<T extends number> = IsDivisibleBy<T, 3> extends true ? 'Fizz' : ''
type GetBuzz<T extends number> = IsDivisibleBy<T, 5> extends true ? 'Buzz' : ''

type FizzBuzz<N extends number> = `${GetFizz<N>}${GetBuzz<N>}` extends infer FB
    ? FB extends ''
        ? N
        : FB
    : never

type IsNumber<T> = T extends number ? T : never

type FizzBuzzArray<Nums extends unknown[]> = {
    [K in keyof Nums]: FizzBuzz<IsNumber<Nums[K]>>
}

export type FizzBuzzResult = FizzBuzzArray<NumberRange<100>>
