interface IStudent{
    id:string
    name:string
    birthDay:Date
    major:Major
}
type Major='Sci'|'Engi'|'Art'|'Busi'

const studentData:IStudent[] = [{
    id:'1',
    birthDay:new Date(),
    major:'Art',
    name:'atip'
}]
const newStudentData = []
function initialQuestion(){
    const art:Major ='Art'
    const busi:Major ='Busi'
    const engi:Major ='Engi'
    const sci:Major ='Sci'
    const data = [{name:'atp',major:sci}]
    newStudentData.push(...data)
}
export const question1 = ()=>{
} 
export const a = 1
export default function(){
    return {
        a:1
    }
}