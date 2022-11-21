import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import {formatearFecha}  from '../helper/Index'

export default function Paciente({
  item,
  setModalVisible,
  pacienteEditar,
  pacienteEliminar,
  setModalPaciente,
  setPaciente,
}) {
  const { paciente, date, id } = item;

  return (
    <Pressable
      onLongPress={() => {
        setModalPaciente(true);
        setPaciente(item);
      }}
    >
      <View style={styles.contenedor}>
        <Text style={styles.label}>Paciente: </Text>
        <Text style={styles.texto}>{paciente}</Text>
        <Text style={styles.label}>{formatearFecha(date)}</Text>

        <View style={styles.contenedorBtn}>
          <Pressable
            style={[styles.btn, styles.btnEditar]}
            onLongPress={() => {
              setModalVisible(true);
              pacienteEditar(id);
            }}
          >
            <Text style={styles.btnTexto}>Editar</Text>
          </Pressable>
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => {
              pacienteEliminar(id);
            }}
          >
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#FFF",
    padding: 20,
    borderBottomColor: "#94a3B8",
    borderBottomWidth: 2,
  },
  label: {
    color: "#374151",
    fontWeight: "900",
    marginBottom: 10,
    fontSize: 16,
  },
  texto: {
    color: "#0F3664",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  fecha: {
    color: "#374151",
    fontWeight: "900",
    fontSize: 16,
  },
  contenedorBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  btnEditar: {
    backgroundColor: "#F59E0B",
  },
  btnEliminar: {
    backgroundColor: "#EF4444",
  },
  btnTexto: {
    fontWeight: "900",
    fontSize: 15,
    color: "#FFF",
  },
});
