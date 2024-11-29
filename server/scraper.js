const getImages = async (query, moderate, retries, iterations) => {
  let reqUrl = url + "i.js?";
  let keywords = query;
  let p = moderate ? 1 : -1; // filter gambar moderate atau tidak
  let attempt = 0;
  let results = [];

  try {
    let dataCache = Cache.get("images::" + keywords);
    if (dataCache == undefined) {
      let token = await getToken(keywords);
      let params = new URLSearchParams({
        l: "wt-wt",
        o: "json",
        q: keywords,
        vqd: token,
        f: ",,,",
        p: "" + p,
      }).toString();

      let data = null;
      let itr = 0;

      while (itr < iterations) {
        while (true) {
          try {
            let response = await curlContent(reqUrl + params);
            data = JSON.parse(response);
            if (!data.results) throw "No results";
            break;
          } catch (error) {
            attempt += 1;
            if (attempt > retries) {
              return results;  // Hanya kembalikan hasil yang berhasil dikumpulkan
            }
            await sleep(5000);
            continue;
          }
        }

        // Ambil hanya URL gambar dari results
        results = [
          ...results,
          ...data.results.map((result) => result.image)
        ];
        Cache.set("images::" + keywords, results);

        if (!data.next) {
          return results;  // Jika tidak ada gambar lagi
        }

        reqUrl = url + data["next"];
        itr += 1;
        attempt = 0;
      }
    } else {
      results = dataCache;
    }
  } catch (error) {
    console.error(error);
  }
  
  Cache.close();
  return results;
};
