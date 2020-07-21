<template>
     <v-layout>
          <v-row>
               <v-col>
                    <v-card>
                         <v-card-text>
                              <h3>Bienvenido {{usuario.nombre}}</h3>
                         </v-card-text>

                         <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
                              <div v-for="(item, index) in mensajes" :key="index">

                                   <v-row :justify="item.nombre === usuario.nombre ? 'end': 'start'">

                                        <v-chip
                                             class="ma-2"
                                             color="indigo"
                                             text-color="white"
                                        >
                                             <v-avatar left>
                                             <img :src="item.foto" alt="user image">
                                             </v-avatar>
                                             {{item.mensaje}}

                                        </v-chip>
                                   </v-row>
                                   <v-row :justify="item.nombre === usuario.nombre ? 'end': 'start'">
                                        <p class="caption mr-5">{{item.fecha}}</p>
                                   </v-row>
                              </div>
                         </v-card-text>

                         <v-card-text>
                              <v-form @submit.prevent="enviarMensaje" v-model="valido">
                                   <v-text-field 
                                        v-model="mensaje" 
                                        label="Escribe tu mensaje..."
                                        required
                                        :rules="reglas"
                                        >

                                   </v-text-field>
                              </v-form>
                         </v-card-text>

                    </v-card>
               </v-col>
          </v-row>
     </v-layout>
</template>

<script>

import { mapState } from 'vuex';
import { db } from "@/firebase"
import moment from 'moment'

export default {
     name: 'Chat',
     data () {
          return {
               mensaje: '',
               valido: false,
               reglas: [
                    v => !!v || 'Requerido'
               ],
               mensajes: [],
          }
     },
     computed: {
          ...mapState(['usuario'])
     },
     methods: {
          enviarMensaje(){
               if(this.valido){
                    console.log('Enviar Mensaje ' + this.mensaje);

                    db.collection('chats').add({
                         mensaje: this.mensaje,
                         nombre: this.usuario.nombre,
                         foto: this.usuario.foto,
                         fecha: Date.now()
                    }).catch( error => console.log(error))



                    this.mensaje = ''
               } else{
                    console.log('No escribiste nada hdtpm');
               }
          }
     },
     created(){
          moment.locale('es');

          let ref = db.collection('chats').orderBy('fecha', 'desc')

          ref.onSnapshot( querySnapshot => {
               this.mensajes = []


               querySnapshot.forEach( doc => {
                    this.mensajes.unshift({
                         mensaje: doc.data().mensaje,
                         foto: doc.data().foto,
                         nombre: doc.data().nombre,
                         fecha: moment(doc.data().fecha).format('lll')
                    })

               });
          })

     }
}
</script>