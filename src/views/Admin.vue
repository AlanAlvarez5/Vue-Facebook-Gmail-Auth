<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="6" >
                <v-card class="text-center">
                    <v-card-text>
                        <v-avatar>
                            <img :src="usuario.foto" alt="avatar">
                        </v-avatar>
                    </v-card-text>
                    <v-card-text>
                        <h3>{{usuario.nombre}}</h3>
                    </v-card-text>
                    <v-card-text>

                        <input type="file" ref="boton" class="d-none" @change="buscarImagen($event)">

                        <v-btn color="primary" @click="$refs.boton.click()">Buscar Imagen</v-btn>
                        <v-btn :disabled="file === null" class="ml-3" color="secondary" @click="subirImagen" :loading="loading">Subir Imagen</v-btn>
                    </v-card-text>

                    <v-card-text v-id="error">
                        <h4>{{error}}</h4>
                    </v-card-text>

                    <v-card-text v-if="file">
                        <h4>{{file.name}}</h4>
                        <v-img :src="urlTemporal">
                        </v-img>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
        
    
</template>

<script>
import { mapState } from 'vuex'
import { firebase, storage, db} from '@/firebase.js'

export default {
    data() {
        return {
            file: null,
            urlTemporal: '',
            loading : false,
            error : null
        }
    },
    computed:{
        ...mapState(['usuario'])
    },
    methods: {
        buscarImagen(event){

            const tipoArchivo = event.target.files[0].type

            if ( tipoArchivo === 'image/jpeg' || tipoArchivo === 'image/png'){

                this.file = event.target.files[0]
            }
            else{
                this.error = "Archivo no valido"
                this.file = null
                this.error = null
                return
            }

            const reader = new FileReader();
            reader.readAsDataURL(this.file)
            reader.onload = (e) => {
                this.urlTemporal = e.target.result
            }
        },
        async subirImagen(){
            try {
                this.loading = true

                const refImagen = storage.ref().child(this.usuario.email).child('foto')
                const res = await refImagen.put(this.file)

                const urlDescarga = await refImagen.getDownloadURL()

                this.usuario.foto = urlDescarga

                await db.collection('usuarios').doc(this.usuario.uid).update({
                    foto : urlDescarga
                })

                

            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
                this.file = null
                this.urlTemporal = ''
            }
        }
    },
}
</script>