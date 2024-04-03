export type State = {
    [key: string]: any
};

export type EmailPasswordActionPayload = {
    email: string,
    password: string
}

export type MovieDetails = {
    poster_path: string,
    title: string,
    id: string
}

export type MovieItemDetails = {
    item: MovieDetails
}