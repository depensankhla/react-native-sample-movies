export function extractTitles(results: any) {
    const titles = [];
    for (let i = 0; i < results.length; i++) {
        titles.push(results[i].title);
    }
    return titles;
}

export function updateTitles(movies: any, titles: string[]) {
    const results = movies.results;
    for (let i = 0; i < results.length; i++) {
        results[i].title = titles[i];
    }
    return movies;
}

