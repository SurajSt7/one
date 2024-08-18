import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

type AccordionItem = {
  title?: string;
  content: string;
};

type AccordionProps = {
  data: AccordionItem[];
};

const Accordion: React.FC<AccordionProps> = ({ data }) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  if (Platform.OS === "android") {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleSection = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeSections.includes(index)) {
      setActiveSections(activeSections.filter((section) => section !== index));
    } else {
      setActiveSections([...activeSections, index]);
    }
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.accordionItem}>
          <TouchableOpacity
            onPress={() => toggleSection(index)}
            style={styles.titleContainer}
          >
            {/* <Text style={styles.title}>{item.title}</Text> */}
          </TouchableOpacity>
          {activeSections.includes(index) && (
            <View style={styles.contentContainer}>
              <Text style={styles.content}>{item.content}</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  accordionItem: {
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    overflow: "hidden",
  },
  titleContainer: {
    padding: 15,
    backgroundColor: "#005AAA",
  },
  title: {
    fontSize: 18,
    color: "#fff",
  },
  contentContainer: {
    padding: 15,
    backgroundColor: "#f1f1f1",
  },
  content: {
    fontSize: 16,
    color: "#333",
  },
});

export default Accordion;
