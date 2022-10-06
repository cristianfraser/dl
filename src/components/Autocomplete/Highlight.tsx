import { Fragment } from 'react';

const Highlight = ({
  selected,
  text,
  match,
}: {
  selected: boolean;
  text: string;
  match: string;
}) => {
  const lcText = text.toLocaleLowerCase();
  const lcMatch = match.toLocaleLowerCase();

  const lcArray = lcText.split(lcMatch);

  return (
    <span>
      {lcArray.map((element, index) => {
        if (!element && index === 0) {
          return null;
        }

        return (
          <span style={{ color: selected ? 'blue' : undefined }} key={index}>
            {index !== 0 && <b style={{ fontWeight: 600 }}>{match}</b>}
            {element}
          </span>
        );
      })}
    </span>
  );
};

export default Highlight;
