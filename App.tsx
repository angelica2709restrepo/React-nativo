import React from "react";
import { View, Text, TextInput,TouchableOpacity, FlatList } from "react-native";
import dibujar from "./Styles";
import RenderItem from "./RenderItem";

const tareas=[
  {Titulo:"Lavar loza",
  estado:false,
  fecha:new Date(),
  },
  {Titulo:"Cocinar",
    estado:true,
    fecha:new Date(),
  },
  {Titulo:"Dormir",
    estado:false,
    fecha:new Date(),
  },
]
 export interface Task{
  Titulo:string,
  estado:boolean,
  fecha: Date
}


export default function App(){
  const markdone=()=>{console.log("Done")}
  const deleteFunction=()=>{console.log("delete")}
  return(
    <View style={dibujar.Container}>
      <Text style={dibujar.Title}>
        HOLA BUENAS TARDES
      </Text>
      <View style={dibujar.InputContainer}>
        <TextInput placeholder="Agregar" style={dibujar.TextInput}/>
        <TouchableOpacity style={dibujar.Buttonn}>
          <Text style={dibujar.wtext}>
            Enviar
          </Text>
        </TouchableOpacity>
      </View>
      <View >
        <FlatList
        renderItem={({item})=>
        (<RenderItem
        item={item}
        markDone={markdone}
        deleteFunction={deleteFunction}
        />)}//para pasar props en react
        data={tareas}
        />
      </View>
    </View>
  )
  }
