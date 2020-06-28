// import { ApolloServer, gql } from 'apollo-server';
const { ApolloServer, gql } = require("apollo-server");

const ToDoAPi  = require('./datasources/todo-api');

const dataSources = () => ({
    toDoApi : new ToDoAPi()
});


//*Data source DUMMY
const books = [
    {
      title: 'Harry Potter and the Chamber of Secrets',
      author: 'J.K. Rowling',
    },
    {
      title: 'Jurassic Park',
      author: 'Michael Crichton',
    },
];

//*Type Definition like Schema Definition Language
const typeDefs = gql`
   
    type Book {
        title: String
        author: String
    }

    #TO DO Type
    type Todo {

        id: ID!,
        title: String,
        body: String
    },

    type Query {
        books: [Book],
        listToDoWew: [Todo]
       
    }

    type Mutation {
        postTodo(title: String, body: String, userId: Int): Todo,
        putTodo(id: ID, title: String, body: String, userId: Int): Todo,
        deleteTodo(id: ID): Todo


    }
`;


const resolvers = {

    Query: {
        books: () => books,
        listToDoWew: async (_, __, { dataSources }) => {//*Parent, args, context, info
            const list = await dataSources.toDoApi.getList();
            return list;
            
        }
    },



    Mutation: {
        postTodo: async(_,args, { dataSources }) => {//*Parent, args, context, info
            
            console.log("Argument : ", args);
            let datas = await dataSources.toDoApi.postTodo(args);
            console.log("Datas : ", datas)
            return datas;
        },
        putTodo: async(_, args, { dataSources }) => {
            console.log("Argument : ", args);
            let datas = await dataSources.toDoApi.putTodo(args);
            return datas;

        },
        deleteTodo: async(_, args, { dataSources }) => {
            let datas = await dataSources.toDoApi.deleteTodo(args);
            return datas;
            
        }
    }

};


//*Ready to run server
const server = new ApolloServer({

    typeDefs,
    resolvers,
    dataSources,
    formatError: (err) => {
        // Don't give the specific errors to the client.
        if (err.message.startsWith("Database Error: ")) {
          return new Error('Internal server error');
        }
        
        // Otherwise return the original error.  The error can also
        // be manipulated in other ways, so long as it's returned.
        return err;
      },
})

server.listen().then(({url}) => {

    console.log(`🚀  Server ready at ${url}`);
})