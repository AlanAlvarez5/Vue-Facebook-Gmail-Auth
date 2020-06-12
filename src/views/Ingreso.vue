<template>
    <v-container>
        <v-row justify="center">
            <v-col xs=12 sm=8 md=6 xl=4>
                <v-card dark>
                    <v-card-text class="text-center display-1 text-uppercase" :class="registro ? 'accent': 'secondary'">
                        <span v-if="!registro">Ingreso</span>
                        <span v-if="registro">Registro</span>
                    </v-card-text>

                    <v-card-text>
                        <v-btn block color="error" @click="google">
                            <v-icon left dark>fab fa-google</v-icon>
                            Google
                        </v-btn>
                        <v-btn block color="info" class="mt-3">
                            <v-icon left dark>fab fa-facebook</v-icon>
                            Facebook
                        </v-btn>
                    </v-card-text>

                    <v-card-text>
                        <v-btn block @click="registro = !registro">
                            <span v-if="!registro">
                                ¿No tienes cuenta? Registrate
                            </span>
                            <span v-if="registro">
                                ¿Ya tienes cuenta? Inicia Sesión
                            </span>
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    
</template>

<script>

import { firebase, auth } from "@/firebase"

export default {
    name: 'Ingreso',
    data (){
        return {
            registro: false
        }
    },
    methods:{
        async google(){
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().languageCode = 'es';
            try {
                const res = await firebase.auth().signInWithPopup(provider);
                const user = res.user;
                console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
    }
}

</script>>