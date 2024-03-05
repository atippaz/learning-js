import { type Plugin, type InjectionKey, ref, computed, ComputedRef } from 'vue'
function moneyP(): MoneyFn {
    const money = ref(0)
    function init() {
        if (localStorage.getItem('money') == null) {
            localStorage.setItem('money', '100000')
        }
        money.value = parseFloat(localStorage.getItem('money')!)
        if (money.value < 0) {
            localStorage.setItem('money', '100000')
        }
        money.value = parseFloat(localStorage.getItem('money')!)
    }
    init()
    function buyItem(itemPrice: number) {
        money.value -= itemPrice
        localStorage.setItem('money', `${money.value}`)
        init()
    }
    function addMoney(price: number) {
        if (price > 0) {
            money.value += price
            localStorage.setItem('money', `${money.value}`)
        }
    }
    return {
        money: computed(() => money.value),
        buyItem,
        addMoney,
        init,
    }
}
export interface MoneyFn {
    money: ComputedRef<number>
    init: () => void
    addMoney: (money: number) => void
    buyItem: (price: number) => void
}
export type PluginInstance = ReturnType<typeof moneyP>
export const useMoneyPluginSymbol: InjectionKey<PluginInstance> =
    Symbol('$moneyP')

const plugin: Plugin = {
    install: (app, options) => {
        const sample = moneyP()
        app.provide(useMoneyPluginSymbol, sample)
    },
}
export default plugin
