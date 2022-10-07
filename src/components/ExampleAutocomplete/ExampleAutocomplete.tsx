import Autocomplete, { AutocompleteProps } from '../Autocomplete/Autocomplete';

type ExampleAutocompleteProps = Pick<AutocompleteProps, 'onSelect' | 'id'>;

function ExampleAutocomplete({ id, onSelect }: ExampleAutocompleteProps) {
  return (
    <Autocomplete
      id={id}
      onSelect={(option) => {
        onSelect(option);
      }}
      fetchFunction={async (input) => {
        const res = await fetch(
          `https://rickandmortyapi.com/api/episode/?name=${input}`
        );
        const json = await res.json();
        return json.results.map((entry: { id: number; name: string }) => ({
          value: entry.id.toString(),
          label: entry.name,
        }));
      }}
    />
  );
}

export default ExampleAutocomplete;
