import { Keyboard, TouchableOpacity, View } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ViewComponent from "../../../components/ViewComponent";
import TextComponent from "../../../components/TextComponent";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import BottomSheet from "@gorhom/bottom-sheet";
import InputComponent from "../../../components/InputComponent";
import SearchIcon from "../../svg/SearchIcon";
import SpaceComponent from "../../../components/SpaceComponent";
import { marketTrends } from "@/redux/reducers/homeSlice";
import { FlatList } from "react-native-gesture-handler";
import ProfitTick from "../../svg/ProfitTick";
import ScreenLoader from "../../../components/ScreenLoader";
import Accordion from "../../../components/Accordion";

type StockData = {
  change: number;
  change_percent: number | string;
  country_code: string;
  currency: string;
  exchange: string;
  exchange_close: string;
  exchange_open: string;
  google_mid: string;
  last_update_utc: string;
  name: string;
  pre_or_post_market: number;
  pre_or_post_market_change: number;
  pre_or_post_market_change_percent: number;
  previous_close: number;
  price: number;
  symbol: string;
  timezone: string;
  type: string;
  utc_offset_sec: number;
};

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const [bottomSheetHeight, setBottomSheetHeight] = useState<string>("50%");
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<StockData[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [stopRendering, setStopRendering] = useState<string>("");
  const [filteredResult, setFilteredResult] = useState<StockData[]>([]);
  const snapPoints = useMemo(() => ["4.5%", "25%", "50%", "70%", "100%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const isLoading = useAppSelector((state) => state.Home.HomeState.loading);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetHeight(index === 0 ? "50%" : "100%");
    setShowSearchBar(index !== 0);
  }, []);

  useEffect(() => {
    console.log("inside useEffect value: ", stopRendering);
    if (stopRendering === "") marketTrendsAPI();
  }, [stopRendering]);
  console.log("outside useEffect value: ", stopRendering);
  const marketTrendsAPI = async () => {
    try {
      const api = await dispatch(marketTrends());
      const data = await api.payload;
      console.log("Data: ", data?.data?.trends);
      setStopRendering("429");
      setSearchResults(data?.data?.trends);
    } catch (e) {
      console.log("Caught an error :", e);
    }
  };

  const loadMoreData = useCallback(() => {
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, index) => ({
        id: currPage * 10 + index,
        title: `Item ${currPage * 10 + index}`,
      }));
      setSearchResults((prev: any) => [...prev, ...newData]);
    }, 1000);
  }, []);

  const goToPage = (page: number) => {
    setCurrPage(page);
  };

  const renderPageItems = () => {
    const startIndex = (currPage - 1) * 5;
    const endIndex = startIndex + 5;
    return searchResults.slice(startIndex, endIndex);
  };
  const handleChangeText = (text: string) => {
    setSearchQuery(text);
    const filtered = searchResults.filter((item: StockData) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredResult(filtered);
  };

  const renderPaginationControls = () => {
    const pageCount = 10;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        {currPage > 1 && (
          <TouchableOpacity onPress={() => setCurrPage(currPage - 1)}>
            <TextComponent
              text="<"
              color="#000"
              size={24}
              styles={{ marginHorizontal: 12 }}
            />
          </TouchableOpacity>
        )}
        {Array.from({ length: pageCount }, (_, index) => index + 1).map(
          (page) => (
            <TouchableOpacity
              key={page}
              onPress={() => goToPage(page)}
              style={{ padding: 5, flexDirection: "row" }}
            >
              <TextComponent
                size={currPage === page ? 20 : 16}
                text={String(page)}
                color="#000"
              />
            </TouchableOpacity>
          )
        )}
        {currPage < 10 && (
          <TouchableOpacity onPress={() => setCurrPage(currPage + 1)}>
            <TextComponent
              text=">"
              color="#000"
              size={24}
              styles={{ marginHorizontal: 12 }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <ViewComponent padding={false} bgColor="#DCDCDC">
      <View style={{ flex: 1 }}>
        <BottomSheet
          style={{
            shadowColor: "#000000",
            shadowOffset: { width: 10, height: 80 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 10,
            borderBlockColor: "#000",
          }}
          handleIndicatorStyle={{
            backgroundColor: bottomSheetHeight === "100%" ? "#fff" : "#000",
            shadowColor: "#000000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}
          index={0}
          onChange={(txt) => handleSheetChanges(txt)}
          ref={bottomSheetRef}
          snapPoints={["50%", "100%"]}
        >
          {showSearchBar && (
            <React.Fragment>
              <SpaceComponent height={10} />
              <View style={{ paddingHorizontal: 16 }}>
                <InputComponent
                  leftIcon={<SearchIcon />}
                  inputStyle={{ alignSelf: "center" }}
                  placeholder="Search for stocks"
                  allowBorderWidth={false}
                  value={searchQuery}
                  onChange={(txt) => handleChangeText(txt)}
                  bgColor="#ebebeb"
                  color="#000"
                />
              </View>
            </React.Fragment>
          )}
          <View style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 16 }}>
            <SpaceComponent />
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={searchQuery.length > 0 ? filteredResult : renderPageItems()}
              contentContainerStyle={{
                height: "100%",
              }}
              onEndReached={() => {
                if (searchResults.length % 5 === 0) {
                  loadMoreData();
                }
              }}
              onEndReachedThreshold={0.1}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({
                item,
                index,
              }: {
                item: StockData;
                index: number;
              }) => {
                return (
                  <>
                    <TouchableOpacity
                      onLongPress={() => {}}
                      onPress={() => Keyboard.dismiss()}
                      style={{ margin: 20, left: 80 }}
                    >
                      <TextComponent
                        text={item.symbol ?? ""}
                        color="#000"
                        size={20}
                      />
                      <TextComponent
                        text={item.name ?? ""}
                        color="#DCDCDC"
                        size={16}
                      />
                      <View
                        style={{
                          alignItems: "center",
                          gap: 8,
                          flexDirection: "row",
                        }}
                      >
                        <TextComponent
                          text={`$ ${item.price ?? ""}`}
                          color="#000"
                          size={20}
                        />
                        <ProfitTick />
                        <TextComponent
                          text={String(item.change_percent) ?? "" + " %"}
                          color="#34C759"
                        />
                      </View>
                    </TouchableOpacity>
                    <View
                      style={{
                        borderBottomColor: "#DCDCDC",
                        borderBottomWidth: 1,
                      }}
                    />
                  </>
                );
              }}
            />
            {renderPaginationControls()}
          </View>
        </BottomSheet>
        {isLoading && <ScreenLoader />}
      </View>
    </ViewComponent>
  );
};
export default HomeScreen;
