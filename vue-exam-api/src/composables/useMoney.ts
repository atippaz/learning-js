import {computed, ref} from 'vue' 
export function useMoney(){
    const money= ref(0)
    function init(){
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
    function buyItem(itemPrice:number){
        money.value -= itemPrice
        localStorage.setItem('money', `${money.value}`)
        init()
    }
    function addMoney(price:number){
        if(price>0){
        money.value += price
        localStorage.setItem('money', `${money.value}`)
        }
    }
   return {
    money:computed(()=>money.value),
    buyItem,addMoney
   }
}