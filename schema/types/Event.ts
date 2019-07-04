const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => {
        return {
            _id: {type:GraphQLID},
            title: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            price: { type: new GraphQLNonNull(GraphQLFloat) },
            date: { type: new GraphQLNonNull(GraphQLString) }
        }
    },
    
})

export default EventType;