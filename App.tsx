import React, { useEffect, useState } from "react";
import { View, Text, TextInput,TouchableOpacity, FlatList } from "react-native";
import dibujar from "./Styles";
import RenderItem from "./RenderItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

const tareas=[]
 export interface Task{
  titulo:string,
  estado:boolean,
  fecha: Date
}


export default function App(){
  const[text,setText]=useState('')
  const [tareas,setTask]=useState<Task[]>([])

  const storeData=async (value:Task[])=>{
    try{
      await AsyncStorage.setItem('my-key',JSON.stringify(value));
    } catch(e){
      //saving error
    }
  }
  const getData=async ()=>{
    try{
      const value=await AsyncStorage.getItem('my-key');
      if(value!==null){
        const tasksLocal=JSON.parse(value)
        setTask(tasksLocal)
      }
    } catch(e){
      //saving error
    }
  };
  useEffect(()=>{
    getData()
  },[])
  const addTask=()=>{
    const tmp=[...tareas]
    const newTask={
      titulo:text,
      estado:false,
      fecha:new Date()
    }
    tmp.push(newTask)
    setTask(tmp)
    storeData(tmp)
    setText('')
  }
  const markdone=(tarea:Task)=>{
    const tmp=[...tareas]
    const index=tmp.findIndex(k=>k.titulo===tarea.titulo)
    const t=tmp[index]
    t.estado=!t.estado
    setTask(tmp)
    storeData(tmp)
    console.log("Done")}
  const deleteFunction=(tarea:Task)=>{
    const tmp=[...tareas]
    const index=tmp.findIndex(k=>k.titulo===tarea.titulo)
    tmp.splice(index,1)
    storeData(tmp)
    console.log("delete")}
  return(
    <View style={dibujar.Container}>
      <Text style={dibujar.Title}>
        HOLA BUENAS TARDES
      </Text>
      <View style={dibujar.InputContainer}>
        <TextInput placeholder="Agregar" 
        style={dibujar.TextInput}
        value={text}
        onChangeText={(t:string)=>setText(t)}
        />
        <TouchableOpacity 
        style={dibujar.Buttonn}
        onPress={addTask}>
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
