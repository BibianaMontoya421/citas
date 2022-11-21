import React from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import {formatearFecha}  from '../helper/Index'

export default function InformacionPaciente({ paciente, setPaciente, setModalPaciente }) {
  return (
    <SafeAreaView style={styles.contenedor}>
      <Text style={styles.titulo}>Información del paciente</Text>

      <View>
        <Pressable
          onLongPress={() => {
            setModalPaciente(false)
            setPaciente({})
          }}
          style={styles.btnCerrar}
        >
          <Text style={styles.btncerrarTexto}>X Cerrar</Text>
        </Pressable>
      </View>
      <View style={styles.contenido}>
        <View style={styles.campo}>
          <Text style={styles.label}>Paciente</Text>
          <Text style={styles.valor}>{paciente.paciente}</Text>
        </View>
        <View style ={styles.campo}>
          <Text style={styles.label}>Propietario</Text>
          <Text style={styles.valor}>{paciente.propietario}</Text>
        </View>
        <View style ={styles.campo}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.valor}>{paciente.email}</Text>
        </View>
        <View style ={styles.campo}>
          <Text style={styles.label}>Telefono</Text>
          <Text style={styles.valor}>{paciente.telefono}</Text>
        </View>
        <View style ={styles.campo}>
          <Text style={styles.label}>Fecha Alta</Text>
          <Text style={styles.valor}>{formatearFecha(paciente.date)}</Text>
        </View>
        <View style ={styles.campo}>
          <Text style={styles.label}>Sintomas</Text>
          <Text style={styles.valor}>{paciente.sintomas}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: "#36A8B5",
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
  btnCerrar: {
    marginVertical: 30,
    backgroundColor: "#0F3664",
    marginHorizontal: 100,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFF",
  },
  btncerrarTexto: {
    color: "#FFF",
    textAlign: "center",
    fontWeight: "900",
    fontSize: 16,
  },
  contenido: {
    backgroundColor: "#FFF",
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 9.11,

    elevation: 14,
  },
  campo: {
    marginBottom: 10
  },
  label: {
    color: "#374151",
    marginBottom:3,
    fontWeight: "600",
  },
  label: {
    color: "#374151",
    marginBottom:3,
    fontWeight: "600",
  },
  valor: {
    color: "#334155",
    fontSize:20,
    fontWeight: "700",
  },
});
