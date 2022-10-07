import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom';

import Autocomplete, { Option } from './Autocomplete';

//jest.mock('../../api');

const options: Option[] = [
  {
    value: 'c',
    label: 'halloHallo halloHallo halloHallo',
  },
  {
    value: 's',
    label: 'ziHi hiHi hiHi',
  },
  {
    value: 'a',
    label: 'xaHa haHa haHa',
  },
];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const props = {
  onSelect: () => {},
  id: 'test',
  fetchFunction: (input: string) => {
    return new Promise<Option[]>((resolve) => {
      setTimeout(() => {
        const res = options.filter((option) => option.label.includes(input));
        resolve(res);
      }, 1000);
    });
  },
};

const fetchFunction = jest.fn(props.fetchFunction);

const CHECK_DATA = [
  {
    value: 'aaa',
    label: 'Face on the picture matches face on the document',
  },
  {
    value: 'bbb',
    label: 'Veriff supports presented document',
  },
];

describe('Autocomplete', () => {
  beforeEach(() => {
    // mockedUseFetchChecks.mockImplementation(() => ({
    //   isLoading: true,
    //   checks: [],
    // }));
  });

  afterEach(() => {
    // jest.clearAllMocks();
  });

  const setup = (extraProps?: any) => {
    const utils = render(
      <div>
        <label htmlFor="test">Example</label>
        <Autocomplete {...props} {...extraProps} />
      </div>
    );
    const input = screen.getByLabelText('Example');
    return {
      input,
      ...utils,
    };
  };

  test('renders', () => {
    setup();

    expect(screen.getByLabelText('Example')).toBeVisible();
  });

  test('loading', async () => {
    const fetchFunction = jest.fn(props.fetchFunction);
    const { input } = setup({ fetchFunction });

    const event = {
      target: { value: 'h' },
    };

    expect(screen.queryByText(/Loading/)).toBeNull();

    fireEvent.focus(input);
    fireEvent.change(input, event as unknown as Event);

    await screen.findByText(/Loading/);

    expect(screen.queryByText(/Loading/)).toBeVisible();
  });

  test('results', async () => {
    const fetchFunction = jest.fn(props.fetchFunction);
    const { input } = setup({ fetchFunction });

    const event = {
      target: { value: 'h' },
    };

    expect(screen.queryByText(/Loading/)).toBeNull();

    fireEvent.focus(input);
    fireEvent.change(input, event as unknown as Event);

    await screen.findByText(/Loading/);

    expect(screen.queryByText(/Loading/)).toBeVisible();

    await screen.findByText(/Loading/);

    await waitFor(() => expect(screen.queryByText(/Loading/)).toBeNull(), {
      timeout: 3000,
    });

    expect(fetchFunction).toHaveBeenCalledTimes(1);
    expect(screen.getAllByRole('button')).toHaveLength(options.length);
  });
});
