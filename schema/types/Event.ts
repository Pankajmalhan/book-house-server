const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt,
    GraphQLFloat
} = require('graphql');

import UserType from './User';
const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => {
        return {
            _id: { type: GraphQLID },
            title: { type: new GraphQLNonNull(GraphQLString) },
            description: { type: new GraphQLNonNull(GraphQLString) },
            price: { type: new GraphQLNonNull(GraphQLFloat) },
            date: { type: new GraphQLNonNull(GraphQLString) },
            user: {
                type: new GraphQLNonNull(UserType),
                resolve: async (obj: any, { input }: any, { pgdb }: any) => {
                   let user=await pgdb.getUserByIds([obj.creator]);
                   return user[0];
                }
            }
        }
    },

})

export default EventType;