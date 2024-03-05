<template>
    <v-app-bar flat>
        <v-app-bar-title>
            <div class="d-flex justify-space-between px-4 mx-6">
                <div
                    style="cursor: pointer"
                    @click="router.push({ name: 'Home' })"
                >
                    <v-icon icon="mdi-circle-slice-4" />
                    Base Preset
                </div>
                <div class="d-flex justify-space-between">
                    <div>Your have : {{ money }} baht</div>
                    <div>
                        <v-btn @click="open = true"> Topup </v-btn>
                    </div>
                </div>
            </div>
        </v-app-bar-title>
    </v-app-bar>
    <v-dialog max-width="500" v-model="open">
        <v-card title="Topup">
            <v-card-text>
                <v-text-field
                    label="put your money"
                    v-model="textValue"
                    variant="outlined"
                ></v-text-field>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="Close Dialog" @click="close"></v-btn>
                <v-btn text="add Money" @click="add"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue'
import {  useMoneyPluginSymbol } from '@/composables/useMoney'
import router from '@/router'
const textValue = ref('')
const  useMoney  = inject(useMoneyPluginSymbol)!
const { money, addMoney,init } = useMoney

const open = ref(false)
function close() {
    open.value = false
    textValue.value = ''
}
function add() {
    if (!isNaN(parseInt(textValue.value))) {
        addMoney(parseInt(textValue.value))
        open.value = false
        textValue.value = ''
        return
    }
    alert('number pls')
    textValue.value = ''
}
function updateMoney(){
    init()
}
defineExpose({
    updateMoney
  })
</script>
