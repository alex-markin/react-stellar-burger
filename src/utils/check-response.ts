export const checkResponse = async <T>(res: Response): Promise<T> => {
  if (res.ok) {
    return res.json();
  } else {
    const err = await res.json();
    return Promise.reject(err);
  }
};
