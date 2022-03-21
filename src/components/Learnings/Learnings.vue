<template>
  <div>
    <!-- <button :disabled="disabled" :onClick="handleClick">{{buttonName}}</button>
    
    <div v-if="creditOnFile > 0">Credit on File: ${{creditOnFile.toFixed(2)}}</div>
    <div v-else-if="creditOnFile < 0">you are on debt of ${{(-1*creditOnFile).toFixed(2)}}</div>
    <div v-else-if="creditOnFile === 0">
      No credit points
      <a href="javascript:void(0)" v-text="AddCOF" :onClick="handleClick"></a>
    </div>
    <div v-else>Unable to fetch credit points!</div>

    <template v-if="creditOnFile===0">
      <h3 :class="{
        'd-flex': true,
        'justify-content-center': true,
        errorText: true
      }">one</h3>
      <h3>one</h3>
      <h3>one</h3>
    </template>

    <h2 v-show="show" :class="['primaryText', 'errorText']" :style="[simpleStyle, pointer]">use v-show</h2> -->

    <!-- <h3 v-for="(name, index) in friendList" :key="index">{{index}} {{name}}</h3> -->

    <!-- <template v-for="(person,index) in dataList" :key="index">
      <h1>name: {{person.name}}, age: {{person.age}}</h1>
      <hr>
    </template> -->

    <!-- <h1 v-for="(actor, index) in actorList" :key="index">
      <b :style="simpleStyle">{{actor.name}} movies : </b>
      <h5 v-for="(movie, mi) in actor.movies" :key="mi"><a href="javascript:void(0)">{{movie}}</a></h5>
    </h1> -->

    <!-- <div :style="simpleStyle">Author Info</div>
    <h3 v-for="(value, key, index) in authorInfo" :key="index">{{key}} : {{value}}</h3> -->

    <!-- <template v-for="name in dataList" :key="name">
      <h1 v-if="name.name==='akhil'">{{name.name}}</h1>
    </template> -->

    <!-- <button class="addNewCounterBtn" @click="handleAddNewCounter">New Counter</button>
    <template v-for="counter in counterList" :key="counter">
      <Counter />
    </template> -->

    <!-- <SimpleForm /> -->
    <!-- <ComputedProps /> -->
    <!-- <WatchersExample /> -->

    <!-- <Greet v-for="name in friendList" :key="name" :name="name" />     -->
    <!-- rendering list of components and binding data with v-bind -->

    <!-- <Greet name="mahesh (author)" />   -->
    <!-- with normal prop -->

    <!-- <Article title="Basic title" :likes=50 id="sample-article"/> -->
    <!-- sample component with prop types -->

    <!-- <div><h3>user in top component:  {{userName}}</h3></div>
    <DeeplyNestedComponent /> -->

    <!-- <PopupHolder /> -->

    <!-- <Input v-model="customInputValue" /> -->
    <!-- custom input element -->

    <!-- <SlotExample><h1>Hey mahesh</h1></SlotExample> -->
    <!-- normal slot usage -->

    <!-- <SlotExample>
      <template v-slot:header>
        <h3>Header</h3>
      </template>
      <template v-slot:default>
        <img src="https://picsum.photos/200" alt="default image" />
      </template>
      <template v-slot:footer>
        <h6><button>details</button></h6>
      </template>
    </SlotExample> -->
    <!-- named slots usage -->

    <!-- <SlotPropsExample>
      <template v-slot:default="slotProps">
        {{ slotProps.firstName }} {{slotProps.age}}
      </template>
    </SlotPropsExample>
    <SlotPropsExample>
      <template v-slot:default="slotProps">
        {{ slotProps.age }} , {{slotProps.firstName}}
      </template>
    </SlotPropsExample> -->
    <!-- slot props example -->

    <!-- <h4>Parent Component Text</h4>
    <ComponentStylesExample /> -->

    <DynamicComponent />

    <!-- Lifecycle Hooks -->
    <Parent />

    <!-- <PostList /> -->

    <!-- <TemplateRefs /> -->

    <!-- mixinx -->
    <ClickCounter />
    <HoverCounter />

    <Data />
    <DemoOne />
    <DemoTwo />
    <Methods />
    <Computed />
    <Watch />
    <ProvideInject />
    <ComposedTemplateRef />
    <Person />
  </div>
</template>

<script>
// import Counter from './fundamentals/Counter';
// import SimpleForm from './fundamentals/SimpleForm';
// import ComputedProps from './fundamentals/ComputedProps';
// import WatchersExample from './fundamentals/WatcherExample.vue';
// import Greet from './basics/Greet';
// import Article from './basics/Article';
// import DeeplyNestedComponent from './basics/DeeplyNestedComponent.vue';
// import PopupHolder from './basics/ComponentEvents/PopupHolder';
import Person from './basics/ComponentEvents/CustomEventsWithComposition/Person';
// import Input from './CustomInput';
// import SlotExample from './basics/SlotExampleComponent';
// import SlotPropsExample from './basics/SlotPropsExample';
// import ComponentStylesExample from './basics/ComponentStylesExample';
import DynamicComponent from './basics/dynamicComponentsExample/DynamicComponents.vue';
import Parent from './basics/ComponentLifeCycles/Parent';
// import PostList from './basics/ComponentLifeCycles/PostsList';
// import TemplateRefs from './basics/ComponentLifeCycles/templateRefs.vue'
import ClickCounter from './basics/reuseWithMixins/ClickCounter.vue'
import HoverCounter from './basics/reuseWithMixins/HoverCounter'
import Data from './basics/composition/Data.vue'
import DemoOne from './basics/composition/DemoOne.vue'
import DemoTwo from './basics/composition/DemoTwo.vue'
import Methods from './basics/composition/Methods.vue'
import Computed from './basics/composition/Computed.vue'
import Watch from './basics/composition/Watch.vue';
import TemplateRef from './basics/composition/TemplateRef.vue';
import ProvideInject from './basics/ProvideContextAndConsume/ProvideInject.vue'

let isDisabled = false;

function handleBtnClick(e) {
  e.stopPropagation();
  this.creditOnFile += !this.creditOnFile ? 10 : 1;
}

function handleAddNewCounter(){
  this.counterList = [...this.counterList, this.counterList.length+1]
}


export default {
  name: "Fundamentals",
  methods: {
    handleClick: handleBtnClick,
    handleAddNewCounter
  },
  components:{
    // Counter,
    // SimpleForm,
    // ComputedProps,
    // WatchersExample,
    // Greet,
    // Article,
    // DeeplyNestedComponent,
    // PopupHolder,
    // Input,
    // // SlotExample,
    // SlotPropsExample,
    // ComponentStylesExample,
    DynamicComponent,
    Parent,
    // PostList,
    // TemplateRefs,
    ClickCounter,
    HoverCounter,
    Data,
    DemoOne,
    DemoTwo,
    Methods,
    Computed,
    Watch,
    ProvideInject,
    ComposedTemplateRef: TemplateRef,
    Person
  },
  data() {
    return {
      AddCOF: 'Add $10 Now!',
      buttonName: 'Add $1',
      pointer:{
        cursor: 'pointer'
      },
      buttonStyle:{
        padding: '10px',
      },
      simpleStyle: {
        textDecoration: 'underline',
      },
      simpleClass: 'primaryText',
      disabled: isDisabled,
      creditOnFile: 0,
      show: true,
      friendList:['akhil', 'pavan', 'ashu'],
      dataList:[
        { name:'akhil', age:24 },
        { name:'pavan', age:24 },
        { name:'ashu', age:24 },
      ],
      actorList: [
        { name: 'Mahesh babu', movies: ['Okkadu', 'Pokiri', 'Athadu'] },
        { name: 'Pavan kalyan', movies: ['panja', 'VakeelSaab'] },
        { name: 'Allu Arjun', movies: ['Gangotri', 'AVPL'] },
      ],

      authorInfo:{
        name: 'mahesh muppasani',
        age: 24,
        profession: 'web dev',
      },
      counterList: [1],
      userName: 'Mahesh Muppasani',
      customInputValue: '',
    };
  },
  provide(){
    return {
      loggedUserName: this.userName
    }
  } 
  //this can also write as an object when you dont want to use provided props inside provider component
};
</script>

<style scoped>
.errorText {
  color: red;
}
.primaryText {
  color: green;
}
.d-flex{
  display: flex;
}
.justify-content-center{
  justify-content: center;
}
.addNewCounterBtn{
  margin-bottom: 20px;
  padding: 5px 10px;
  cursor: pointer;
}
.my-10{
  margin: 10px 0px;
}
h4{
  color: orange;
}
</style>
