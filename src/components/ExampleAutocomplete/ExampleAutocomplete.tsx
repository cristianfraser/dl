import Autocomplete, {
  Option,
  AutocompleteProps,
} from '../Autocomplete/Autocomplete';

const options: Option[] = [
  {
    value: 'z',
    label: 'holaHolah holaHolah holaHolah',
  },
  {
    value: 'x',
    label: 'chaoChao chaoChao chaoChao',
  },
  {
    value: 'v',
    label: 'ciaoCiao ciaoCiao ciaoCiao',
  },
  {
    value: 'q',
    label: 'helloHello helloHello helloHello',
  },
  {
    value: 'c',
    label: 'halloHallo halloHallo halloHallo',
  },
  {
    value: 's',
    label: 'hiHi hiHi hiHi',
  },
  {
    value: 'a',
    label: 'haHa haHa haHa',
  },
];

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type ExampleAutocompleteProps = Pick<AutocompleteProps, 'onSelect' | 'id'>;

function ExampleAutocomplete({ id, onSelect }: ExampleAutocompleteProps) {
  return (
    <Autocomplete
      id={id}
      onSelect={(option) => {
        onSelect(option);
      }}
      fetchFunction={(input) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const res = options.filter((option) =>
              option.label.includes(input)
            );
            resolve(res);
          }, getRandomInt(1, 4) * 300);
        });
      }}
    />
  );
}

export default ExampleAutocomplete;
