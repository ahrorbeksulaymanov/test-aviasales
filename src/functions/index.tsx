type dataType = {
    price: number;
    carrier: string;
    segments: Array<segmentType>;
  };
  
  type segmentType = {
    origin: string;
    destination: string;
    date: string;
    stops: Array<string>;
    duration: number;
  };

export const filterData = async (
    noneStop: boolean,
    oneStop: boolean,
    twoStop: boolean,
    threeStop: boolean,
    sales: any
  ) => {
    let response: Array<dataType> = [];
    sales.map((item: dataType) => {
      let segments: Array<segmentType> = [];
      if (noneStop) {
        item?.segments?.map((item: segmentType) => {
          if (item.stops.length === 0) {
            segments.push(item);
          }
        });
      }
      if (oneStop) {
        item?.segments?.map((item: segmentType) => {
          if (item.stops.length === 1) {
            segments.push(item);
          }
        });
      }
      if (twoStop) {
        item?.segments?.map((item: segmentType) => {
          if (item.stops.length === 2) {
            segments.push(item);
          }
        });
      }
      if (threeStop) {
        item?.segments?.map((item: segmentType) => {
          if (item.stops.length === 3) {
            segments.push(item);
          }
        });
      }
      if (segments?.length > 0) {
        response.push({
          ...item,
          segments: segments,
        });
      }
    });
    return response.slice(0, 5)
  };