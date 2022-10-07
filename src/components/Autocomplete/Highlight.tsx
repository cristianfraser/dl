function escapeRegExp(stringToGoIntoTheRegex: string) {
  return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const Highlight = ({ text, match }: { text: string; match: string }) => {
  const lcText = text.toLocaleLowerCase();
  const lcMatch = match.toLocaleLowerCase();

  const highlight = [];

  for (let i = 0; i < text.length; ) {
    const matchIndex = lcText.indexOf(lcMatch, i);

    let normalText, matchText;
    if (matchIndex > 0) {
      normalText = text.substring(i, matchIndex);
      matchText = text.substring(matchIndex, matchIndex + match.length);
    } else if (matchIndex === 0) {
      matchText = text.substring(matchIndex, matchIndex + match.length);
    } else {
      normalText = text.substring(i);
    }

    highlight.push(
      <span key={i}>
        {!!normalText && normalText}
        {!!matchText && <b style={{ fontWeight: 600 }}>{matchText}</b>}
      </span>
    );

    if (matchIndex > -1) {
      i = matchIndex + match.length;
    } else {
      break;
    }
  }

  return <span>{highlight}</span>;
};

export default Highlight;
