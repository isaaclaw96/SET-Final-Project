import React, { useState } from "react";
import { View, Text } from "react-native";

import NumberPlease from "react-native-number-please";

const DateSelector = () => {
  const initialBirthday = [
    { id: "day", value: 16 },
    { id: "month", value: 4 },
    { id: "year", value: 1970 },
  ];

  const [birthday, setBirtday] = useState(initialBirthday);

  const date = [
    { id: "day", label: "", min: 0, max: 31 },
    { id: "month", label: "", min: 0, max: 12 },
    { id: "year", label: "", min: 1900, max: new Date().getFullYear()},
  ]
  console.log(birthday);
  return (
    <View>
      <Text>Due By: </Text>
      <NumberPlease
        digits={date}
        values={birthday}
        onChange={(values) => setBirtday(values)}
      />
    </View>
  );
};

export default DateSelector;