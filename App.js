import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Pressable,
  FlatList,
  Modal,
  Alert,
} from "react-native";

import Formulario from "./src/components/Formulario";
import Paciente from "./src/components/Paciente";
import InformacionPaciente from "./src/components/InformacionPaciente";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [modalPaciente, setModalPaciente] = useState(false);

  const pacienteEditar = (id) => {
    const pacienteEditar = pacientes.filter((paciente) => paciente.id === id);
    setPaciente(pacienteEditar[0]);
  };

  const pacienteEliminar = (id) => {
    Alert.alert(
      "¿Desea eliminar este paciente?",
      "Un paciente eliminado no se puede recuperar",
      [
        { text: "Cancelar" },
        {
          text: "Aceptar",
          onPress: () => {
            const pacientesActualizados = pacientes.filter(
              (pacientesState) => pacientesState.id !== id
            );
            setPacientes(pacientesActualizados);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>
        {`\n Control de citas `}{" "}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>
      <Pressable
        style={styles.btnNuevaCita}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnTextoNuevaCita}>Solicitar Cita</Text>
      </Pressable>

      {pacientes === 0 ? (
        <Text style={styles.noPaciente}>No hay pacientes aún </Text>
      ) : (
        <FlatList
          style={styles.listado}
          data={pacientes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                pacienteEditar={pacienteEditar}
                pacienteEliminar={pacienteEliminar}
                setModalPaciente={setModalPaciente}
                setPaciente={setPaciente}
              />
            );
          }}
        />
      )}

      <Formulario
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        pacientes={pacientes}
        setPacientes={setPacientes}
        paciente={paciente}
        setPaciente={setPaciente}
      />
      <Modal visible={modalPaciente} animationType="fade">
        <InformacionPaciente
          paciente={paciente}
          setPaciente = {setPaciente}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightgray",
    flex: 1,
  },
  titulo: {
    textAlign: "center",
    fontSize: 30,
    color: "#0F3664",
    fontWeight: "600",
  },
  tituloBold: {
    fontWeight: "900",
    color: "#0F3664",
  },
  btnNuevaCita: {
    backgroundColor: "#0F3664",
    padding: 20,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  btnTextoNuevaCita: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  noPaciente: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30,
  },
});

export default App;
