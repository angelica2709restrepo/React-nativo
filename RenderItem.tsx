import React from "react";
import { View, Text,TouchableOpacity } from "react-native";
import dibujar from "./Styles";
import { Task } from "./App";

interface ItemProps{
    item:Task
    markDone:()=>void;
    deleteFunction:()=>void;
}


export default function RenderItem({item,markDone,deleteFunction}:ItemProps){
    return(
    <View style={dibujar.taskcontainer}>
      <TouchableOpacity onPress={markDone}>
      <Text 
      style={item.estado ? dibujar.textodone: dibujar.textt}
      >
      {item.Titulo}
      </Text>
      <Text style={dibujar.textt}>
      {item.fecha.toDateString()}
      </Text>
      </TouchableOpacity>
      {
      item.estado &&
      <TouchableOpacity style={dibujar.removebutton} onPress={deleteFunction}>
        <Text style={dibujar.wtext}>
          Eliminar
        </Text>
      </TouchableOpacity>}
    </View>
  )
  }
 