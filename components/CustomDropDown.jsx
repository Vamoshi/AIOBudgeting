import { Block, theme } from "galio-framework";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet, Dimensions } from "react-native";
import { updateHealth } from "../redux/IngredientSearchSlice";
import { useDispatch } from "react-redux";
const { width } = Dimensions.get("screen");

export default CustomDropDown = ({ items, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [itemsState, setItemsState] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setItemsState(items);
  }, [items]);

  const handleOnSelectItem = (selected) => {
    dispatch(updateHealth(selected.value));
  };

  return (
    <Block style={styles.dropdownContainer}>
      <DropDownPicker
        placeholder={placeholder}
        open={open}
        value={value}
        items={itemsState}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItemsState}
        containerStyle={styles.dropdownPicker}
        style={styles.dropdownPicker}
        onSelectItem={handleOnSelectItem}
      />
    </Block>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    borderWidth: 0,
    borderBottomWidth: 0,
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    marginBottom: 24,
    marginTop: 10,
    // elevation: 4,
  },
  dropdownPicker: {
    borderWidth: 0,
    borderBottomWidth: 0,
  },
});
