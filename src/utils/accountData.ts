
export const getMostRecentAccountData = async (api: string) => {
  const response = await fetch(api).catch((err) => null).then((res) => res?.json());
  return response;
}