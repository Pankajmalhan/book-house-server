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
import EventType from './Event';
import MongoHelper from "../../database/mongodb/mongoDB";

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => {
        return {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            event: {
                type: new GraphQLNonNull(EventType),
                resolve: async (obj: any, { input }: any, { pgdb }: any) => {
                    let event = await MongoHelper.getEventById(obj.event);
                    return event;
                }
            },
            user: {
                type: new GraphQLNonNull(UserType),
                resolve: async (obj: any, { input }: any, { pgdb }: any) => {
                    let user=await pgdb.getUserByIds([obj.userId]);
                    return user[0];
                }
            },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            updatedAt: { type: new GraphQLNonNull(GraphQLString) }
        }
    },

})

export default BookingType;