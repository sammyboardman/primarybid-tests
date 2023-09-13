import { renderHook, act } from '@testing-library/react-hooks';
import { SnipUrlController } from '../../controllers';
import { useShortenUrl } from '../../hooks'; // Replace with the actual import path
import constants from '../../utils/constants';

jest.mock('../../controllers/SnipUrlController', () => ({
  shortenUrl: jest.fn(),
}));

describe('useShortenUrl', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shortens URL successfully', async () => {
    const mockData = {
      status: constants.Success,
      data: {
        data: {
          shortenedUrl: 'https://short.url/abc123',
        }
      },
    };

    (SnipUrlController.shortenUrl as jest.Mock).mockResolvedValue(mockData);

    const { result, waitForNextUpdate } = renderHook(() => useShortenUrl());

    expect(result.current.loading).toBe(false);
    expect(result.current.errorMessage).toBe('');

    act(() => {
      result.current.onSubmit({ mainUrl: 'https://example.com' });
    });

    expect(result.current.loading).toBe(true);
    expect(result.current.errorMessage).toBe('');

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current?.shortenedUrl).toBe(mockData.data.data.shortenedUrl);
    expect(result.current.errorMessage).toBe('');
  });

  it('handles URL validation', () => {
    const { result } = renderHook(() => useShortenUrl());

    expect(result.current.isUrlValid('https://example.com')).toBeUndefined();
    expect(result.current.isUrlValid('invalid-url')).toBe('Invalid URL');
  });
});
