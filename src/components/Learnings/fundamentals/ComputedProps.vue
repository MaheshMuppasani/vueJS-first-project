<template>
    <div>FullName : {{firstName}} {{lastName}}</div>
    <div>Method fullname: {{getFullName()}}</div>
    <div>Computed FullName: {{ fullname }}</div>
    <input type="text" v-model="country" />
    <template v-for="person in itemlist" :key="person">
        <h3 v-if="person.age > 23">{{person.name}}</h3>
    </template>
    <h3 v-for="person in personWithAbove23Age" :key="person">{{person.name}}</h3>

    <button @click="setFullName">Change Name</button>
</template>

<script>

export default {
    name: 'ComputedProps',
    data(){
        return{
            firstName: 'mahesh',
            lastName: 'babu',
            country:'',
            itemlist:[
                {id:1, name:'mahesh', age:23},
                {id:2, name:'akhil', age:25},
                {id:3, name:'pavan', age:24},
            ]
        }
    },
    methods:{
        getFullName(){
            console.log('method Fullname');
            return `${this.firstName} ${this.lastName}`
        },
        setFullName(){
            this.fullname = 'ponnur saiPavan';
        }
    },
    computed:{
        fullname:{
            get(){
                console.log('computed Fullname');
                return `${this.firstName} ${this.lastName}`
            },
            set(fullname){
                const splitName = fullname.split(' ');
                this.firstName = splitName[0];
                this.lastName = splitName[1];
            }
        },
        personWithAbove23Age(){
            return this.itemlist.filter(person => person.age > 23)
        }
    }
}
</script>