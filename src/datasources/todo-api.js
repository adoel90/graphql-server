const { RESTDataSource } = require('apollo-datasource-rest');

class ToDoApi extends RESTDataSource{

    constructor(){
        super();
        this.baseURL = 'https://jsonplaceholder.typicode.com/';
    };

    async getList(){

        const response = await this.get('posts');
        // console.log("response data : ", response)
        return response;
    };

    async postTodo(data){

        console.log("Data : ",data)
        return this.post(`posts`,data
        )
    };

    async putTodo(data){

        console.log("Data : ",data)
        return this.put(`posts/${data.id}`,data)
    };

    async deleteTodo(data){

        console.log("Data : ", data);
        return this.delete(`posts/${data.id}`)
    }
};

module.exports = ToDoApi;