interface IFetchOption {
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  content: "string";
}

export const useFetch = async (option: IFetchOption) => {
  try {
    const res = await fetch(option.url, {
      method: option.method,
      headers: {
        "Content-Type": option.content,
      },
    });

    if (!res.ok) throw new Error("Error fetching data");

    const data = await res.json();
    return data;
  } catch (error) {
    console.log((error as Error).message);
    return null;
  }
};
