import { Container, Grid, GridItem, VStack } from "@chakra-ui/react";
import "./style.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Checkbox } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { filterData } from "../../functions";

const MainPage = () => {
  const [sales, setsales] = useState([]);
  const [filteredData, setfilteredData] = useState<any>([]);
  const [filters, setfilters] = useState({
    all: true,
    notPer: true,
    per1: true,
    per2: true,
    per3: true,
  });

  const { isLoading, error, data } = useQuery("repoData", () => {
    axios(`https://front-test.beta.aviasales.ru/search`).then((res) =>
      axios(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${res?.data?.searchId}`
      ).then((response) => {
        setsales(response?.data?.tickets);
      })
    );
  });

  useEffect(() => {
    setfilteredData(sales?.slice(0, 5));
  }, [sales]);


  useEffect(() => {
    (async () => {
      if(filters.all){
        await filterData(filters.notPer, filters.per1, filters.per2, filters.per3, sales).then(res => setfilteredData(res));
      }else{
        await filterData(false, false, false, false, sales).then(res => setfilteredData(res));
      }
    })();
  }, [filters]);

  return (
    <div className="main_class">
      <VStack>
        <Container maxW="container.xl">
          <Grid columns={[2, null, 3]} templateColumns="repeat(7, 1fr)" gap={4}>
            <GridItem colSpan={2}>
              <div className="filter_wrapper">
                <p>Количество перасадок</p>
                <Checkbox
                  onChange={(e) =>{
                    setfilters({
                      all: e.target.checked,
                      notPer: filters.notPer,
                      per1: filters.per1,
                      per2: filters.per2,
                      per3: filters.per3,
                    });
                    e.target.checked === false ?
                    setfilters({
                      all: false,
                      notPer: false,
                      per1: false,
                      per2: false,
                      per3: false,
                    })
                    :
                    setfilters({
                      all: true,
                      notPer: true,
                      per1: true,
                      per2: true,
                      per3: true,
                    })
                  }
                  }
                  isChecked={filters.all}
                  className="filter_checkbox"
                  defaultIsChecked
                >
                  Все
                </Checkbox>
                <Checkbox
                  name="all"
                  onChange={(e) =>
                    setfilters({
                      all: filters.all,
                      notPer: e.target.checked,
                      per1: filters.per1,
                      per2: filters.per2,
                      per3: filters.per3,
                    })
                  }
                  isChecked={filters.notPer}
                  className="filter_checkbox"
                  defaultIsChecked
                >
                  Без пересадок
                </Checkbox>
                <Checkbox
                  onChange={(e) =>
                    setfilters({
                      all: filters.all,
                      notPer: filters.notPer,
                      per1: e.target.checked,
                      per2: filters.per2,
                      per3: filters.per3,
                    })
                  }
                  className="filter_checkbox"
                  isChecked={filters.per1}
                  defaultIsChecked
                >
                  1 пресадка
                </Checkbox>
                <Checkbox
                  onChange={(e) =>
                    setfilters({
                      all: filters.all,
                      notPer: filters.notPer,
                      per1: filters.per1,
                      per2: e.target.checked,
                      per3: filters.per3,
                    })
                  }
                  className="filter_checkbox"
                  isChecked={filters.per2}
                  defaultIsChecked
                >
                  2 пресадка
                </Checkbox>
                <Checkbox
                  onChange={(e) =>
                    setfilters({
                      all: filters.all,
                      notPer: filters.notPer,
                      per1: filters.per1,
                      per2: filters.per2,
                      per3: e.target.checked,
                    })
                  }
                  className="filter_checkbox"
                  isChecked={filters.per3}
                  defaultIsChecked
                >
                  3 пресадка
                </Checkbox>
              </div>
            </GridItem>
            <GridItem colSpan={5}>
              <Tabs variant="unstyled">
                <TabList>
                  <div style={{ backgroundColor: "#fff", width: "50%" }}>
                    <Tab
                      style={{
                        borderRadius: "5px 0px 0px 5px",
                        boxShadow: "0 0 3px #999",
                        width: "100%",
                      }}
                      _selected={{ color: "white", bg: "#2196f3" }}
                    >
                      САМЫЙ ДЕШЕВЫЙ
                    </Tab>
                  </div>
                  <div style={{ backgroundColor: "#fff", width: "50%" }}>
                    <Tab
                      style={{
                        borderRadius: "0 5px 5px 0",
                        boxShadow: "0 0 3px #999",
                        width: "100%",
                      }}
                      _selected={{ color: "white", bg: "#2196f3" }}
                    >
                      САМЫЙ БЫСТРЫЙ
                    </Tab>
                  </div>
                </TabList>
                <TabPanels>
                  <TabPanel style={{ padding: "0 0 100px 0" }}>
                    {filteredData &&
                      filteredData?.map((item: any, index: number) => (
                        <div
                          key={index}
                          className="item"
                          style={{ marginTop: "20px" }}
                        >
                          <div className="justify-content-between">
                            <p className="price">13 400 P</p>
                            <p>Logo img</p>
                          </div>
                          {item?.segments?.map((i: any, n: number) => (
                            <div
                              key={n}
                              className="justify-content-between item-content"
                            >
                              <div>
                                <span>
                                  {i?.origin} - {i?.destination}
                                </span>
                                <p>{i?.date?.slice(11, 16)} - 08:00</p>
                              </div>
                              <div>
                                <span>В ПУТИ</span>
                                <p>21ч 35м</p>
                              </div>
                              <div>
                                <span>{i?.stops?.length} ПЕРЕСАДКИ</span>
                                {i?.stops?.map(
                                  (stop: any, stop_index: number) => (
                                    <p key={stop_index}>{stop}</p>
                                  )
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                  </TabPanel>
                  <TabPanel>
                    <p>САМЫЙ БЫСТРЫЙ</p>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </GridItem>
          </Grid>
        </Container>
      </VStack>
    </div>
  );
};
export default MainPage;
