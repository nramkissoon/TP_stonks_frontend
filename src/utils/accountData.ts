
// TODO add types and validation

export const getMostRecentAccountData = async (api: string) => {
  const response = await fetch(api).catch((err) => console.log(err)).then((res) => res ? res.json() : null);
  return response;
}