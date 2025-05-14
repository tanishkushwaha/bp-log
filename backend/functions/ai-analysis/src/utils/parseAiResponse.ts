const parseAiResponse = (airesponse: string) => {
  const temp = airesponse.split('\n');

  // Filter non empty strings
  const filteredTemp = temp.filter((item) => item.trim() !== '');

  // Trim all the items
  const trimmed = filteredTemp.map((item) => item.trim());

  // Remove the bullet hyphen
  const final = trimmed.map((item) => item.slice(2));

  return final;
};

export default parseAiResponse;
