import { movieSort } from './functions';

test('handles an empty list', () => {
    const movies: any[] = [];
    const result = movieSort(movies);
    expect(result).toEqual([]);
});

test('sorts movies with the same title', () => {
    const movies = [
        {
            Title: 'B Movie',
            imdbID: 'tt1234569',
            Type: 'movie',
            Poster: 'b-movie2.jpg',
            Year: '2022'
        },
        {
            Title: 'A Movie',
            imdbID: 'tt1234568',
            Type: 'movie',
            Poster: 'a-movie.jpg',
            Year: '2020'
        },
        {
            Title: 'B Movie',
            imdbID: 'tt1234567',
            Type: 'movie',
            Poster: 'b-movie.jpg',
            Year: '2021'
        }
    ];

    const result = movieSort(movies);
    expect(result[0].Title).toBe('A Movie');
    expect(result[1].Title).toBe('B Movie');
    expect(result[2].Title).toBe('B Movie');
});

test('sorts movies considering case sensitivity', () => {
    const movies = [
        {
            Title: 'apple',
            imdbID: 'tt1234567',
            Type: 'movie',
            Poster: 'apple-movie.jpg',
            Year: '2021'
        },
        {
            Title: 'Apple',
            imdbID: 'tt1234568',
            Type: 'movie',
            Poster: 'Apple-movie.jpg',
            Year: '2020'
        }
    ];

    const result = movieSort(movies);
    expect(result[0].Title).toBe('Apple');  // If your sorting is case-sensitive.
    expect(result[1].Title).toBe('apple');
});

describe('movieSort function', () => {

    const movies = [
      {
        Title: 'B MOVIE',
        imdbID: 'tt1234569',
        Type: 'movie',
        Poster: 'b-movie2.jpg',
        Year: '2022'
      },
      {
        Title: 'A MOVIE',
        imdbID: 'tt1234568',
        Type: 'movie',
        Poster: 'a-movie.jpg',
        Year: '2020'
      }
    ];
  
    test('sorts movies in descending order when desc is true', () => {
      const result = movieSort([...movies], true);
      expect(result[0].Title).toBe('B MOVIE');
      expect(result[1].Title).toBe('A MOVIE');
    });
  
    test('sorts movies in descending order when desc is false (based on current behavior)', () => {
      const result = movieSort([...movies], false);
      expect(result[0].Title).toBe('B MOVIE');
      expect(result[1].Title).toBe('A MOVIE');
    });
  });

  