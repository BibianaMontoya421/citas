import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Modal,
  SafeAreaView,
  TextInput,
  View,
  ScrollView,
  Button,
  Platform,
  Pressable,
  Alert,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function Formulario({
  modalVisible,
  setModalVisible,
  pacientes,
  setPacientes,
  paciente: pacienteObj,
  setPaciente: setPacienteApp,
}) {
  const [paciente, setPaciente] = useState("");
  const [id, setId] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("");
  const [sintomas, setSintomas] = useState("");

  useEffect(() => {
    if (Object.keys(pacienteObj).length > 0) {
      setPaciente(pacienteObj.paciente);
      setId(pacienteObj.id);
      setPropietario(pacienteObj.propietario);
      setEmail(pacienteObj.email);
      setTelefono(pacienteObj.telefono);
      setDate(pacienteObj.date);
      setSintomas(pacienteObj.sintomas);
    }
  }, [pacienteObj]);

  const handleCita = () => {
    //Validar los campos del formulario
    if ([paciente, propietario, telefono, date, sintomas].includes("")) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    //Validar si es registro nuevo o edición
    const nuevoPaciente = {
      paciente,
      propietario,
      email,
      telefono,
      date,
      sintomas,
    };

    if (id) {
      //Editando
      nuevoPaciente.id = id;
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState
      );
      setPacientes(pacientesActualizados);
      setPacienteApp({});
    } else {
      //Creando
      nuevoPaciente.id = Date.now();
      setPacientes([...pacientes, nuevoPaciente]);
    }

    setModalVisible(!modalVisible);
    setId("");
    setPaciente("");
    setPropietario("");
    setEmail("");
    setTelefono("");
    setDate(new Date());
    setSintomas("");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>
        <ScrollView>
          <Text style={styles.titulo}>
            {pacienteObj.id ? "Editar" : "Nueva"} Cita
          </Text>
          <Pressable
            style={styles.btnCancelar}
            onLongPress={() => {
              setModalVisible(false);
              setId("");
              setPacienteApp({});
              setPaciente("");
              setPropietario("");
              setEmail("");
              setTelefono("");
              setDate(new Date());
              setSintomas("");
            }}
          >
            <Text style={styles.btnCancelarTexto}>X Cancelar</Text>
          </Pressable>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Paciente</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Paciente"
              placeholderTextColor={"#666"}
              value={paciente}
              onChangeText={setPaciente}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Nombre Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre Propietario"
              placeholderTextColor={"#666"}
              value={propietario}
              onChangeText={setPropietario}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Email Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Propietario"
              placeholderTextColor={"#666"}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Teléfono Propietario</Text>
            <TextInput
              style={styles.input}
              placeholder="Teléfono Propietario"
              placeholderTextColor={"#666"}
              keyboardType="phone-pad"
              value={telefono}
              onChangeText={setTelefono}
              maxLength={10}
            />
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Fecha de Alta</Text>
            <Button onPress={showDatepicker} title={date.toLocaleString()} />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          <View style={styles.campo}>
            <Text style={styles.label}>Sintomas</Text>
            <TextInput
              style={[styles.input, styles.sintomasInput]}
              placeholder="Sintomas Paciente"
              placeholderTextColor={"#666"}
              value={sintomas}
              onChangeText={setSintomas}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <Pressable style={styles.btnnuevaCita} onPress={handleCita}>
            <Text style={styles.btnnuevacitaTexto}>
              {pacienteObj.id ? "Editar" : "Agregar"} Paciente
            </Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  contenido: {
    backgroundColor: "#0F3664",
    flex: 1,
  },
  titulo: {
    fontSize: 30,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 30,
    color: "white",
  },
  tituloBold: {
    fontWeight: "900",
  },
  btnCancelar: {
    marginVertical: 30,
    backgroundColor: "#3390FF",
    marginHorizontal: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  btnCancelarTexto: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
  },
  campo: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  label: {
    color: "#FFF",
    marginBottom: 10,
    marginTop: 15,
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 15,
    fontSize: 18,
    borderRadius: 10,
  },
  sintomasInput: {
    height: 100,
  },
  fechacontenedor: {
    backgroundColor: "#FFF",
    borderRadius: 10,
  },
  btnnuevaCita: {
    marginVertical: 50,
    backgroundColor: "#F59E0B",
    paddingVertical: 15,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  btnnuevacitaTexto: {
    textAlign: "center",
    color: "#0F3664",
    fontWeight: "700",
    fontSize: 16,
  },
});
