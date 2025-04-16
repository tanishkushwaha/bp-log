import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "@/theme/ThemeContext";
import { colors } from "@/theme/colors";
import PickerField from "@/components/PickerField";
import TextField from "@/components/TextField";
import DatePicker from "react-native-date-picker";
import {
  defaultFormState,
  FormDataType,
  useFormData,
} from "@/contexts/FormDataContext";

export default function Add() {
  const { theme } = useTheme();

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);

  const { formData, setFormData } = useFormData();

  useEffect(() => {
    return () => {
      setFormData(defaultFormState);
    };
  }, []);

  const setDate = (val: Date) => {
    setFormData((prev): FormDataType => {
      return {
        ...prev,
        date: val,
      };
    });
  };

  const setTime = (val: Date) => {
    setFormData((prev): FormDataType => {
      return {
        ...prev,
        time: val,
      };
    });
  };

  // Modal openers
  const openDatePicker = () => setDatePickerOpen(true);
  const openTimePicker = () => setTimePickerOpen(true);

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: colors[theme].primary,
          flex: 1,
        },
        bp: {
          flexDirection: "row",
          gap: 18,
          marginTop: 12,
        },
        dateTime: {
          flexDirection: "row",
          gap: 12,
          marginTop: 12,
        },
        form: {
          paddingHorizontal: 12,
        },
      }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <DateTimePanel
          formData={formData}
          openDatePicker={openDatePicker}
          openTimePicker={openTimePicker}
        />
        <BPPanel formData={formData} setFormData={setFormData} />
      </View>
      {/* Modals */}
      <DatePicker
        modal
        mode='date'
        open={datePickerOpen}
        date={formData.date}
        onConfirm={(date) => {
          setDatePickerOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />
      <DatePicker
        modal
        mode='time'
        open={timePickerOpen}
        date={formData.time}
        onConfirm={(time) => {
          setTimePickerOpen(false);
          setTime(time);
        }}
        onCancel={() => {
          setTimePickerOpen(false);
        }}
      />
    </View>
  );
}

function DateTimePanel({
  formData,
  openDatePicker,
  openTimePicker,
}: {
  formData: FormDataType;
  openDatePicker: () => void;
  openTimePicker: () => void;
}) {
  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          gap: 12,
          marginTop: 12,
        },
      }),
    []
  );
  return (
    <View style={styles.container}>
      <PickerField
        title={formData.date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
        style={{ flex: 2 }}
        onPress={openDatePicker}
      />
      <PickerField
        title={formData.time.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
        style={{ flex: 1 }}
        onPress={openTimePicker}
      />
    </View>
  );
}

function BPPanel({
  formData,
  setFormData,
}: {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
}) {
  const { theme } = useTheme();

  const handleSysChange = (val: string) => {
    setFormData((prev): FormDataType => {
      return {
        ...prev,
        sys: val,
      };
    });
  };

  const handleDiaChange = (val: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        dia: val,
      };
    });
  };

  const handlePulseChange = (val: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        pulse: val,
      };
    });
  };

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: "row",
          gap: 12,
          marginTop: 12,
        },
        unitText: {
          color: colors[theme].text,
          position: "absolute",
          bottom: -18,
          left: 12,
          fontSize: 12,
        },
        separator: {
          color: colors[theme].text,
          position: "absolute",
          right: -9,
          top: 18,
        },
      }),
    []
  );

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, position: "relative" }}>
        <TextField
          placeholder='Sys'
          inputMode='numeric'
          value={formData.sys}
          onChangeText={handleSysChange}
        />
        <Text style={styles.unitText}>mmHg</Text>
        <Text style={styles.separator}>/</Text>
      </View>
      <View style={{ flex: 1, position: "relative" }}>
        <TextField
          placeholder='Dia'
          inputMode='numeric'
          value={formData.dia}
          onChangeText={handleDiaChange}
        />
        <Text style={styles.unitText}>mmHg</Text>
      </View>
      <View style={{ flex: 1, position: "relative" }}>
        <TextField
          placeholder='Pulse'
          inputMode='numeric'
          value={formData.pulse}
          onChangeText={handlePulseChange}
        />
        <Text style={styles.unitText}>BPM</Text>
      </View>
    </View>
  );
}
