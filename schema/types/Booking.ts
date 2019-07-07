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

const BookingType = new GraphQLObjectType({
    name: 'Booking',
    fields: () => {
        return {
            _id: { type: new GraphQLNonNull(GraphQLID) },
            event: { type: new GraphQLNonNull(EventType) },
            user: { type: new GraphQLNonNull(UserType) },
            createdAt: { type: new GraphQLNonNull(GraphQLString) },
            updatedAt: { type: new GraphQLNonNull(GraphQLString) }
        }
    },

})

export default BookingType;