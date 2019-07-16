const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const LogInType = new GraphQLObjectType({
    name: 'LogIn',
    fields: () => {
        return {
            userId: { type: GraphQLInt },
            token: { type: new GraphQLNonNull(GraphQLString) },
            expiresIn: { type: new GraphQLNonNull(GraphQLInt) }
        }
    },

})

export default LogInType;