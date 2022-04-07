import axios from "../api/axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectAccessToken } from "../redux/auth/auth.selector";

const useApi = (url) => {
  const accessToken = useSelector(selectAccessToken);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const getData = async () => {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    setLoading(false);
    setData(data.results);
  };

  useEffect(() => {
    console.log("api hook");
    getData();
  }, []);

  return { loading, data };
};

export default useApi;
