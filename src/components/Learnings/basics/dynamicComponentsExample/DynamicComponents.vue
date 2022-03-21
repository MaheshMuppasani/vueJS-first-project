<template>
    <div>
        <button @click="activeTab = 'TabA'">Tab A</button>
        <button @click="activeTab = 'TabB'">Tab B</button>
        <button @click="activeTab = 'TabC'">Tab C</button>
    </div>
    <keep-alive>
        <component :is="activeTab" />
    </keep-alive>
    <button @click="fetchData">Get Posts</button>
    <button @click="postData">Create Posts</button>
    <h3>status : {{ status }}</h3>
    <div v-for="post in posts" :key="post.id">
        <h3>{{ post.id }}. {{ post.title }}</h3>
        <p>{{ post.body }}</p>
        <hr />
    </div>
</template>

<script>
import TabA from './TabA';
import TabB from './TabB';
import TabC from './TabC';

function fetchData(){
    // const setStatus = (msg) => {
    //     this.status = msg;
    // }
    // const setPosts = (posts) => {
    //     this.posts = posts;
    // }
    // let xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = function(){
    //     switch(xhr.readyState){
    //         case 0:{
    //             setStatus('url is captured')
    //             break;
    //         }
    //         case 1:{
    //            setStatus('url opened');
    //             break
    //         }
    //         case 2:{
    //             setStatus('send called')
    //             break
    //         }
    //         case 3:{
    //             setStatus('Data loading')
    //             break
    //         }
    //         case 4:{
    //             setStatus('Done');
    //             setPosts(JSON.parse(xhr.response));
    //             break
    //         }
    //     }
    // }
    // xhr.open('GET','https://jsonplaceholder.typicode.com/posts',true);
    // xhr.send();
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => {
        console.log('response', response);
        return response.json()
    })
    .then(data => console.log(data))
}

function postData(){
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: 'foo',
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => {
        console.log('response', response);
        return response.json()
    })
    .then(data => console.log(data))
}

    export default {
        name:'DynamicComponent',
        components:{
            TabA,
            TabB,
            TabC
        },
        data(){
            return {
                activeTab: 'TabA',
                status: 'default',
                posts:[]
            }
        },
        methods:{
            fetchData,
            postData
        }
    }
</script>

<style scoped>

</style>