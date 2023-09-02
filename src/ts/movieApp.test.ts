import { init, handleSubmit } from './movieApp';
import { getData } from './services/movieservice';

jest.mock('./services/movieservice');

beforeEach(() => {
    document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
    `;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('event listener is attached correctly', () => {
    const handleSubmitSpy = jest.spyOn({ handleSubmit }, 'handleSubmit');
    init();
    const form = document.getElementById("searchForm");
    form?.dispatchEvent(new Event('submit'));
    expect(handleSubmitSpy).toHaveBeenCalledTimes(1);
});

test('correct movies are displayed based on user input', async () => {
    (getData as jest.Mock).mockResolvedValue([{ Title: 'Test Movie' }]);
    
    await handleSubmit();
    const movieContainer = document.getElementById('movie-container');
    expect(movieContainer?.children.length).toBe(1);
    expect(movieContainer?.children[0].querySelector('h3')?.textContent).toBe('Test Movie');
});

test('no movies displayed if none are returned from API', async () => {
    (getData as jest.Mock).mockResolvedValue([]);

    await handleSubmit();
    const movieContainer = document.getElementById('movie-container');
    expect(movieContainer?.children.length).toBe(1);
    expect(movieContainer?.children[0].textContent).toBe('Inga sökresultat att visa');
});

test('shows no results message if there is an error fetching', async () => {
    (getData as jest.Mock).mockRejectedValue(new Error('Fetch error'));

    await handleSubmit();
    const movieContainer = document.getElementById('movie-container');
    expect(movieContainer?.children.length).toBe(1);
    expect(movieContainer?.children[0].textContent).toBe('Inga sökresultat att visa');
});
