const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => {
        return {
            id: { type: GraphQLID },
            username: { type: new GraphQLNonNull(GraphQLString) },
            password: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) }
        }
    },

})

export default UserType;